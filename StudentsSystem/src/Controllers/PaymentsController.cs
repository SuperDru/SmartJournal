using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Common;
using Microsoft.Extensions.Logging;

namespace StudentsSystem
{
    /// <inheritdoc />
    [Route("payments/{userId:Guid}")]
    public class PaymentsController: Controller
    {
        private readonly ICacheRepository _cache;
        private readonly IAccountManagementService _account;
        private readonly IAttendanceService _attendanceService;
        private readonly IAccountHistoryWatcher _accountWatcher;
        private readonly ILogger<PaymentsController> _logger;

        /// <inheritdoc />
        public PaymentsController(ICacheRepository cache, 
                                  IAccountManagementService account, 
                                  IAttendanceService attendanceService, 
                                  IAccountHistoryWatcher accountWatcher,
                                  ILogger<PaymentsController> logger)
        {
            _cache = cache;
            _logger = logger;
            _account = account;
            _accountWatcher = accountWatcher;
            _attendanceService = attendanceService;
        }

        /// <summary>
        /// Returns all payments of the user with {userId} from {from} to {to} date 
        /// </summary>
        [HttpGet]
        public ICollection<PaymentResponse> GetUserPayments([FromRoute] Guid userId, [FromQuery] DateTime from,
            [FromQuery] DateTime to)
        {
            var payments = _cache.GetExistingUser(userId).Payments
                .Where(x => x.PaidAt >= from && x.PaidAt <= to)
                .OrderByDescending(x => x.CreatedAt)
                .Select(x => x.ToPaymentResponse())
                .ToList();
            
            _logger.LogInformation("Return payments of user with id {id} from {from} to {to} date", userId, from, to);

            return payments;
        }

        /// <summary>
        /// Performs a deposit to the account of the user with {userId}. 
        /// Returns guid of the performed payment
        /// </summary>
        [HttpPost]
        public async Task<Guid> PerformPayment([FromRoute] Guid userId, [FromBody] PaymentModel request)
        {
            if (request.Payday == default)
                request.Payday = DateTime.Now;
            request.Payday = request.Payday.ToUniversalTime();

            var user = _cache.GetExistingUser(userId);
            var payment = request.ToPayment();
            
            _logger.LogInformation("Performing payment with id {id}, amount = {amount}", payment.Guid, payment.Amount);
            
            _accountWatcher.StartWatch(new List<Guid> {user.Guid}, OperationType.Payment);
            
            user.Payments.Add(payment);
            
            await _account.Deposit(userId, payment.Amount);
            await _cache.AddOrUpdateUser(user);

            await _accountWatcher.StopWatch(payment.Guid);

            _logger.LogInformation("Performed payment with id {id}", payment.Guid);

            _accountWatcher.StartWatch(new List<Guid> {user.Guid}, OperationType.NewAttendanceDebit);

            await _attendanceService.TransformAmountToAttendance(await _account.Notify(new[] { user.Id }, _logger));

            await _accountWatcher.StopWatch();
            
            return payment.Guid;
        }
        
        /// <summary>
        /// Cancels a payment with {paymentId} of the user with {userId}
        /// </summary>
        [HttpDelete("{paymentId:Guid}")]
        public async Task CancelPayment([FromRoute] Guid userId, [FromRoute] Guid paymentId)
        {
            var user = _cache.GetExistingUser(userId);
            
            var payment = user.Payments.FirstOrDefault(x => x.Guid == paymentId);
            
            if (payment == null)
                Errors.PaymentNotFoundError.Throw(StatusCodes.Status404NotFound);
            
            // ReSharper disable once PossibleNullReferenceException
            _logger.LogInformation("Canceling payment with id {id}, amount = {amount}", payment.Guid, payment.Amount);
            
            _accountWatcher.StartWatch(new List<Guid> {user.Guid}, OperationType.Cancel );
            
            user.Payments.Remove(payment);
            
            // ReSharper disable once PossibleNullReferenceException
            await _account.Deposit(userId, -payment.Amount);
            await _cache.AddOrUpdateUser(user);

            await _accountWatcher.StopWatch(payment.Guid);
            
            _logger.LogInformation("Canceled payment with id {id}", payment.Guid);
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Storage;

namespace AttendanceAndPayments
{
    /// <inheritdoc />
    [Route("payments/{userId:Guid}")]
    public class PaymentsController: Controller
    {
        private readonly IDatabaseCache _cache;
        private readonly IAccountManagementService _account;
        private readonly IAttendanceService _attendanceService;

        /// <inheritdoc />
        public PaymentsController(IDatabaseCache cache, IAccountManagementService account, IAttendanceService attendanceService)
        {
            _account = account;
            _cache = cache;
            _attendanceService = attendanceService;
        }

        /// <summary>
        /// Returns all payments of the user with {userId} from {from} to {to} date 
        /// </summary>
        [HttpGet]
        public ICollection<PaymentResponse> GetUserPayments([FromRoute] Guid userId, [FromQuery] DateTime from, [FromQuery] DateTime to) =>
            _cache.GetUser(userId).Payments.Where(x => x.PaidAt >= from && x.PaidAt <= to).Select(x => x.ToPaymentResponse()).ToList();

        /// <summary>
        /// Performs a deposit to the account of the user with {userId}. 
        /// Returns guid of the performed payment
        /// </summary>
        [HttpPost]
        public async Task<Guid> PerformPayment([FromRoute] Guid userId, [FromBody] PaymentModel request)
        {
            if (request.Payday == default)
                request.Payday = DateTime.Now;

            var user = _cache.GetUser(userId);
            var payment = request.ToPayment();
            
            user.Payments.Add(payment);
            
            await _account.Deposit(userId, payment.Amount);
            await _cache.AddOrUpdateUser(user);

            await _attendanceService.Transform(await _account.Notify(new[] { user.Id }));

            return payment.Guid;
        }
        
        /// <summary>
        /// Cancels a payment with {paymentId} of the user with {userId}
        /// </summary>
        [HttpDelete("{paymentId:Guid}")]
        public async Task CancelPayment([FromRoute] Guid userId, [FromRoute] Guid paymentId)
        {
            var user = _cache.GetUser(userId);
            
            var payment = user.Payments.First(x => x.Guid == paymentId);
            user.Payments.Remove(payment);
            
            await _account.Deposit(userId, -payment.Amount);
            await _cache.AddOrUpdateUser(user);
        }
    }
}
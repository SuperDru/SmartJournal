using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Storage;

namespace AttendanceAndPayments
{
    [Route("payments/{userId}")]
    public class PaymentsController: Controller
    {
        private readonly IDatabaseCache _cache;
        private readonly IAccountManagementService _account;
        private readonly IBus _bus;

        public PaymentsController(IDatabaseCache cache, IBus bus, IAccountManagementService account)
        {
            _account = account;
            _cache = cache;
            _bus = bus;
        }

        [HttpGet]
        public ICollection<PaymentResponse> GetUserPayments([FromRoute] Guid userId, [FromQuery] DateTime from, [FromQuery] DateTime to) =>
            _cache.GetUser(userId).Payments.Where(x => x.PaidAt >= from && x.PaidAt <= to).Select(x => x.ToPaymentResponse()).ToList();

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

            await _bus.Notify(new[] { user.Id });

            return payment.Guid;
        }
        
        [HttpDelete("{paymentId}")]
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
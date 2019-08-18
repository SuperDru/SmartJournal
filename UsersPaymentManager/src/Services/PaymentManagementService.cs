using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using UsersPaymentManager.Database;
using Storage;
using UsersPaymentManager.Models;

namespace UsersPaymentManager.Services
{
    public interface IPaymentManagementService
    {
        Task<List<PaymentResponse>> GetUserPayments(Guid userId, DateTime from, DateTime to);
        Task<Guid> PerformPayment(Guid userId, PaymentModel request);
        Task CancelPayment(Guid paymentId);
    }
    
    public class PaymentManagementService: IPaymentManagementService
    {
        private readonly IAccountManagementService _accountService;
        private readonly IAttendanceManagementService _attendanceService;
        private readonly DatabaseContext _db;

        public PaymentManagementService(
            IAccountManagementService accountService, 
            IAttendanceManagementService attendanceService,
            DatabaseContext db)
        {
            _attendanceService = attendanceService;
            _accountService = accountService;
            _db = db;
        }

        public async Task<Guid> PerformPayment(Guid userId, PaymentModel request)
        {
            var user = await _db.GetUserAsync(userId);
            
            var payment = new Payment
            {
                Amount = request.Amount,
                Payday = request.Payday,
                UserId = user.Id,
                Id = Guid.NewGuid(),
                CreatedAt = DateTime.Now
            };
            
            user.Payments.Add(payment);            
            _db.Payments.Add(payment);

            await _accountService.IncreaseAmount(userId, payment.Amount);
            await _attendanceService.UpdateDayPaymentsByUserWithoutSave(user.Guid);

            await _db.SaveChangesAsync();
            
            return payment.Id;
        }

        public async Task<List<PaymentResponse>> GetUserPayments(Guid userId, DateTime from, DateTime to)
        {
            throw new NotImplementedException();
        }

        public async Task CancelPayment(Guid paymentId)
        {
            var payment = await _db.Payments
                .Include(x => x.User)
                .FirstOrDefaultAsync(x => x.Id == paymentId);
            var user = await _db.GetUserAsync(payment.User.Guid);

            user.Payments.Remove(payment);

            if (!await _accountService.DecreaseAmount(payment.User.Guid, payment.Amount, false))
                await _attendanceService.CancelUpdate(payment.User.Guid, paymentId);
        }
    }
}
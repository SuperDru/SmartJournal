using System;
using Common;

namespace StudentsSystem
{
    public static class PaymentsMapExtensions
    {
        public static PaymentResponse ToPaymentResponse(this Payment source) =>
            new PaymentResponse
            {
                Amount = source.Amount,
                Payday = source.PaidAt,
                Id = source.Guid
            };
        
        public static Payment ToPayment(this PaymentModel source) =>
            new Payment
            {
                Guid = Guid.NewGuid(),
                Amount = source.Amount,
                CreatedAt = DateTime.Now,
                PaidAt = source.Payday
            };
    }
}
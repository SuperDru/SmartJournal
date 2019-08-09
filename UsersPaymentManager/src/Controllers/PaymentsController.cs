using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using UsersPaymentManager.Models;

namespace UsersPaymentManager.Controllers
{
    [Route("/payments")]
    public class PaymentsController: Controller
    {
        [HttpGet("{userId}")]
        public async Task<List<PaymentResponse>> GetUserPayments([FromRoute] Guid userId, [FromQuery] DateTime from, [FromQuery] DateTime to)
        {
            
        }
        
        [HttpPost("{userId}")]
        public async Task<Guid> PerformPayment([FromRoute] Guid userId, [FromBody] PaymentModel request)
        {
            if (request.Payday == default)
                request.Payday = DateTime.Now;
        }
        
        [HttpDelete("{paymentId}")]
        public async Task CancelPayment([FromRoute] Guid paymentId)
        {
            
        }
    }
}
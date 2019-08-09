using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using UsersPaymentManager.Models;
using UsersPaymentManager.Services;

namespace UsersPaymentManager.Controllers
{
    [Route("/schedule/{id}")]
    public class ScheduleController: Controller
    {
        private readonly IScheduleManagementService _scheduleService;

        public ScheduleController(IScheduleManagementService scheduleService)
        {
            _scheduleService = scheduleService;
        }

        [HttpGet]
        public async Task<ICollection<TrueScheduleModel>> GetSchedule([FromRoute] Guid id, [FromQuery] DateTime from, [FromQuery] DateTime to) =>
            await _scheduleService.GetTrueSchedule(id, from, to);

        [HttpPut]
        public async Task UpdateSchedule([FromRoute] Guid id, [FromBody] ICollection<TrueScheduleRequest> request) =>
            await _scheduleService.UpdateTrueSchedule(id, request);
    }
}
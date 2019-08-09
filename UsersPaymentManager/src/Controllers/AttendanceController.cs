using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using UsersPaymentManager.Models;
using UsersPaymentManager.Services;

namespace UsersPaymentManager.Controllers
{
    [Route("/attendance/{id}")]
    public class AttendanceController: Controller
    {
        private readonly IAttendanceManagementService _attendanceService;

        public AttendanceController(IAttendanceManagementService attendanceService)
        {
            _attendanceService = attendanceService;
        }
        
        [HttpGet]
        public async Task<ICollection<AttendanceResponse>> GetAttendance([FromRoute] Guid id, [FromQuery] DateTime from, [FromQuery] DateTime to) =>
            await _attendanceService.GetAttendance(id, from, to);

        [HttpPut]
        public async Task UpdateAttendance([FromRoute] Guid id, [FromBody] IEnumerable<AttendanceRequest> request) =>
            await _attendanceService.UpdateAttendance(id, request);
    }
}
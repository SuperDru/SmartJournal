using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace AttendanceAndPayments
{
    [Route("attendance/{groupId}")]
    public class AttendanceController: Controller
    {
        private readonly IAttendanceService _attendanceService;

        public AttendanceController(IAttendanceService attendanceService)
        {
            _attendanceService = attendanceService;
        }

        public ICollection<AttendanceResponse> GetAttendance([FromRoute] Guid groupId, DateTime from, DateTime to) =>
            _attendanceService.GetAttendance(groupId, from, to);

        public async Task UpdateAttendance([FromRoute] Guid groupId, ICollection<AttendanceRequest> request) =>
            await _attendanceService.UpdateAttendance(groupId, request);
    }
}
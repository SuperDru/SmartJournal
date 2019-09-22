using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace AttendanceAndPayments
{
    /// <inheritdoc />
    [Route("attendance/{groupId}")]
    public class AttendanceController: Controller
    {
        private readonly IAttendanceService _attendanceService;

        /// <inheritdoc />
        public AttendanceController(IAttendanceService attendanceService)
        {
            _attendanceService = attendanceService;
        }

        /// <summary>
        /// Gets attendance of users in the group with {groupId} from {from} to {to} date 
        /// </summary>
        [HttpGet]
        public ICollection<AttendanceResponse> GetAttendance([FromRoute] Guid groupId, [FromQuery] DateTime from, [FromQuery] DateTime to) =>
            _attendanceService.GetAttendance(groupId, from, to);

        /// <summary>
        /// Sets or deletes attendance days of users in the group with {groupId}
        /// </summary>
        [HttpPut]
        public async Task UpdateAttendance([FromRoute] Guid groupId, [FromBody] ICollection<AttendanceRequest> request) =>
            await _attendanceService.UpdateAttendance(groupId, request);
    }
}
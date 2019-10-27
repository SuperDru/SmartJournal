using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Serilog;
using ILogger = Microsoft.Extensions.Logging.ILogger;

namespace StudentsSystem
{
    /// <inheritdoc />
    [Route("attendance/{groupId:Guid}")]
    public class AttendanceController: Controller
    {
        private readonly IAttendanceService _attendanceService;
        private readonly IAccountHistoryWatcher _accountWatcher;
        private readonly ILogger<AttendanceController> _logger;
        
        /// <inheritdoc />
        public AttendanceController(IAttendanceService attendanceService, IAccountHistoryWatcher accountWatcher, ILogger<AttendanceController> logger)
        {
            _attendanceService = attendanceService;
            _accountWatcher = accountWatcher;
            _logger = logger;
        }

        /// <summary>
        /// Gets attendance of users in the group with {groupId} from {from} to {to} date 
        /// </summary>
        [HttpGet]
        public ICollection<AttendanceResponse> GetAttendance([FromRoute] Guid groupId, [FromQuery] DateTime from,
            [FromQuery] DateTime to)
        {
            var att = _attendanceService.GetAttendance(groupId, from, to);
            _logger.LogInformation("Return attendance of group with id {groupId} from {from} to {to} date", groupId, from, to);
            return att;
        }

        /// <summary>
        /// Sets or deletes attendance days of users in the group with {groupId}
        /// </summary>
        [HttpPut]
        public async Task UpdateAttendance([FromRoute] Guid groupId, [FromBody] ICollection<AttendanceRequest> request)
        {
            await CalculateAttendanceWithHistory(groupId, request, false);
            await CalculateAttendanceWithHistory(groupId, request, true);
        }

        private async Task CalculateAttendanceWithHistory(Guid groupId, ICollection<AttendanceRequest> request, bool forAttended)
        {
            var removedAtt = request.Select(x =>
            {
                var newAtt = x.UpdatedAttendance.Where(y => y.IsAttended == forAttended);
                return new AttendanceRequest
                {
                    UpdatedAttendance = newAtt.ToList(),
                    UserId = x.UserId
                };
            }).ToList();
            
            _logger.LogInformation("{Remove} attendance for group with id {groupId}, count = {count}", 
                forAttended ? "Adding" : "Removing",groupId, removedAtt.Count);

            _accountWatcher.StartWatch(removedAtt.Select(x => x.UserId).ToList(), forAttended ? OperationType.NewAttendanceDebit : OperationType.RemovedAttendanceDebit);
            await _attendanceService.UpdateAttendance(groupId, removedAtt);
            await _accountWatcher.StopWatch();
            
            _logger.LogInformation("{Remove} finished", forAttended ? "Adding" : "Removing");
        }
    }
}
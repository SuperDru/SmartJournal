using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Common;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace StudentsSystem
{
    [Route("statistics")]
    public class StatisticsController: Controller
    {
        private readonly ICacheRepository _cache;
        private readonly IStatisticsCalculationService _statisticsCalculation;
        private readonly ILogger<StatisticsController> _logger;

        public StatisticsController(ICacheRepository cache, IStatisticsCalculationService statisticsCalculation, ILogger<StatisticsController> logger)
        {
            _cache = cache;
            _logger = logger;
            _statisticsCalculation = statisticsCalculation;
        }

        /// <summary>
        /// Returns statistics of the group with {groupId} at {monthDate} month
        /// </summary>
        [HttpGet("{groupId:Guid}")]
        public StatisticsResponse GetStatistics([FromRoute] Guid groupId, [FromQuery] DateTime monthDate)
        {
            if (!monthDate.EarlierThisMonth(DateTime.Today))
                Errors.NotAllowedToGetCurrentMonthOrLaterStatistics.Throw(StatusCodes.Status403Forbidden);
            
            var group = _cache.GetExistingGroup(groupId);

            _logger.LogInformation("Return statistics of group with id {id} for month {month}", groupId, monthDate);
            
            return group.Statistics.Where(x => x.Date == monthDate).Select(x => x.ToStatisticsResponse()).FirstOrDefault();
        }
        
        /// <summary>
        /// Returns statistics of all groups a {monthDate} month
        /// </summary>
        [HttpGet]
        public ICollection<StatisticsResponse> GetStatistics([FromQuery] DateTime monthDate)
        {
            if (!monthDate.EarlierThisMonth(DateTime.Today))
                Errors.NotAllowedToGetCurrentMonthOrLaterStatistics.Throw(StatusCodes.Status403Forbidden);

            _logger.LogInformation("Return statistics of all groups for month {month}", monthDate);

            return _cache.GetGroups().SelectMany(group => group.Statistics.Select(x => x.ToStatisticsResponse())).ToList();
        }
        
        /// <summary>
        /// Builds statistics at {monthDate} month (only for Development mode)
        /// </summary>
        [HttpPost]
        public async Task BuildStatistics([FromQuery] DateTime monthDate, [FromServices] DatabaseContext db)
        {
            _logger.LogInformation("Removing old statistics for month {month}", monthDate);

            db.Statistics.RemoveRange(db.Statistics.Where(x => x.Date == monthDate));
            await db.SaveChangesAsync();
            
            await _statisticsCalculation.BuildStatistics(monthDate);
        }
    }
}
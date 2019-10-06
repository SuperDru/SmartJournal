using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Common;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace StudentsSystem
{
    [Route("statistics")]
    public class StatisticsController: Controller
    {
        private readonly IDatabaseCache _cache;
        private readonly IStatisticsCalculationService _statisticsCalculation;

        public StatisticsController(IDatabaseCache cache, IStatisticsCalculationService statisticsCalculation)
        {
            _cache = cache;
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

            return _cache.GetGroups().SelectMany(group => group.Statistics.Select(x => x.ToStatisticsResponse())).ToList();
        }
        
        /// <summary>
        /// Builds statistics at {monthDate} month (only for Development mode)
        /// </summary>
        [HttpPost]
        public async Task BuildStatistics([FromQuery] DateTime monthDate)
        {
            if (!monthDate.EarlierThisMonth(DateTime.Today))
                Errors.NotAllowedToGetCurrentMonthOrLaterStatistics.Throw(StatusCodes.Status403Forbidden);

            await _statisticsCalculation.BuildStatistics(monthDate);
        }
    }
}
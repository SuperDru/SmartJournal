using Common;

namespace StudentsSystem
{
    public static class StatisticsExtensions
    {
        public static StatisticsResponse ToStatisticsResponse(this Statistics source) =>
            new StatisticsResponse
            {
                Date = source.Date,
                AttendancePercentage = source.AttendancePercentage,
                LessonsAmount = source.LessonsAmount,
                ExpectedIncome = source.ExpectedIncome,
                PeopleAmount = source.PeopleAmount,
                VisitsAmount = source.VisitsAmount
            };
    }
}
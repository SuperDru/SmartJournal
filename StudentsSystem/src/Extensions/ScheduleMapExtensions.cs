using Storage;

namespace StudentsSystem
{
    public static class ScheduleMapExtensions
    {
        public static TrueScheduleModel ToTrueScheduleModel(this TrueSchedule source) =>
            new TrueScheduleModel
            {
                Date = source.Date,
                Discount = source.Discount,
                StartTime = source.StartTime
            };
        
        public static TrueSchedule ToTrueSchedule(this TrueScheduleRequest source) =>
            new TrueSchedule
            {
                Date = source.Date,
                Discount = source.Discount,
                StartTime = source.StartTime,
                Fixed = true,
                Lesson = !source.ToDelete
            };
    }
}
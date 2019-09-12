using Storage;

namespace AttendanceAndPayments
{
    public static class AttendanceMapExtensions
    {   
        public static UserDayInfoResponse ToUserDayInfo(this Attendance source)
        {
            return new UserDayInfoResponse
            {
                Date = source.Date,
                IsPaid = source.PaymentAmount <= 0.00001
            };
        }
    }
}
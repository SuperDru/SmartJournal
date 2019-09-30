namespace Common
{
    public static class Errors
    {
        public static readonly ApiError GroupNotFoundError = new ApiError(2000, "Group not found");
        public static readonly ApiError GroupWithThisNameExistsError = new ApiError(2001, "Group with this name already exists");
        
        public static readonly ApiError UserNotFoundError = new ApiError(3000, "Student not found");
        public static readonly ApiError UserWithThisEmailExistsError = new ApiError(3001, "Student with this email already exists");
        public static readonly ApiError UserWithThisPhoneExistsError = new ApiError(3002, "Student with this phone already exists");
        
        public static readonly ApiError AttemptToChangeFixedScheduleError = new ApiError(4000, "Attempt to change fixed schedule");
        
        public static readonly ApiError AttemptToChangeAttendanceLaterTodayError = new ApiError(5000, "Attempt to change attendance later today");
        public static readonly ApiError DayNotOnScheduleError = new ApiError(5001, "This day is not on schedule");
        
        public static readonly ApiError PaymentNotFoundError = new ApiError(6000, "Payment not found");

        
        public static ApiError UserAlreadyAssignedToGroupError(User user) => new ApiError(3003, $"Student {user.Surname} {user.Password} already assigned to the group");
        public static ApiError UserAlreadyRemovedFromGroupError(User user) => new ApiError(3004, $"Student {user.Surname} {user.Password} already removed from the group");
        
        public static ApiError ValidationError(string message) => new ApiError(1000, message);
    }
}
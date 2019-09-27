namespace Storage
{
    public static class Errors
    {
        public static readonly ApiError GroupNotFoundError = new ApiError(2000, "Group not found");
        public static readonly ApiError GroupWithThisNameExistsError = new ApiError(2001, "Group with this name already exists");
        
        public static ApiError ValidationError(string message) => new ApiError(1000, message);
    }
}
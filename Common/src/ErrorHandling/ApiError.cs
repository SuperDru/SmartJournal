namespace Common
{
    public class ApiError
    {
        public int ErrorCode { get; set; }
        public string Message { get; set; }

        public ApiError(int errorCode, string message)
        {
            ErrorCode = errorCode;
            Message = message;
        }
    }
}
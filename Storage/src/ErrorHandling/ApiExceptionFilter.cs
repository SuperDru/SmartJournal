using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Serilog;

namespace Storage
{
    public class ApiExceptionFilter: IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
            var ex = context.Exception;

            if (ex is ApiException apiException)
            {
                var error = apiException.Error;
                context.Result = new ObjectResult(error)
                {
                    StatusCode = apiException.StatusCode
                };

                Log.Information($"Error: {error}");

                return;
            }
            
            context.Result = new ObjectResult(new ApiError(9999, $"Unexpected error: {ex.Message}"))
            {
                StatusCode = StatusCodes.Status500InternalServerError
            };
            
            Log.Error(ex.StackTrace);
        }
    }

    public static class ErrorExtensions
    {
        public static void Throw(this ApiError error, int statusCode)
        {
            throw new ApiException(error, statusCode);
        }
    }
}
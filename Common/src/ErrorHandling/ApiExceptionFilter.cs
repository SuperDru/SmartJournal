using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using Serilog;
using ILogger = Microsoft.Extensions.Logging.ILogger;

namespace Common
{
    public class ApiExceptionFilter: IExceptionFilter
    {
        private ILogger<ApiExceptionFilter> _logger;
        
        public ApiExceptionFilter(ILogger<ApiExceptionFilter> logger)
        {
            _logger = logger;
        }
        
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

                _logger.LogInformation($"Error: {error}");

                return;
            }
            
            context.Result = new ObjectResult(new ApiError(9999, $"Unexpected error: {ex.Message}"))
            {
                StatusCode = StatusCodes.Status500InternalServerError
            };
            
            _logger.LogError(ex.StackTrace);
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
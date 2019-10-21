using Common;

namespace StudentsSystem
{
    public static class AccountHistoryExtensions
    {
        public static AccountHistoryResponse ToAccountHistoryResponse(this AccountHistory source) =>
            new AccountHistoryResponse
            {
                Type = source.Type,
                DiffAmount = source.DiffAmount,
                NewAmount = source.NewAmount,
                PerformedAt = source.PerformedAt,
                PaymentId = source.PaymentId
            };
    }
}
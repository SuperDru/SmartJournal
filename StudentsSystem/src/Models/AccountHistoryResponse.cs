using System;
using Common;

namespace StudentsSystem
{
    public class AccountHistoryResponse
    {
        public DateTime PerformedAt { get; set; }
        public OperationType Type { get; set; }
        public float DiffAmount { get; set; }
        public float NewAmount { get; set; }
    }
}
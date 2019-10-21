using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Common
{
    public enum OperationType
    {
        /// <summary>
        /// Unknown type
        /// </summary>
        Unknown = 0,
        /// <summary>
        /// Performed payment type
        /// </summary>
        Payment = 1,
        /// <summary>
        /// Canceled payment
        /// </summary>
        Cancel = 2,
        /// <summary>
        /// New attendance debit
        /// </summary>
        NewAttendanceDebit = 3,
        /// <summary>
        /// Removed attendance debit
        /// </summary>
        RemovedAttendanceDebit = 4
    }
    
    [Table("account_history")]
    public class AccountHistory
    {
        [Column("user_id")]
        public int UserId { get; set; }
        [Column("performed_at")]
        public DateTime PerformedAt { get; set; }
        [Column("type")]
        public OperationType Type { get; set; }
        [Column("diff_amount")]
        public float DiffAmount { get; set; }
        [Column("new_amount")]
        public float NewAmount { get; set; }
        [Column("payment_id")] 
        public Guid? PaymentId { get; set; }

        public User User { get; set; }
    }
}
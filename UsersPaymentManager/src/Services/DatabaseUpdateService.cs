using System;
using System.Threading.Tasks;
using UsersPaymentManager.Database;

namespace UsersPaymentManager.Services
{
    public interface IDatabaseUpdateService
    {
        Task UpdateUsers();
        Task UpdateGroups();
    }
    
    public class DatabaseUpdateService: IDatabaseUpdateService
    {
        private readonly DatabaseContext _db;

        public DatabaseUpdateService(DatabaseContext db)
        {
            _db = db;
        }
        
        public async Task UpdateUsers()
        {
            Console.WriteLine("update users enter");
            if (DataAccessExtensions.Users == null) return;
            _db.Users.UpdateRange(DataAccessExtensions.Users.Values);
            await _db.SaveChangesAsync();
            Console.WriteLine("update users in database");
        }

        public async Task UpdateGroups()
        {
            Console.WriteLine("update groups enter");
            if (DataAccessExtensions.Groups == null) return;
            _db.Groups.UpdateRange(DataAccessExtensions.Groups.Values);
            await _db.SaveChangesAsync();
            Console.WriteLine("update groups in database");
        }
    }
}
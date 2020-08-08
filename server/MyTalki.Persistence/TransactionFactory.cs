using System;
using MyTalki.Core.Persistence;

namespace MyTalki.Persistence
{
    public class TransactionFactory<T> : ITransactionFactory<ITransaction> where T : ITransaction
    {
        private readonly DomainContext _context;

        public TransactionFactory(DomainContext context)
        {
            _context = context;
        }

        public ITransaction Begin() 
            => (T) Activator.CreateInstance(typeof(T), _context);

    }
}

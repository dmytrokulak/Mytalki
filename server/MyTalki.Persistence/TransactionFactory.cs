using System;
using MyTalki.Core.Persistence;

namespace MyTalki.Persistence
{
    public class UnitOfWorkFactory<T> : ITransactionFactory<ITransaction> where T : ITransaction
    {
        private readonly DomainContext _context;

        public UnitOfWorkFactory(DomainContext context)
        {
            _context = context;
        }

        public ITransaction Execute() 
            => (T) Activator.CreateInstance(typeof(T), _context);

    }
}

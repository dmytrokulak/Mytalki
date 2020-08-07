namespace MyTalki.Core.Persistence
{
    public interface ITransactionFactory<T> where T : ITransaction
    {
        T Execute();
    }
}

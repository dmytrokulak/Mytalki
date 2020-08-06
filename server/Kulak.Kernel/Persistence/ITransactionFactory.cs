namespace Kulak.Kernel.Persistence
{
    public interface ITransactionFactory<T> where T : ITransaction
    {
        T Execute();
    }
}

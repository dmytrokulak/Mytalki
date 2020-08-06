namespace Kulak.Kernel.Providers
{
    public interface ILoggingProvider : ICrossCuttingProvider
    {
        void Log(string message);
    }
}

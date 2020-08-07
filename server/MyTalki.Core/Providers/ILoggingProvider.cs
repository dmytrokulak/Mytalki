namespace MyTalki.Core.Providers
{
    public interface ILoggingProvider : ICrossCuttingProvider
    {
        void Log(string message);
    }
}

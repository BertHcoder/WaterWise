using aquaMaintenance.backEnd.Models;

namespace aquaMaintenance.backEnd.services
{
    public interface IWaterParametersDataService
    {
        Task<IEnumerable<WaterParameter> GetAllParametersAsync();
        Task<WaterParameter> GetParameterByIdAsync(int id);
        Task AddParameterAsync(WaterParameter parameter);
        Task UpdateParameterAsync(WaterParameter parameter);
        Task DeleteParameterAsync(int id);
    }
}

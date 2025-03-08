using aquaMaintenance.backEnd.Models;

namespace aquaMaintenance.backEnd.services
{
    public interface IWaterParametersDataService
    {
        IEnumerable<WaterParameter> GetAll();
        WaterParameter GetById(int id);
        WaterParameter Create(WaterParameter parameters);
        bool Update(WaterParameter parameters);
        bool Delete(int id);
    }
}

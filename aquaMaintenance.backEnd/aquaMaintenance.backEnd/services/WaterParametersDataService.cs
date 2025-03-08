using LiteDB;
using aquaMaintenance.backEnd.Models;
using aquaMaintenance.backEnd.services;

namespace aquaMaintenance.backEnd.Services
{
    public class WaterParametersDataService : IWaterParametersDataService
    {
        private readonly string DbPath = "Filename=./WaterParameters.db;Connection=shared";
        private readonly string CollectionName = "waterParameters";

        public IEnumerable<WaterParameter> GetAll()
        {
            using var db = new LiteDatabase(DbPath);
            var collection = db.GetCollection<WaterParameter>(CollectionName);
            return collection.FindAll().ToList();
        }

        public WaterParameter GetById(int id)
        {
            using var db = new LiteDatabase(DbPath);
            var collection = db.GetCollection<WaterParameter>(CollectionName);
            return collection.FindById(id);
        }

        public WaterParameter Create(WaterParameter parameters)
        {
            using var db = new LiteDatabase(DbPath);
            var collection = db.GetCollection<WaterParameter>(CollectionName);
            collection.Insert(parameters);
            return parameters;
        }

        public bool Update(WaterParameter parameters)
        {
            using var db = new LiteDatabase(DbPath);
            var collection = db.GetCollection<WaterParameter>(CollectionName);
            return collection.Update(parameters);
        }

        public bool Delete(int id)
        {
            using var db = new LiteDatabase(DbPath);
            var collection = db.GetCollection<WaterParameter>(CollectionName);
            return collection.Delete(id);
        }
    }
}
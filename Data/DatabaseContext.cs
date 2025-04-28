using Data.entities;
using Microsoft.EntityFrameworkCore;

namespace Data
{
    public class DatabaseContext : DbContext
    {
        public DbSet<Aquarium> Aquariums{ get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.entities
{
    public class Aquarium
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Location { get; set; }
        public string? Type { get; set; }
        public double Volume { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public WaterParameterHealthScore? HealthScore { get; set; }

        //public virtual ICollection<Habitants> Habitants { get; set; } = new List<Habitants>();
        public virtual ICollection<WaterParameter> WaterParameters { get; set; } = new List<WaterParameter>();
    }
}

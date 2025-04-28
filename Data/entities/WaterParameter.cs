using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.entities
{
    public class WaterParameter
    {
        public double PH { get; set; }
        public double Ammonia { get; set; }
        public double Nitrite { get; set; }
        public double Nitrate { get; set; }
        public double Hardness { get; set; }
        public double Temperature { get; set; }
        public double Phosphate { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.entities
{
    public class WaterParameterHealthScore
    {
        public int TotalScore { get; set; }
        public int HardnessScore { get; set; }
        public int KhScore { get; set; }
        public int PhosphateScore { get; set; }
        public int NitriteScore { get; set; }
        public int TemperatureScore { get; set; }
    }
}

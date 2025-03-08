namespace aquaMaintenance.backEnd.Models
{
    public class WaterParameter
    {
        public int Id { get; set; }
        public DateTime MeasurementDate { get; set; }
        public double Temperature { get; set; }
        public double Ph { get; set; }
        public double Gh { get; set; }
        public double Kh { get; set; }
        public double No2 { get; set; }
        public double No3 { get; set; }
        public double Po4 { get; set; }
        public WaterHealth? WaterHealth { get; set; }
    }
}
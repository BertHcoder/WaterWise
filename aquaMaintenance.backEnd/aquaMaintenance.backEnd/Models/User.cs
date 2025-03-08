namespace aquaMaintenance.backEnd.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public List<WaterParameter>? WaterParameters { get; set; }

        public string FullName  
        {
            get { return FirstName + " " + LastName; }
        }

    }
}

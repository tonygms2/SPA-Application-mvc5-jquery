namespace SPA_Application.Models
{
    public class User
    {
        public string UserID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public Role UserRole { get; set; }
        public string Password { get; set; }
        public bool IsLoggedIn { get; set; }
    }
}
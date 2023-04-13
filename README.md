🌟 User Management Application 🌟
This is a Single Page Application (SPA) that manages user data. The application is built using ASP.NET MVC and provides a simple user interface to add, edit, delete, and search for users.

Technologies Used 💻
ASP.NET MVC Framework C# JavaScript HTML/CSS jQuery

Features 🚀
Login: The user can log in to the application using their username and password. The login credentials are stored in a database and validated using Entity Framework. Add User: The user can add a new user to the application by filling out a form with the user’s name, email, phone number, and address. The user data is stored in a database and displayed in a table using jQuery DataTables. Edit User: The user can edit an existing user in the application by clicking on the Edit button in the table. The user can modify the user’s name, email, phone number, and address. The changes are saved in the database and updated in the table. Delete User: The user can delete an existing user in the application by clicking on the Delete button in the table. The user data is removed from the database and the table. Search User: The user can search for a user in the application by entering their user ID in a search box. The application will display the matching user or a message indicating that the user was not found. Generate PDF: The user can generate a PDF file of the table with the user data by clicking on the Generate PDF button. The PDF file is created using iTextSharp library and downloaded to the user’s device.

Dependencies 📦
jQuery DataTables: This library is used to display the user data in a table with pagination, sorting, and filtering features. iTextSharp: This library is used to create and manipulate PDF files.

Controllers 🎮
UserController 🙋‍♂️ This controller handles all the operations related to the user data. It includes the following methods:

AddUser(User user): This method adds a new user to the application and returns a JSON result with the updated list of users. ShowAllUser(): This method returns all the users as a JSON result. GetUserById(int userId): This method retrieves a user from the list based on their user ID. SearchUser(int UserId): This method searches for a user in the list based on their user ID and returns a JSON result with the found user or a message indicating that the user was not found. RemoveUser(int UserId): This method removes a user from the list based on their user ID and returns a JSON result with the updated list of users. EditUser(User user): This method edits an existing user in the list based on their user ID and returns a JSON result with the updated list of users.

LoginController 👮‍♂️ This controller handles all the operations related to the login functionality. It includes the following methods:

Login(): This method displays the login view with a form to enter username and password. Login(LoginModel model): This method validates the username and password entered by the user using Entity Framework and redirects them to the index view if successful or displays an error message if not.

Views 👀
Index.cshtml: This view displays the user interface to manage the user data after logging in. Login.cshtml: This view displays the login form to enter username and password.

How to Use 🚀
Clone the repository. Open the solution in Visual Studio. Run the application. Use your username and password to log in to the application. Use the user interface to manage the user data.

Contributing 👥
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

License 📝
This project is licensed under the MIT License.

Do you like this version of your readme.md file?

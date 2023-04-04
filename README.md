🌟 User Management Application 🌟
This is a Single Page Application (SPA) that manages user data. The application is built using ASP.NET MVC and provides a simple user interface to add, edit, delete, and search for users.

Technologies Used 💻
ASP.NET MVC Framework
C#
JavaScript
HTML/CSS
jQuery
Controllers 🎮
UserController 🙋‍♂️
This controller handles all the operations related to the user data. It includes the following methods:

AddUser(User user): This method adds a new user to the application and returns a JSON result with the updated list of users.
ShowAllUser(): This method returns all the users as a JSON result.
GetUserById(int userId): This method retrieves a user from the list based on their user ID.
SearchUser(int UserId): This method searches for a user in the list based on their user ID and returns a JSON result with the found user or a message indicating that the user was not found.
RemoveUser(int UserId): This method removes a user from the list based on their user ID and returns a JSON result with the updated list of users.
EditUser(User user): This method edits an existing user in the list based on their user ID and returns a JSON result with the updated list of users.
Views 👀
Index.cshtml: This view displays the user interface to manage the user data.
How to Use 🚀
Clone the repository.
Open the solution in Visual Studio.
Run the application.
Use the user interface to manage the user data.
Contributing 👥
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

License 📝
This project is licensed under the MIT License.

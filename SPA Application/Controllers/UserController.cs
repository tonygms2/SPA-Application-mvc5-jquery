using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SPA_Application.Models;

namespace SPA_Application.Controllers
{
    public class UserController : Controller
    {
        //Creating a list of User
        private static List<User> userList = new List<User>();

        //Adds individual User to the List<User>
        public void AddUserToList(User user)
        {
            userList.Add(user);
        }

        //Adds a user to the List<User> and returns the Json
        [HttpPost]
        public JsonResult AddUser(User user)
        {
            AddUserToList(user);
            return Json(userList, JsonRequestBehavior.AllowGet);
        }

        //return all JSON Result
        public JsonResult ShowAllUser()
        {
            return Json(userList, JsonRequestBehavior.AllowGet);
        }

        public User GetUserById(int userId)
        {
            foreach (User user in userList)
            {
                if (user.UserID == userId)
                {
                    return user;
                }
            }
            return null;
        }

        [HttpPost]
        public JsonResult SearchUser(int UserId)
        {
            User result = GetUserById(UserId);

            if (result != null)
            {
                return Json(userList, JsonRequestBehavior.AllowGet);
            }

            return Json(new { message = "Result Not Found for the id " + UserId });
        }

        [HttpPost]
        public JsonResult RemoveUser(int UserId)
        {
            int index = userList.IndexOf(GetUserById(UserId));
            userList.RemoveAt(index);
            return Json(userList, JsonRequestBehavior.AllowGet);
        }

        // GET: User
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult EditUser(User user)
        {
            User existingUser = GetUserById(user.UserID);
            if (existingUser != null)
            {
                // Update the existing user with the new values
                existingUser.FirstName = user.FirstName;
                existingUser.LastName = user.LastName;
                existingUser.Email = user.Email;

                return Json(userList, JsonRequestBehavior.AllowGet);
            }

            return Json(new { message = "User not found for the id " + user.UserID });
        }
    }
}
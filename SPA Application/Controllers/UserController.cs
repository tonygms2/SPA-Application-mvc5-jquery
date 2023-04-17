using SPA_Application.DataAccess;
using SPA_Application.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace SPA_Application.Controllers
{
    public class UserController : Controller
    {
        private Query query;

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
            query = new Query();
            query.InsertUser(user);
            return Json(userList, JsonRequestBehavior.AllowGet);
        }

        //return all JSON Result
        [HttpPost]
        public JsonResult ShowAllUser()
        {
            query = new Query();

            string message = "success";

            var js = new
            {
                recordsTotal = query.GetTotalRecords(),
                //recordsFiltered = query.GetRecFilter(),
                data = query.DisplayUserData(),
                message = message,
                success = Convert.ToBoolean(message != "success" ? false : true)
            };
            var jsonResult = this.Json(js, "JSON", JsonRequestBehavior.AllowGet);
            //var allName = query.GetAllCustomersFullName();
            //var user = query.GetFullNameFromID();
            return jsonResult;
        }

        public User GetUserById(int userId)
        {
            foreach (User user in userList)
            {
                if (int.Parse(user.UserID) == userId)
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
            User existingUser = GetUserById(int.Parse(user.UserID));
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
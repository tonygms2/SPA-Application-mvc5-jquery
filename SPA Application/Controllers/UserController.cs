using SPA_Application.DataAccess;
using SPA_Application.Models;
using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace SPA_Application.Controllers
{
    public class UserController : Controller
    {
        private Query query;

        //Creating a list of User
        //private static List<User> userList = new List<User>();

        public string AddUserToList(User user)
        {
            //create a new instance of the query
            query = new Query();
            //insert a new user in the InsertUser
            query.InsertUser(user);
            return query.DisplayUserData();
        }

        //Adds a user to the List<User> and returns the Json
        [HttpPost]
        public JsonResult AddUser(User user)
        {
            return Json(AddUserToList(user), JsonRequestBehavior.AllowGet);
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
                data = query.DisplayUserData(),
                message,
                success = Convert.ToBoolean(message != "success" ? false : true)
            };
            var jsonResult = this.Json(js, "JSON", JsonRequestBehavior.AllowGet);

            return jsonResult;
        }

        //public User GetUserById(int userId)
        //{
        //    foreach (User user in userList)
        //    {
        //        if (int.Parse(user.UserID) == userId)
        //        {
        //            return user;
        //        }
        //    }
        //    return null;
        //}

        //[HttpPost]
        //public JsonResult SearchUser(int UserId)
        //{
        //    User result = GetUserById(UserId);

        //    if (result != null)
        //    {
        //        return Json(userList, JsonRequestBehavior.AllowGet);
        //    }

        //    return Json(new { message = "Result Not Found for the id " + UserId });
        //}

        [HttpPost]
        public JsonResult RemoveUser(int UserId)
        {
            query = new Query();
            query.DeleteUser(UserId);
            return Json(query.DisplayUserData(), JsonRequestBehavior.AllowGet);
        }

        // GET: User
        public ActionResult Index()
        {
            return View();
        }

        //        [HttpPost]
        //        public JsonResult EditUser(User user)
        //        {
        //            User existingUser = GetUserById(int.Parse(user.UserID));
        //            if (existingUser != null)
        //            {
        //                // Update the existing user with the new values
        //                existingUser.FirstName = user.FirstName;
        //                existingUser.LastName = user.LastName;
        //                existingUser.Email = user.Email;

        //                return Json(userList, JsonRequestBehavior.AllowGet);
        //            }

        //            return Json(new { message = "User not found for the id " + user.UserID });
        //        }
        //    }
        //}
    }
}
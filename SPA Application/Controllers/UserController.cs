using Newtonsoft.Json;
using SPA_Application.DataAccess;
using SPA_Application.Models;
using System;
using System.Web.Mvc;

namespace SPA_Application.Controllers
{
    public class UserController : Controller
    {
        private Query query;

        public string AddUserToList(User user)
        {
            //create a new instance of the query
            query = new Query();

            return (query.InsertUser(user) != -1) ? JsonConvert.SerializeObject(query.DisplayUserData()) : "Duplicate UserID";
        }

        //Adds a user to the List<User> and returns the Json
        [HttpPost]
        public JsonResult AddUser(User user)
        {
            query = new Query();
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
    }
}
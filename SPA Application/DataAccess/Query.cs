using Newtonsoft.Json;
using SPA_Application.Models;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

namespace SPA_Application.DataAccess
{
    public class Query
    {
        private string connectionString = "Data Source=localhost\\SQLEXPRESS;Initial Catalog=UserDatabase;Integrated Security=SSPI";

        public string DisplayUserData()
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                // Create a command object
                SqlCommand cmd = new SqlCommand("SELECT UserID,FirstName,LastName,Email  FROM UserTable", conn);

                // Open the connection
                conn.Open();

                // Execute the query and get the data
                SqlDataReader rdr = cmd.ExecuteReader();

                // Create a DataTable object to store the data in memory
                DataTable dataTable = new DataTable();

                // Load the data from the SqlDataReader into the DataTable
                dataTable.Load(rdr);

                // Convert the DataTable into a JSON string
                // string json = JsonConvert.SerializeObject(dataTable);
                string json = JsonConvert.SerializeObject(dataTable, Formatting.None);

                // Close the reader and the connection
                rdr.Close();
                conn.Close();
                return json;
            }
        }

        public int GetTotalRecords()
        {
            string sql = "SELECT COUNT(*) FROM UserTable";
            using (var connection = new SqlConnection(connectionString))
            {
                using (var command = new SqlCommand(sql, connection))
                {
                    connection.Open();
                    int count = (int)command.ExecuteScalar();
                    return count;
                }
            }
        }

        //public List<User> MapUserData()
        //{
        //    List<User> UserList = new List<User>();

        //    using (var connection = new SqlConnection(connectionString))
        //    {
        //        connection.Open();
        //        UserList = connection.Query<User>("SELECT UserID,FirstName,LastName,Email  FROM UserTable").ToList();
        //    }

        //    return UserList;

        //}

        public List<string> GetAllCustomersFullName()
        {
            List<string> result = new List<string>();

            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("SpGetAllCustomersFullName", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    conn.Open();

                    using (SqlDataReader rdr = cmd.ExecuteReader())
                    {
                        while (rdr.Read())
                        {
                            result.Add(rdr.GetString(0));
                        }
                    }
                }
            }

            return result;
        }

        public List<string> GetFullNameFromID()
        {
            List<string> result = new List<string>();

            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("GetCustomerByID", conn))
                {
                    conn.Open();
                    cmd.CommandType = CommandType.StoredProcedure;

                    SqlParameter param = new SqlParameter("@CustomerID", SqlDbType.Int);
                    param.Value = 999;

                    cmd.Parameters.Add(param);

                    using (SqlDataReader rdr = cmd.ExecuteReader())
                    {
                        while (rdr.Read())
                        {
                            string fullName = rdr.GetString(rdr.GetOrdinal("FullName"));
                            result.Add(fullName);
                        }
                    }
                }
            }

            return result;
        }

        public void InsertUser(User user)
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                // Create a command object
                SqlCommand cmd = new SqlCommand("INSERT INTO UserTable(UserID, FirstName, LastName, Email) VALUES (@user_id, @first_name, @last_name, @email)", conn);

                // Open the connection

                // Add the parameters
                cmd.Parameters.Add("@user_id", SqlDbType.VarChar).Value = user.UserID;
                cmd.Parameters.Add("@first_name", SqlDbType.VarChar).Value = user.FirstName;
                cmd.Parameters.Add("@last_name", SqlDbType.VarChar).Value = user.LastName;
                cmd.Parameters.Add("@email", SqlDbType.VarChar).Value = user.Email;

                if (conn.State == ConnectionState.Closed)
                {
                    // Open the connection
                    conn.Open();
                }

                // Execute the query
                cmd.ExecuteNonQuery();
            }
        }
    }
}
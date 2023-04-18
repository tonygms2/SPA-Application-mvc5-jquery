using Newtonsoft.Json;
using SPA_Application.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

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
                SqlCommand cmd = new SqlCommand("SpDisplayUserData", conn);
                cmd.CommandType = CommandType.StoredProcedure;
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

                // Close the reader and the connection
                rdr.Close();
                conn.Close();
                return JsonConvert.SerializeObject(dataTable, Formatting.None);
            }
        }

        public void DeleteUser(int userId)
        {
            using(SqlConnection connection = new SqlConnection(connectionString))
            {
                using(SqlCommand command = new SqlCommand("SpDeletUser",connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    connection.Open();
                    command.Parameters.Add("@user_id", SqlDbType.VarChar).Value = userId;

                    if (connection.State == ConnectionState.Closed)
                    {
                        // Open the connection
                        connection.Open();
                    }
                    command.ExecuteNonQuery();
                }
            }

        }

        public int GetTotalRecords()
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                using (SqlCommand command = new SqlCommand("SpDisplayUserData", connection))
                {
                    //set the type of command
                    command.CommandType = CommandType.StoredProcedure;
                    //open a connection
                    connection.Open();
                    //initialize SqlDataReader
                    SqlDataReader rdr = command.ExecuteReader();
                    //initialize DataTable
                    DataTable dataTable = new DataTable();
                    //The query returns 2 table. Second table returns rowcount, thats why we use
                    //NextResult() to get the next table from the datareader.
                    rdr.NextResult();

                    // Load the data from the SqlDataReader into the DataTable
                    dataTable.Load(rdr);
                    //Get the first row first column of the datatable, get the string and parse to int.
                    return Convert.ToInt32(dataTable.Rows[0][0].ToString());
                }
            }
        }

       

        public void InsertUser(User user)
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                // Create a command object
                SqlCommand cmd = new SqlCommand("Sp_InsertUser", conn);
                cmd.CommandType = CommandType.StoredProcedure;
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


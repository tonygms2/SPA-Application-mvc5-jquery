//All the event handlers are being ready when the document loads.
var userTable;
$(function () {
    loadUser();
    $("#mainContainer").css("margin-top", "15px");
    $("#mainContainerBody,#addBtn").css("margin-bottom", "15px");
    $("#home").click(function () {
        window.location.href = "/Home/Index";
    });
    $("#about").click(function () {
        window.location.href = "/Home/About";
    });

    $(".check-login").click(function () {
        $("#myModal").modal('show');
        /*showLoginForm();*/
    });

    $("a").hover(
        function () {
            $(this).css("cursor", "pointer");
        },
        function () {
            $(this).css("cursor", "auto");
        }
    );
    //Runs the first time and loads any data from the list if there are any.

    $(".login-button").on("click", function (e) {
        /*showLoginModal()*/
        let login = $('#username').val();
        let password = $('#password').val();
        

        if (!login || !password) {
            $("#myModal").modal('hide');
            $("#errorModal").modal('show');
            $('#username,#password').val('');
        } else if (login !== 'admin' || password !== 'admin') {
            $("#myModal").modal('hide');
            $("#errorModal_1").modal('show');
            $('#username,#password').val('');
        } else {
            // Redirect to another URL
            window.location.href = "/User/Index";
        }
    });

    //Add functionality to add user.
    $("#addBtn").on("click", function (e) {
        // Get the input values
        let userID = $("#UserID").val();
        let firstName = $("#FirstName").val();
        let lastName = $("#LastName").val();
        let email = $("#Email").val();

        // Check that input fields are not empty
        if (!userID || !firstName || !lastName || !email) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill all the fields',
            })
            return;
        }
        //Pass the requestData with the value from input field to pass the json Data.
        let requestData = {
            UserId: userID,
            FirstName: firstName,
            LastName: lastName,
            Email: email
        }
        let emptyData = [];
        //Adds the json Data using POST method at /User/AddUser

        $.ajax({
            url: "/User/AddUser",
            method: "POST",
            data: requestData,
            success: function (data) {
                userTable.ajax.reload();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'User has been saved',
                    showConfirmButton: false,
                    timer: 1500
                })
                // Clear input fields
                $(".userForm").val('');
            },
            error: function (error) {
                console.error(error);
            }
        });
    });
});

function loadUser() {
    userTable = $('#userTable').DataTable({
        "ajax": {
            "url": "/User/ShowAllUser",
            "type": "POST",
            "dataSrc": function (json) {
                //var jsonData = JSON.parse(json);
                //console.log(jsonData.data);
                return JSON.parse(json.data);
            },
        },
        "columns": [
            { "title": "ID", data: "UserID" },
            { "title": "First Name", data: "FirstName" },
            { "title": "Last Name", data: "LastName" },
            { "title": "Email", data: "Email" },
            {
                "data": "delete", "render": function (data, type, row, meta) {
                    console.log(row.UserID)
                    return '<button type="button" class="btn btn-danger delete-btn" onclick="deleteUser(' + row.UserID + ')"  id="deleteUser" ' + row.UserID + '">Delete</button>';
                }
            }
            // Add more columns as needed
        ],
        dom: 'Bfrtip',
        buttons: [
            'copyHtml5',
            'excelHtml5',
            'csvHtml5',
            {
                extend: 'pdfHtml5', title: "The Christian Co-operative Credit Union Ltd., Dhaka",
                exportOptions: {
                    columns: [0, 1, 2, 3]
                }
            }
            
        ]
    });

    
}

//Generates each row of the UserTable
function generateUserTable(user) {
    let row = '<tr>';
    row += '<td>' + user.UserID + '</td>';
    row += '<td>' + user.FirstName + ' ' + user.LastName + '</td>';
    row += '<td>' + user.Email + '</td>';
    row += '<td><button type="button" class="btn btn-warning" onclick="editUser(' + user.UserID + ')">Edit</button></td>';
    row += '<td><button type="button" class="btn btn-danger" onclick="deleteUser(' + user.UserID + ')"  id="deleteUser" ' + user.UserID + '">Delete</button></td>';
    row += '</tr>';
    return row;
}

//Delete user and show popup after success or else show error.
function deleteUser(userId) {
    $.ajax({
        url: "/User/RemoveUser",
        method: "POST",
        data: { UserId: userId },
        success: function (data) {
            userTable.ajax.reload();
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'User has been deleted',
                showConfirmButton: false,
                timer: 1500
            })
        },
        error: function (error) {
            console.error(error);
        }
    });
}

function showLoginModal() {
    // Event listener for login button click
    const $username = $('#username');
    const $password = $('#password');
    const $errorModal = $("#errorModal");

    $(".login-form").on("submit", function (e) {
        e.preventDefault();

        const login = $username.val().trim();
        const password = $password.val().trim();
       

        if (!login || !password) {
            $errorModal.find('.modal-body').text('Please enter a username and password.');
            $errorModal.modal('show');
            $username.val('');
            $password.val('');
        } else if (login !== 'admin' || password !== 'admin') {
            $errorModal.find('.modal-body').text('Incorrect username or password.');
            $errorModal.modal('show');
            $username.val('');
            $password.val('');
        } else {
            // Redirect to another URL
            window.location.href = "/User/Index";
        }
    });
}
//All the event handlers are being ready when the document loads.
$(function () {
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
    $.ajax({
        url: "/User/ShowAllUser",
        method: "GET",
        success: function (data) {
            let userCards = data.map((item) => generateUserTable(item));
            $("#userTableBody").html(userCards);
        },
        error: function (error) {
            console.error(error);
        }
    });

    $(".login-button").on("click", function (e) {
        /*showLoginModal()*/
        let login = $('#username').val();
        let password = $('#password').val();
        console.log(login, password);

        if (!login || !password) {
            $("#myModal").modal('hide');
            $("#errorModal").modal('show');
            $('#username').val('');
            $('#password').val('');
        } else if (login !== 'admin' || password !== 'admin') {
            $("#myModal").modal('hide');
            $("#errorModal_1").modal('show');
            $('#username').val('');
            $('#password').val('');
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
        
        //Adds the json Data using POST method at /User/AddUser
        $.ajax({
            url: "/User/AddUser",
            method: "POST",
            data: requestData,
            success: function (data) {
                let userCards = data.map((item) => generateUserTable(item));
                $("#userTableBody").html(userCards);

                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'User has been saved',
                    showConfirmButton: false,
                    timer: 1500
                })
                // Clear input fields
                $("#UserID").val('');
                $("#FirstName").val('');
                $("#LastName").val('');
                $("#Email").val('');
            },
            error: function (error) {
                console.error(error);
            }
        });
    });
});



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
            let userCards = data.map((item) => generateUserTable(item));
            $("#userTableBody").html(userCards);

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
//Show login form using Swal, if login complete will redirect to User/Index
//function showLoginForm() {
//    Swal.fire({
//        title: 'Please login to continue',
//        html: `<input type="text" id="login" class="swal2-input" placeholder="Username">
//  <input type="password" id="password" class="swal2-input" placeholder="Password">`,
//        confirmButtonText: 'Sign in',
//        focusConfirm: false,
//        preConfirm: () => {
//            const login = $('#login').val();
//            const password = $('#password').val();
//            if (!login || !password) {
//                Swal.showValidationMessage(`Please enter login and password`)
//            } else {
//                // Check if the username and password match
//                if (login !== 'admin' || password !== 'admin') {
//                    Swal.showValidationMessage(`Invalid login or password`)
//                } else {
//                    return true;
//                }
//            }
//        }
//    }).then((result) => {
//        if (result.isConfirmed) {
//            // Redirect to another URL
//            window.location.href = "/User/Index";
//        }
//    })
//}

function showLoginModal() {
    // Event listener for login button click
    $('#login-button').on('click', function () {
        const login = $('#username').val();
        const password = $('#password').val();
        console.log(login, password)
        if (!login || !password) {
            /*Swal.showValidationMessage(`Please enter login and password`);*/
            alert("`Please enter login and password`");
        } else {
            // Check if the username and password match
            if (login !== 'admin' || password !== 'admin') {
                Swal.showValidationMessage(`Invalid login or password`);
            } else {
                // Redirect to another URL
                window.location.href = "/User/Index";
            }
        }
    });
}
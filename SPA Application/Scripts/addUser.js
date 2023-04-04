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

    let requestData = {
        UserId: userID,
        FirstName: firstName,
        LastName: lastName,
        Email: email
    }

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

//function generateUserCard(user) {
//    let card = '';
//    card += '<div class="col-md-3 border border-primary mb-3">';
//    card += '<div class="card shadow-sm h-100">';
//    card += '<div class="card-body">';
//    card += '<h5 class="card-title fw-bold mb-1">' + user.FirstName + ' ' + user.LastName + '</h5>';
//    card += '<h6 class="card-subtitle mb-3 text-muted">' + user.UserID + '</h6>';
//    card += '<p class="card-text fs-5">' + user.Email + '</p>';
//    card += '<div class="btn-group">';
//    card += '<button type="button" class="btn btn-outline-primary" id="editUser" onclick="editUser(' + user.UserID + ')">Edit</button>';
//    card += '<button type="button" class="btn btn-outline-danger" onclick="deleteUser(' + user.UserID + ')"  id="deleteUser" userid="' + user.UserID + '">Delete</button>';
//    card += '</div>';
//    card += '</div></div></div>';

//    return card;
//}

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

$(document).ready(function () {
    $("#home").click(function () {
        window.location.href = "/Home/Index";
    });
    $("#about").click(function () {
        window.location.href = "/Home/About";
    });

    $("#create-user-btn").click(function () {
        showLoginForm();
    });
    $("#edit-user-btn").click(function () {
        showLoginForm();
    });
    $("#delete-user-btn").click(function () {
        showLoginForm();
    });
    $("#all-user-btn").click(function () {
        showLoginForm();
    });

    $("#mainContainer").css("margin-top", "15px");
    $("#addBtn").css("margin-bottom", "15px");

    $("#mainContainerBody").css("margin-bottom", "15px");

    $("a").hover(
        function () {
            $(this).css("cursor", "pointer");
        },
        function () {
            $(this).css("cursor", "auto");
        }
    );
});

//function editUser(userId) {
//    $("#editUser").on("click", function (e) {
//        let requestData = {
//            UserId: $("#UserID").val(),
//            FirstName: $("#FirstName").val(),
//            LastName: $("#LastName").val(),
//            Email: $("#Email").val()
//        }

//        $.ajax({
//            url: "/User/EditUser",
//            method: "POST",
//            data: requestData,
//            success: function (data) {
//                let userCards = data.map((item) => generateUserCard(item));
//                $("#userCard").html(userCards);

//                Swal.fire({
//                    position: 'top-end',
//                    icon: 'success',
//                    title: 'User has been updated',
//                    showConfirmButton: false,
//                    timer: 1500
//                })
//                // Clear input fields
//                $("#UserID").val('');
//                $("#FirstName").val('');
//                $("#LastName").val('');
//                $("#Email").val('');
//            },
//            error: function (error) {
//                console.error(error);
//            }
//        });
//    });
//}

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

function showLoginForm() {
    Swal.fire({
        title: 'Please login to continue',
        html: `<input type="text" id="login" class="swal2-input" placeholder="Username">
  <input type="password" id="password" class="swal2-input" placeholder="Password">`,
        confirmButtonText: 'Sign in',
        focusConfirm: false,
        preConfirm: () => {
            const login = $('#login').val();
            const password = $('#password').val();
            if (!login || !password) {
                Swal.showValidationMessage(`Please enter login and password`)
            } else {
                // Check if the username and password match
                if (login !== 'admin' || password !== 'admin') {
                    Swal.showValidationMessage(`Invalid login or password`)
                } else {
                    return true;
                }
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            // Redirect to another URL
            window.location.href = "/User/Index";
        }
    })
}

//$("#deleteUser").on("click", function (e) {
//    console.log("test");
//})

$(document).ready(function () {
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
});

//function showLoginModal() {
//    $("#modalLoginForm").modal("show");
//}

//$("#login-btn").on("click", function (e) {
//    login();
//});

//// Function to handle login
//function login() {
//    const login = $('#defaultForm-email').val();
//    const password = $('#defaultForm-pass').val();
//    console.log(login, password);
//    if (!login || !password) {
//        swal("Error", "Please enter both username and password", "error");
//    } else {
//        // Check if the username and password match
//        if (login !== 'admin' || password !== 'admin') {
//            swal("Success", "You have successfully logged in", "success");
//            $("modalLoginForm").modal("hide");
//        } else {
//            return true;
//        }
//    }
//}
function displayShowRegister() {
    document.getElementById("register-card").style.display = "block";
    document.getElementById("loggin").style.display = "none"
    document.querySelector(".quizlet").style.display = "none"
    document.querySelector(".main-container").style.display = "none"
    document.querySelector(".nav-bar-create").style.display = "flex"
    document.getElementById("dashboard-nav").style.display = "none"
    document.getElementById("dashboard").style.display = "none"
    document.getElementById("container-vocab").style.display = "none"
    displayClearError();
};
function displayShowLogin() {
    document.getElementById("loggin").style.display = "block"
    document.getElementById("register-card").style.display = "none"
    document.querySelector(".quizlet").style.display = "none"
    document.querySelector(".main-container").style.display = "none"
    document.querySelector(".nav-bar-create").style.display = "flex";
    document.getElementById("dashboard-nav").style.display = "none"
    document.getElementById("dashboard").style.display = "none"
    document.getElementById("container-vocab").style.display = "none"

    displayClearError();
}
function displayRegister() {
    let firstName = document.getElementById("first-name").value.trim();
    let lastName = document.getElementById("last-name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("pass").value;
    let confirmPass = document.getElementById("confirm-pass").value;
    displayClearError();
    let isValid = true;
    if (!firstName) {
        displayShowError("First name cannot be blank", "first-name-error");
        isValid = false;
    }
    if (!lastName) {
        displayShowError("Last name cannot be blank", "last-name-error");
        isValid = false;
    }
    const emailCheck = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let emailExists = users.some(user => user.email === email);
    if (!emailCheck.test(email)) {
        displayShowError("Invalid email format!", "email-error");
        isValid = false;
    } else if (emailExists) {
        displayShowError("Email already exists!", "email-error");
        isValid = false;
    }
    const passCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!passCheck.test(password)) {
        displayShowError("Password must be at least 8 characters, including an uppercase letter, a lowercase letter, and a number", "pass-error");
        isValid = false;
    }
    if (password !== confirmPass) {
        displayShowError("Passwords do not match", "confirm-pass-error");
        isValid = false;
    }
    if (isValid) {
        let newUser = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        alert("Registration successful! Please log in.");
        displayShowLogin();
        document.querySelectorAll("#register-card input").forEach(input => input.value = "");
    }
}

function displayLogin() {
    let email = document.getElementById("login-email").value.trim();
    let pass = document.getElementById("login-pass").value.trim();

    displayClearError();
    let isValid = true;
    if (!email) {
        displayShowError("Email cannot be blank", "login-email-error")
        isValid = false;
    }
    if (!pass) {
        displayShowError("Password cannot be blank!", "login-pass-error")
        isValid = false;
    }
    if (isValid) {
        let indexUser = JSON.parse(localStorage.getItem("users")) || [];
        let user = indexUser.find(user => user.email === email && user.password === pass)
        if (!user) {
            displayShowError("Email or Password is incorrect", "login-email-error");
            displayShowError("", "login-pass-error");
        } else {
            swal({
                title: "WELCOME BACK!",
                text: "You have successfully logged in !",
                icon: "success",
                button: "Aww yiss!",
              });
            localStorage.setItem("currentUser", JSON.stringify(user))
            displayShowDashboard();
            document.getElementById("login-email").value = ""
            document.getElementById("login-pass").value = ""
        }
    }
}
function displayLogout() {
    if (confirm("Do you want to logout of your account?")) {
        localStorage.removeItem("currentUser")
        document.getElementById("loggin").style.display = "none"
        document.getElementById("register-card").style.display = "none"
        document.querySelector(".quizlet").style.display = "flex"
        document.querySelector(".main-container").style.display = "block"
        document.querySelector(".nav-bar-create").style.display = "none";
        document.getElementById("dashboard-nav").style.display = "none"
        document.getElementById("dashboard").style.display = "none"
        document.getElementById("container-vocab").style.display = "none";
        displayClearError();
    }
}
function displayShowError(mess, errorId) {
    let errorElement = document.getElementById(errorId);
    errorElement.innerText = mess
    errorElement.style.display = "block"
}
function displayClearError() {
    let errors = document.querySelectorAll('.error')
    errors.forEach(error => {
        error.innerText = "";
        error.style.display = "none"
    });
}

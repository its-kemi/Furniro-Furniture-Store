/*  LOGIN FORM  */

const loginForm = document.querySelector("#loginForm");

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const email = document.querySelector("#login-email").value;
    const password = document.querySelector("#login-password").value;

    if (email === "" || password === "") {

        alert("Please fill in all fields.");

        return;
    }

    alert("Login successful!");

    loginForm.reset();

});


/*  REGISTER FORM  */

const registerForm = document.querySelector("#registerForm");

registerForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document.querySelector("#register-name").value;
    const email = document.querySelector("#register-email").value;
    const password = document.querySelector("#register-password").value;
    const confirmPassword = document.querySelector("#register-confirm").value;


    if (
        name === "" ||
        email === "" ||
        password === "" ||
        confirmPassword === ""
    ) {

        alert("Please fill in all fields.");

        return;
    }


    if (password !== confirmPassword) {

        alert("Passwords do not match.");

        return;
    }


    alert("Account created successfully!");

    registerForm.reset();

});
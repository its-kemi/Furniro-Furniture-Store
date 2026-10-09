/*
   ACCOUNT LOGIN
   Password Hashing with PBKDF2
*/

document.addEventListener("DOMContentLoaded", function () {

    /*
       Account elements
    */

    const accountModal =
        document.getElementById("accountModal");

    const accountClose =
        document.getElementById("accountClose");


    /*
       Login form
    */

    const loginForm =
        document.getElementById("modalLoginForm");


    /*
       Login inputs
    */

    const loginEmailInput =
        document.getElementById("modal-login-email");

    const loginPasswordInput =
        document.getElementById("modal-login-password");


    /*
       Create message element
    */

    function createMessage(input, type, message) {

        if (!input) {
            return;
        }

        let messageElement =
            input.parentElement.querySelector(
                `[data-message-for="${input.id}"]`
            );

        if (!messageElement) {

            messageElement = document.createElement("small");

            messageElement.dataset.messageFor = input.id;

            messageElement.className = "account-form-message";

            input.insertAdjacentElement(
                "afterend",
                messageElement
            );

        }

        messageElement.classList.remove("error", "success");

        messageElement.classList.add(type);

        messageElement.textContent = message;

    }


    /*
       Clear input message
    */

    function clearMessage(input) {

        if (!input) {
            return;
        }

        const messageElement =
            input.parentElement.querySelector(
                `[data-message-for="${input.id}"]`
            );

        if (messageElement) {

            messageElement.textContent = "";

            messageElement.classList.remove("error", "success");

        }

    }


    /*
       Clear messages while typing
    */

    [loginEmailInput, loginPasswordInput].forEach(
        function (input) {

            if (input) {

                input.addEventListener("input", function () {
                    clearMessage(input);
                });

            }

        }
    );


    /*
       Close Account Modal
    */

    if (accountClose) {

        accountClose.addEventListener("click", function () {

            if (accountModal) {

                accountModal.classList.remove("active");

                accountModal.setAttribute(
                    "aria-hidden",
                    "true"
                );

            }

            document.body.style.overflow = "";

        });

    }


    /*
       Login
    */

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                /*
                   Clear old messages
                */

                clearMessage(loginEmailInput);
                clearMessage(loginPasswordInput);


                /*
                   Get login information
                */

                const email = loginEmailInput
                    ? loginEmailInput.value.trim().toLowerCase()
                    : "";

                const password = loginPasswordInput
                    ? loginPasswordInput.value
                    : "";


                /*
                   Email validation
                */

                if (!email) {

                    createMessage(
                        loginEmailInput,
                        "error",
                        "Please enter your email address."
                    );

                    if (loginEmailInput) {
                        loginEmailInput.focus();
                    }

                    return;

                }


                /*
                   Password validation
                */

                if (!password) {

                    createMessage(
                        loginPasswordInput,
                        "error",
                        "Please enter your password."
                    );

                    if (loginPasswordInput) {
                        loginPasswordInput.focus();
                    }

                    return;

                }


                /*
                   Check password utility
                */

                if (
                    !window.FurniroPassword ||
                    typeof window.FurniroPassword.verifyPassword !==
                        "function"
                ) {

                    Swal.fire({
                        icon: "error",
                        title: "Security Utility Missing",
                        text: "Please check Password-Utils.js and its script order."
                    });

                    return;

                }


                /*
                   Get registered users
                */

                let users = [];

                try {

                    users = JSON.parse(
                        localStorage.getItem("furniroUsers")
                    ) || [];

                    if (!Array.isArray(users)) {
                        throw new Error("Invalid users data.");
                    }

                } catch (error) {

                    Swal.fire({
                        icon: "error",
                        title: "Storage Error",
                        text: "Unable to read registered accounts."
                    });

                    return;

                }


                /*
                   Find user by email
                */

                const user = users.find(function (item) {

                    return (
                        item.email &&
                        item.email.toLowerCase() === email
                    );

                });


                /*
                   Email does not exist
                */

                if (!user) {

                    createMessage(
                        loginEmailInput,
                        "error",
                        "No account found with this email."
                    );

                    if (loginEmailInput) {
                        loginEmailInput.focus();
                    }

                    return;

                }


                /*
                   Check hashed password
                */

                if (!user.passwordHash || !user.passwordSalt) {

                    createMessage(
                        loginPasswordInput,
                        "error",
                        "This account uses the old password format. Please register a new test account."
                    );

                    if (loginPasswordInput) {
                        loginPasswordInput.focus();
                    }

                    return;

                }


                /*
                   Verify password
                */

                let passwordIsCorrect = false;

                try {

                    passwordIsCorrect =
                        await window.FurniroPassword.verifyPassword(
                            password,
                            user.passwordSalt,
                            user.passwordHash
                        );

                } catch (error) {

                    console.error(
                        "Password verification error:",
                        error
                    );

                    Swal.fire({
                        icon: "error",
                        title: "Verification Failed",
                        text: "Unable to verify the password. Please try again."
                    });

                    return;

                }


                /*
                   Wrong password
                */

                if (!passwordIsCorrect) {

                    createMessage(
                        loginPasswordInput,
                        "error",
                        "Incorrect password."
                    );

                    if (loginPasswordInput) {
                        loginPasswordInput.focus();
                    }

                    return;

                }


                /*
                   Current user
                   Never include password or hash
                */

                const currentUser = {

                    id: user.id,

                    name: user.name,

                    email: user.email,

                    photo:
                        user.photo ||
                        ""

                };


                /*
                   Save current user
                */

                localStorage.setItem(
                    "furniroCurrentUser",
                    JSON.stringify(currentUser)
                );


                /*
                   Login success
                   Then go to Home
                */

                await Swal.fire({

                    icon: "success",

                    title: "Login Successful!",

                    text: "Welcome back!",

                    confirmButtonText: "OK"

                });


                /*
                   Go to Home page
                */

                window.location.href = "index.html";


                /*
                   Reset form
                */

                loginForm.reset();

            }
        );

    }

});
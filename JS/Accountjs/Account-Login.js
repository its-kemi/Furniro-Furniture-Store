/*
   ACCOUNT LOGIN
*/

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /*
           Account elements
        */

        const accountModal =
            document.getElementById(
                "accountModal"
            );

        const accountClose =
            document.getElementById(
                "accountClose"
            );


        /*
           Login form
        */

        const loginForm =
            document.getElementById(
                "modalLoginForm"
            );


        /*
           Login inputs
        */

        const loginEmailInput =
            document.getElementById(
                "modal-login-email"
            );

        const loginPasswordInput =
            document.getElementById(
                "modal-login-password"
            );


        /*
           Create message element
        */

        function createMessage(
            input,
            type,
            message
        ) {

            if (!input) {
                return;
            }


            let messageElement =
                input.parentElement.querySelector(
                    `[data-message-for="${input.id}"]`
                );


            /*
               Create message if it
               does not already exist
            */

            if (!messageElement) {

                messageElement =
                    document.createElement(
                        "small"
                    );

                messageElement.dataset.messageFor =
                    input.id;

                messageElement.className =
                    "account-form-message";


                /*
                   Put message directly
                   after input
                */

                input.insertAdjacentElement(
                    "afterend",
                    messageElement
                );

            }


            /*
               Clear old classes
            */

            messageElement.classList.remove(
                "error",
                "success"
            );


            /*
               Add new type
            */

            messageElement.classList.add(
                type
            );


            /*
               Set message
            */

            messageElement.textContent =
                message;

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

                messageElement.textContent =
                    "";

                messageElement.classList.remove(
                    "error",
                    "success"
                );

            }

        }


        /*
           Clear messages when
           user changes email
        */

        if (loginEmailInput) {

            loginEmailInput.addEventListener(
                "input",
                function () {

                    clearMessage(
                        loginEmailInput
                    );

                }
            );

        }


        /*
           Clear messages when
           user changes password
        */

        if (loginPasswordInput) {

            loginPasswordInput.addEventListener(
                "input",
                function () {

                    clearMessage(
                        loginPasswordInput
                    );

                }
            );

        }


        /*
           Close Account Modal
        */

        if (accountClose) {

            accountClose.addEventListener(
                "click",
                function () {

                    if (accountModal) {

                        accountModal.classList.remove(
                            "active"
                        );

                        accountModal.setAttribute(
                            "aria-hidden",
                            "true"
                        );

                    }


                    document.body.style.overflow =
                        "";

                }
            );

        }


        /*
           Login
        */

        if (loginForm) {

            loginForm.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    /*
                       Clear old messages
                    */

                    clearMessage(
                        loginEmailInput
                    );

                    clearMessage(
                        loginPasswordInput
                    );


                    /*
                       Get login information
                    */

                    const email =
                        loginEmailInput
                            ? loginEmailInput.value
                                .trim()
                                .toLowerCase()
                            : "";


                    const password =
                        loginPasswordInput
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

                        loginEmailInput.focus();

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

                        loginPasswordInput.focus();

                        return;

                    }


                    /*
                       Get users
                    */

                    let users = [];


                    try {

                        users =
                            JSON.parse(
                                localStorage.getItem(
                                    "furniroUsers"
                                )
                            ) || [];

                    } catch (error) {

                        users = [];

                    }


                    /*
                       Find user
                    */

                    const user =
                        users.find(
                            function (item) {

                                return (
                                    item.email ===
                                    email
                                );

                            }
                        );


                    /*
                       Email does not exist
                    */

                    if (!user) {

                        createMessage(
                            loginEmailInput,
                            "error",
                            "No account found with this email."
                        );

                        loginEmailInput.focus();

                        return;

                    }


                    /*
                       Wrong password
                    */

                    if (
                        user.password !==
                        password
                    ) {

                        createMessage(
                            loginPasswordInput,
                            "error",
                            "Incorrect password."
                        );

                        loginPasswordInput.focus();

                        return;

                    }


                    /*
                       Current user
                    */

                    const currentUser = {

                        id:
                            user.id,

                        name:
                            user.name,

                        email:
                            user.email,

                        photo:
                            user.photo ||
                            "assite/Header-images/logo.png"

                    };


                    /*
                       Save current user
                    */

                    localStorage.setItem(
                        "furniroCurrentUser",
                        JSON.stringify(
                            currentUser
                        )
                    );


                    /*
                       Show SweetAlert
                       Then go to Home
                    */

                    Swal.fire({

                        icon:
                            "success",

                        title:
                            "Login Successful!",

                        text:
                            "Welcome back!",

                        confirmButtonText:
                            "OK"

                    }).then(function () {

                        /*
                           Go to Home page
                        */

                        window.location.href =
                            "index.html";

                    });


                    /*
                       Reset form
                    */

                    loginForm.reset();

                }
            );

        }

    }
);
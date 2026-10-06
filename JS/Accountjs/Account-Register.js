/*
   ACCOUNT REGISTER
*/

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /*
           Register elements
        */

        const registerForm =
            document.getElementById(
                "modalRegisterForm"
            );

        const registerNameInput =
            document.getElementById(
                "modal-register-name"
            );

        const registerEmailInput =
            document.getElementById(
                "modal-register-email"
            );

        const registerPasswordInput =
            document.getElementById(
                "modal-register-password"
            );

        const registerConfirmInput =
            document.getElementById(
                "modal-register-confirm"
            );


        /*
           Account Modal
        */

        const accountModal =
            document.getElementById(
                "accountModal"
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
               Create message
               if it does not exist
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
               Add message type
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
           Clear name message
        */

        if (registerNameInput) {

            registerNameInput.addEventListener(
                "input",
                function () {

                    clearMessage(
                        registerNameInput
                    );

                }
            );

        }


        /*
           Clear email message
        */

        if (registerEmailInput) {

            registerEmailInput.addEventListener(
                "input",
                function () {

                    clearMessage(
                        registerEmailInput
                    );

                }
            );

        }


        /*
           Clear password message
        */

        if (registerPasswordInput) {

            registerPasswordInput.addEventListener(
                "input",
                function () {

                    clearMessage(
                        registerPasswordInput
                    );

                }
            );

        }


        /*
           Clear confirm password message
        */

        if (registerConfirmInput) {

            registerConfirmInput.addEventListener(
                "input",
                function () {

                    clearMessage(
                        registerConfirmInput
                    );

                }
            );

        }


        /*
           Register
        */

        if (registerForm) {

            registerForm.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    /*
                       Clear old messages
                    */

                    clearMessage(
                        registerNameInput
                    );

                    clearMessage(
                        registerEmailInput
                    );

                    clearMessage(
                        registerPasswordInput
                    );

                    clearMessage(
                        registerConfirmInput
                    );


                    /*
                       Get register information
                    */

                    const name =
                        registerNameInput
                            ? registerNameInput.value.trim()
                            : "";


                    const email =
                        registerEmailInput
                            ? registerEmailInput.value
                                .trim()
                                .toLowerCase()
                            : "";


                    const password =
                        registerPasswordInput
                            ? registerPasswordInput.value
                            : "";


                    const confirmPassword =
                        registerConfirmInput
                            ? registerConfirmInput.value
                            : "";


                    /*
                       Name validation
                    */

                    if (name.length < 2) {

                        createMessage(
                            registerNameInput,
                            "error",
                            "Please enter your full name."
                        );

                        registerNameInput.focus();

                        return;

                    }


                    /*
                       Email validation
                    */

                    if (!email) {

                        createMessage(
                            registerEmailInput,
                            "error",
                            "Please enter your email address."
                        );

                        registerEmailInput.focus();

                        return;

                    }


                    /*
                       Email format validation
                    */

                    if (
                        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                            email
                        )
                    ) {

                        createMessage(
                            registerEmailInput,
                            "error",
                            "Please enter a valid email address."
                        );

                        registerEmailInput.focus();

                        return;

                    }


                    /*
                       Password validation
                    */

                    if (!password) {

                        createMessage(
                            registerPasswordInput,
                            "error",
                            "Please create a password."
                        );

                        registerPasswordInput.focus();

                        return;

                    }


                    /*
                       Password length
                    */

                    if (password.length < 6) {

                        createMessage(
                            registerPasswordInput,
                            "error",
                            "Password must be at least 6 characters."
                        );

                        registerPasswordInput.focus();

                        return;

                    }


                    /*
                       Confirm password
                    */

                    if (!confirmPassword) {

                        createMessage(
                            registerConfirmInput,
                            "error",
                            "Please confirm your password."
                        );

                        registerConfirmInput.focus();

                        return;

                    }


                    /*
                       Password match
                    */

                    if (
                        password !==
                        confirmPassword
                    ) {

                        createMessage(
                            registerConfirmInput,
                            "error",
                            "Passwords do not match."
                        );

                        registerConfirmInput.focus();

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
                       Check existing user
                    */

                    const existingUser =
                        users.find(
                            function (user) {

                                return (
                                    user.email ===
                                    email
                                );

                            }
                        );


                    /*
                       Email already exists
                    */

                    if (existingUser) {

                        createMessage(
                            registerEmailInput,
                            "error",
                            "This email is already registered."
                        );

                        registerEmailInput.focus();

                        return;

                    }


                    /*
                       Create new user
                    */

                    const newUser = {

                        id:
                            Date.now(),

                        name:
                            name,

                        email:
                            email,

                        password:
                            password,

                        photo:
                            "assite/Header-images/logo.png"

                    };


                    /*
                       Add user
                    */

                    users.push(
                        newUser
                    );


                    /*
                       Save users
                    */

                    localStorage.setItem(
                        "furniroUsers",
                        JSON.stringify(
                            users
                        )
                    );


                    /*
                       Current user
                       Automatically login
                       after registration
                    */

                    const currentUser = {

                        id:
                            newUser.id,

                        name:
                            newUser.name,

                        email:
                            newUser.email,

                        photo:
                            newUser.photo

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
                       SweetAlert success
                       Above Account Modal
                    */

                    Swal.fire({

                        icon:
                            "success",

                        title:
                            "Account Created!",

                        text:
                            "Welcome to Furniro.",

                        confirmButtonText:
                            "OK",

                        position:
                            "top",

                        customClass: {

                            container:
                                "furniro-swal-container"

                        }

                    });


                    /*
                       Reset form
                    */

                    registerForm.reset();


                    /*
                       Keep modal open
                    */

                    if (accountModal) {

                        accountModal.classList.add(
                            "active"
                        );

                        accountModal.setAttribute(
                            "aria-hidden",
                            "false"
                        );

                    }


                    document.body.style.overflow =
                        "hidden";

                }
            );

        }

    }
);
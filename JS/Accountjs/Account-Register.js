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
           Register
         */

        if (registerForm) {

            registerForm.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


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

                        alert(
                            "Please enter your full name."
                        );

                        return;
                    }


                    /* 
                       Email validation
                     */

                    if (
                        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                            email
                        )
                    ) {

                        alert(
                            "Please enter a valid email."
                        );

                        return;
                    }


                    /* 
                       Password validation
                     */

                    if (password.length < 6) {

                        alert(
                            "Password must be at least 6 characters."
                        );

                        return;
                    }


                    /* 
                       Confirm password
                     */

                    if (
                        password !==
                        confirmPassword
                    ) {

                        alert(
                            "Passwords do not match."
                        );

                        return;
                    }


                    /* 
                       Get users
                     */

                    let users =
                        JSON.parse(
                            localStorage.getItem(
                                "furniroUsers"
                            )
                        ) || [];


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


                    if (existingUser) {

                        alert(
                            "This email is already registered."
                        );

                        return;
                    }


                    /* 
                       Create new user
                     */

                    const newUser = {

                        id: Date.now(),

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
                       Success message
                     */

                    alert(
                        "Account created successfully!"
                    );


                    /* 
                       Reset form
                     */

                    registerForm.reset();

                }
            );

        }

    }
);
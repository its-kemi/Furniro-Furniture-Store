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
                       Get users
                     */

                    const users =
                        JSON.parse(
                            localStorage.getItem(
                                "furniroUsers"
                            )
                        ) || [];


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
                       Check user
                     */

                    if (!user) {

                        alert(
                            "No account found with this email."
                        );

                        return;
                    }


                    /* 
                       Check password
                     */

                    if (
                        user.password !==
                        password
                    ) {

                        alert(
                            "Incorrect password."
                        );

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
                       Success message
                     */

                    alert(
                        "Login successful!"
                    );


                    /* 
                       Reset login form
                     */

                    loginForm.reset();


                    /* 
                       Close Account Modal
                     */

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

    }
);
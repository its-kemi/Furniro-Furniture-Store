/* 
   ACCOUNT USER MENU
 */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const accountOpen =
            document.getElementById(
                "accountOpen"
            );

        const userMenu =
            document.getElementById(
                "userMenu"
            );

        const accountModal =
            document.getElementById(
                "accountModal"
            );

        const userMenuName =
            document.getElementById(
                "userMenuName"
            );

        const userMenuEmail =
            document.getElementById(
                "userMenuEmail"
            );

        const userMenuPhoto =
            document.getElementById(
                "userMenuPhoto"
            );


        /* 
           Get Current User
         */

        function getCurrentUser() {

            return JSON.parse(
                localStorage.getItem(
                    "furniroCurrentUser"
                )
            ) || null;

        }


        /* 
           Update User Menu
         */

        function updateUserMenu() {

            const currentUser =
                getCurrentUser();


            if (!currentUser) {

                if (userMenuName) {
                    userMenuName.textContent =
                        "Guest";
                }

                if (userMenuEmail) {
                    userMenuEmail.textContent =
                        "Please login";
                }

                if (userMenuPhoto) {
                    userMenuPhoto.src =
                        "";
                }

                return;
            }


            if (userMenuName) {
                userMenuName.textContent =
                    currentUser.name;
            }


            if (userMenuEmail) {
                userMenuEmail.textContent =
                    currentUser.email;
            }


            if (userMenuPhoto) {
                userMenuPhoto.src =
                    currentUser.photo ||
                    "";
            }

        }


        /* 
           Account Button
         */

        if (accountOpen) {

            accountOpen.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    const currentUser =
                        getCurrentUser();


                    if (currentUser) {

                        updateUserMenu();


                        if (userMenu) {

                            userMenu.classList.toggle(
                                "active"
                            );

                        }

                        return;
                    }


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


        /* 
           Initial User Menu Update
         */

        updateUserMenu();

    }
);
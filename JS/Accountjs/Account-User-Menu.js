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
           Initials
        */

        const userMenuInitials =
            document.getElementById(
                "userMenuInitials"
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
           Get User Initials
        */

        function getUserInitials(name) {

            if (!name) {
                return "";
            }

            const words =
                name
                    .trim()
                    .split(/\s+/)
                    .filter(Boolean);


            if (words.length >= 2) {

                return (
                    words[0].charAt(0) +
                    words[1].charAt(0)
                ).toUpperCase();

            }


            if (words.length === 1) {

                return words[0]
                    .charAt(0)
                    .toUpperCase();

            }


            return "";

        }


        /* 
           Update User Menu
        */

        function updateUserMenu() {

            const currentUser =
                getCurrentUser();


            /* =========================
               USER NOT LOGGED IN
            ========================= */

            if (!currentUser) {

                if (userMenuName) {

                    userMenuName.textContent =
                        "Guest";

                }


                if (userMenuEmail) {

                    userMenuEmail.textContent =
                        "Please login";

                }


                /*
                   Hide profile photo
                */

                if (userMenuPhoto) {

                    userMenuPhoto.style.display =
                        "none";

                }


                /*
                   Hide initials
                */

                if (userMenuInitials) {

                    userMenuInitials.textContent =
                        "";

                    userMenuInitials.style.display =
                        "none";

                }


                return;

            }


            /* =========================
               USER NAME
            ========================= */

            if (userMenuName) {

                userMenuName.textContent =
                    currentUser.name || "User";

            }


            /* =========================
               USER EMAIL
            ========================= */

            if (userMenuEmail) {

                userMenuEmail.textContent =
                    currentUser.email || "";

            }


            /* =========================
               USER INITIALS
            ========================= */

            const initials =
                getUserInitials(
                    currentUser.name
                );


            /*
               Hide original profile photo
            */

            if (userMenuPhoto) {

                userMenuPhoto.style.display =
                    "none";

            }


            /*
               Show user initials
            */

            if (userMenuInitials) {

                userMenuInitials.textContent =
                    initials;

                userMenuInitials.style.display =
                    "flex";

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


                    /* =========================
                       USER IS LOGGED IN
                    ========================= */

                    if (currentUser) {

                        updateUserMenu();


                        if (userMenu) {

                            userMenu.classList.toggle(
                                "active"
                            );

                        }

                        return;

                    }


                    /* =========================
                       USER IS NOT LOGGED IN
                    ========================= */

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
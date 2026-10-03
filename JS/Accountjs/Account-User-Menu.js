/*
   ACCOUNT USER MENU
*/

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /* =====================================================
           ELEMENTS
        ===================================================== */

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

        const userMenuInitials =
            document.getElementById(
                "userMenuInitials"
            );


        /* =====================================================
           GET CURRENT USER
        ===================================================== */

        function getCurrentUser() {

            return JSON.parse(
                localStorage.getItem(
                    "furniroCurrentUser"
                )
            ) || null;

        }


        /* =====================================================
           GET USER INITIALS
        ===================================================== */

        function getUserInitials(name) {

            if (!name) {
                return "";
            }


            const words =
                name
                    .trim()
                    .split(/\s+/)
                    .filter(Boolean);


            /* Two or more words */

            if (words.length >= 2) {

                return (
                    words[0].charAt(0) +
                    words[1].charAt(0)
                ).toUpperCase();

            }


            /* One word */

            if (words.length === 1) {

                return words[0]
                    .charAt(0)
                    .toUpperCase();

            }


            return "";

        }


        /* =====================================================
           UPDATE USER MENU
        ===================================================== */

        function updateUserMenu() {

            const currentUser =
                getCurrentUser();


            /* =================================================
               USER NOT LOGGED IN
            ================================================= */

            if (!currentUser) {

                if (userMenuName) {

                    userMenuName.textContent =
                        "Guest";

                }


                if (userMenuEmail) {

                    userMenuEmail.textContent =
                        "Please login";

                }


                /* Hide photo */

                if (userMenuPhoto) {

                    userMenuPhoto.removeAttribute(
                        "src"
                    );

                    userMenuPhoto.style.display =
                        "none";

                }


                /* Hide initials */

                if (userMenuInitials) {

                    userMenuInitials.textContent =
                        "";

                    userMenuInitials.style.display =
                        "none";

                }


                return;

            }


            /* =================================================
               USER NAME
            ================================================= */

            if (userMenuName) {

                userMenuName.textContent =
                    currentUser.name || "User";

            }


            /* =================================================
               USER EMAIL
            ================================================= */

            if (userMenuEmail) {

                userMenuEmail.textContent =
                    currentUser.email || "";

            }


            /* =================================================
               GET INITIALS
            ================================================= */

            const initials =
                getUserInitials(
                    currentUser.name
                );


            /* =================================================
               USER HAS A REAL PHOTO
            ================================================= */

            if (currentUser.photo) {

                /*
                   Show real profile photo
                */

                if (userMenuPhoto) {

                    userMenuPhoto.src =
                        currentUser.photo;

                    userMenuPhoto.style.display =
                        "block";

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

            }


            /* =================================================
               USER DOES NOT HAVE A PHOTO
            ================================================= */

            else {

                /*
                   Remove old photo
                */

                if (userMenuPhoto) {

                    userMenuPhoto.removeAttribute(
                        "src"
                    );

                    userMenuPhoto.style.display =
                        "none";

                }


                /*
                   Show initials
                */

                if (userMenuInitials) {

                    userMenuInitials.textContent =
                        initials;

                    userMenuInitials.style.display =
                        "flex";

                }

            }

        }


        /* =====================================================
           ACCOUNT BUTTON
        ===================================================== */

        if (accountOpen) {

            accountOpen.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    const currentUser =
                        getCurrentUser();


                    /* =============================================
                       USER IS LOGGED IN
                    ============================================= */

                    if (currentUser) {

                        /*
                           Refresh user menu
                           every time it opens
                        */

                        updateUserMenu();


                        if (userMenu) {

                            userMenu.classList.toggle(
                                "active"
                            );

                        }


                        return;

                    }


                    /* =============================================
                       USER IS NOT LOGGED IN
                    ============================================= */

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


        /* =====================================================
           INITIAL USER MENU UPDATE
        ===================================================== */

        updateUserMenu();

    }
);
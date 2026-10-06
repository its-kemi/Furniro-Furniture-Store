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
            document.getElementById("accountOpen");

        const userMenu =
            document.getElementById("userMenu");

        const accountModal =
            document.getElementById("accountModal");

        const userMenuName =
            document.getElementById("userMenuName");

        const userMenuEmail =
            document.getElementById("userMenuEmail");

        const userMenuPhoto =
            document.getElementById("userMenuPhoto");

        const userMenuInitials =
            document.getElementById("userMenuInitials");


        /* =====================================================
           GET CURRENT USER
        ===================================================== */

        function getCurrentUser() {

            try {

                return JSON.parse(
                    localStorage.getItem(
                        "furniroCurrentUser"
                    )
                ) || null;

            } catch (error) {

                /*
                   If localStorage data is invalid
                */

                if (typeof Swal !== "undefined") {

                    Swal.fire({
                        icon: "error",
                        title: "Account Error",
                        text: "Your account data could not be loaded.",
                        confirmButtonText: "OK",
                        position: "top",
                        customClass: {
                            container:
                                "furniro-swal-container"
                        }
                    });

                }

                return null;
            }

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


            /*
               Two or more words
            */

            if (words.length >= 2) {

                return (
                    words[0].charAt(0) +
                    words[1].charAt(0)
                ).toUpperCase();

            }


            /*
               One word
            */

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


                /*
                   No default photo
                */

                if (userMenuPhoto) {

                    userMenuPhoto.removeAttribute(
                        "src"
                    );

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
               USER HAS PHOTO
            ================================================= */

            if (
                currentUser.photo &&
                currentUser.photo.trim() !== ""
            ) {

                /*
                   Show user's real photo
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
               USER DOES NOT HAVE PHOTO
            ================================================= */

            else {

                /*
                   Do NOT use a default image
                */

                if (userMenuPhoto) {

                    userMenuPhoto.removeAttribute(
                        "src"
                    );

                    userMenuPhoto.style.display =
                        "none";

                }


                /*
                   Show user's initials
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
                           Update information
                           before opening menu
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
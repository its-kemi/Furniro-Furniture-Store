/* ==================================================
   AUTH GUARD
================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        // ==========================================
        // CHECK LOGIN
        // ==========================================

        function isUserLoggedIn() {

            const currentUser =
                localStorage.getItem(
                    "furniroCurrentUser"
                );

            return (
                currentUser !== null &&
                currentUser !== ""
            );

        }


        // ==========================================
        // ACCOUNT ELEMENTS
        // ==========================================

        const accountModal =
            document.getElementById(
                "accountModal"
            );

        const accountBoxes =
            accountModal
                ? accountModal.querySelectorAll(
                    ".account-box"
                )
                : [];


        const loginForm =
            document.getElementById(
                "modalLoginForm"
            );

        const registerForm =
            document.getElementById(
                "modalRegisterForm"
            );


        // ==========================================
        // ALERT CONTROL
        // ==========================================

        let isAlertOpen = false;


        // ==========================================
        // OPEN ACCOUNT
        // ==========================================

        function openAccount() {

            if (!accountModal) {
                return;
            }

            accountModal.classList.add(
                "active"
            );

            accountModal.setAttribute(
                "aria-hidden",
                "false"
            );

            document.body.style.overflow =
                "hidden";

        }


        // ==========================================
        // SHOW LOGIN FORM
        // ==========================================

        function showLoginForm() {

            openAccount();

            if (
                accountBoxes.length >= 2
            ) {

                accountBoxes[0].style.display =
                    "";

                accountBoxes[1].style.display =
                    "none";

            }

        }


        // ==========================================
        // SHOW REGISTER FORM
        // ==========================================

        function showRegisterForm() {

            openAccount();

            if (
                accountBoxes.length >= 2
            ) {

                accountBoxes[0].style.display =
                    "none";

                accountBoxes[1].style.display =
                    "";

            }

        }


        // ==========================================
        // LOGIN REQUIRED ALERT
        // ==========================================

        function showLoginRequiredAlert() {

            if (isAlertOpen) {
                return;
            }

            isAlertOpen = true;


            Swal.fire({

                icon:
                    "warning",

                title:
                    "Login Required",

                text:
                    "Please login or create an account to continue.",

                showConfirmButton:
                    true,

                showDenyButton:
                    true,

                showCloseButton:
                    true,

                confirmButtonText:
                    "Login",

                denyButtonText:
                    "Register",

                position:
                    "top",

                customClass: {

                    container:
                        "furniro-swal-container"

                }

            }).then(
                function (result) {

                    isAlertOpen = false;


                    // ==================================
                    // LOGIN
                    // ==================================

                    if (
                        result.isConfirmed
                    ) {

                        showLoginForm();

                    }


                    // ==================================
                    // REGISTER
                    // ==================================

                    else if (
                        result.isDenied
                    ) {

                        showRegisterForm();

                    }

                }
            );

        }


        // ==========================================
        // PAGE LINKS
        // ==========================================

        function isPageLink(element) {

            const link =
                element.closest(
                    "a"
                );

            if (!link) {
                return false;
            }


            // Account
            if (
                link.id ===
                "accountOpen"
            ) {

                return true;

            }


            const href =
                link.getAttribute(
                    "href"
                );

            if (!href) {
                return false;
            }


            // Hash
            if (
                href === "#" ||
                href.startsWith("#")
            ) {

                return false;

            }


            // External links
            if (
                href.startsWith(
                    "http://"
                ) ||
                href.startsWith(
                    "https://"
                ) ||
                href.startsWith(
                    "mailto:"
                ) ||
                href.startsWith(
                    "tel:"
                )
            ) {

                return false;

            }


            const pageName =
                href
                    .split("/")
                    .pop()
                    .split("?")[0]
                    .split("#")[0];


            // ======================================
            // PROTECTED PAGES
            // ======================================

            const protectedPages = [

                "Cart.html",

                "Wishlist.html",

                "Checkout.html",

                "Orders.html"

            ];


            if (
                protectedPages.includes(
                    pageName
                )
            ) {

                return false;

            }


            // Other HTML pages are viewable
            return pageName.endsWith(
                ".html"
            );

        }


        // ==========================================
        // ALLOWED UI
        // ==========================================

        function isAllowedUI(element) {

            const allowedSelectors = [

                "#accountOpen",

                "#languageButton",

                ".language-option",

                "#themeButton",

                "#mobileMenuButton",

                "#mobileMenuClose",

                "#searchIcon",

                "#searchButton",

                "#searchInput"

            ];


            for (
                let i = 0;
                i < allowedSelectors.length;
                i++
            ) {

                if (
                    element.closest(
                        allowedSelectors[i]
                    )
                ) {

                    return true;

                }

            }


            return false;

        }


        // ==========================================
        // CLICK
        // ==========================================

        document.addEventListener(
            "click",
            function (event) {

                // If logged in
                // allow everything

                if (
                    isUserLoggedIn()
                ) {

                    return;

                }


                const element =
                    event.target;


                // ==================================
                // SWEETALERT
                // NEVER BLOCK SWEETALERT
                // ==================================

                if (
                    element.closest(
                        ".swal2-container"
                    )
                ) {

                    return;

                }


                // ==================================
                // ACCOUNT
                // ==================================

                if (
                    element.closest(
                        "#accountOpen"
                    )
                ) {

                    return;

                }


                // ==================================
                // ACCOUNT MODAL
                // ==================================

                if (
                    element.closest(
                        "#accountModal"
                    )
                ) {

                    return;

                }


                // ==================================
                // NORMAL PAGE LINK
                // ==================================

                if (
                    isPageLink(
                        element
                    )
                ) {

                    return;

                }


                // ==================================
                // ALLOWED UI
                // ==================================

                if (
                    isAllowedUI(
                        element
                    )
                ) {

                    return;

                }


                // ==================================
                // BLOCK
                // ==================================

                event.preventDefault();

                event.stopPropagation();

                showLoginRequiredAlert();

            },
            true
        );


        // ==========================================
        // FORM SUBMIT
        // ==========================================

        document.addEventListener(
            "submit",
            function (event) {

                // Logged in
                if (
                    isUserLoggedIn()
                ) {

                    return;

                }


                const form =
                    event.target;


                // Login allowed
                if (
                    form ===
                    loginForm
                ) {

                    return;

                }


                // Register allowed
                if (
                    form ===
                    registerForm
                ) {

                    return;

                }


                // Block other forms
                event.preventDefault();

                event.stopPropagation();

                showLoginRequiredAlert();

            },
            true
        );


        // ==========================================
        // CHANGE
        // ==========================================

        document.addEventListener(
            "change",
            function (event) {

                if (
                    isUserLoggedIn()
                ) {

                    return;

                }


                const element =
                    event.target;


                // Language
                if (
                    element.closest(
                        ".language-option"
                    )
                ) {

                    return;

                }

                   // ==================================
// ACCOUNT
// ==================================

if (
    element.closest(
        "#accountOpen"
    )
) {

    // Restore both account forms
    // when Account icon is opened

    if (
        accountBoxes.length >= 2
    ) {

        accountBoxes[0].style.display =
            "";

        accountBoxes[1].style.display =
            "";

    }

    return;

}

                event.preventDefault();

                event.stopPropagation();

                showLoginRequiredAlert();

            },
            true
        );

    }
);
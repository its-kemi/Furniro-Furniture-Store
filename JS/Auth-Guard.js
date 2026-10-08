/* ==================================================
   FURNIRO AUTH GUARD
================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /* ==================================================
           CHECK LOGIN
        ================================================== */

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


        /* ==================================================
           ACCOUNT ELEMENTS
        ================================================== */

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


        /* ==================================================
           ALERT CONTROL
        ================================================== */

        let isAlertOpen = false;


        /* ==================================================
           OPEN ACCOUNT
        ================================================== */

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


        /* ==================================================
           SHOW LOGIN FORM
        ================================================== */

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


        /* ==================================================
           SHOW REGISTER FORM
        ================================================== */

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


        /* ==================================================
           LOGIN REQUIRED ALERT
        ================================================== */

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


                    /* ======================================
                       LOGIN
                    ====================================== */

                    if (
                        result.isConfirmed
                    ) {

                        showLoginForm();
                    }


                    /* ======================================
                       REGISTER
                    ====================================== */

                    else if (
                        result.isDenied
                    ) {

                        showRegisterForm();
                    }

                }
            );
        }


        /* ==================================================
           PROTECTED PAGES
           
           These pages require Login.
        ================================================== */

        const protectedPages = [

            "Cart.html",

            "Wishlist.html",

            "Checkout.html",

            "Orders.html",

            "AccountSettings.html"

        ];


        /* ==================================================
           CHECK PROTECTED PAGE
        ================================================== */

        function isProtectedPage(element) {

            const link =
                element.closest("a");

            if (!link) {
                return false;
            }


            const href =
                link.getAttribute("href");


            if (!href) {
                return false;
            }


            const pageName =
                href
                    .split("/")
                    .pop()
                    .split("?")[0]
                    .split("#")[0];


            return protectedPages.includes(
                pageName
            );
        }


        /* ==================================================
           PROTECTED ACTIONS
           
           Only these actions require Login.
        ================================================== */

        function isProtectedAction(element) {

            const protectedSelectors = [

                /* Add to Cart */
                "#addToCart",
                ".add-to-cart",
                ".add-cart",
                ".add-cart-btn",
                ".add-to-cart-btn",

                /* Wishlist */
                "#addToWishlist",
                ".add-to-wishlist",
                ".wishlist-btn",
                ".wishlist-button",

                /* Cart */
                "#cartButton",
                ".cart-button",
                ".cart-link",

                /* Wishlist page/link */
                "#wishlistButton",
                ".wishlist-link",

                /* Checkout */
                "#checkoutButton",
                ".checkout-button",
                ".checkout-link",

                /* Orders */
                "#ordersButton",
                ".orders-button",
                ".orders-link",

                /* Account Settings */
                "#accountSettings",
                ".account-settings",

                /* Generic protection */
                "[data-requires-login]"

            ];


            for (
                let i = 0;
                i < protectedSelectors.length;
                i++
            ) {

                if (
                    element.closest(
                        protectedSelectors[i]
                    )
                ) {

                    return true;
                }
            }


            return false;
        }


        /* ==================================================
           PUBLIC UI
           
           These areas are always available for guests.
        ================================================== */

        function isPublicUI(element) {

            const publicSelectors = [

                /* Account */
                "#accountOpen",

                "#accountModal",

                /* Search */
                "#searchIcon",
                "#searchButton",
                "#searchInput",
                "#searchForm",
                ".search-form",

                /* Language */
                "#languageButton",
                ".language-option",

                /* Theme */
                "#themeButton",
                ".theme-button",

                /* Mobile menu */
                "#mobileMenuButton",
                "#mobileMenuClose",

                /* Sidebar */
                "#sidebar-toggle",
                "#sidebar-close",
                "#sidebar-overlay",
                "#app-sidebar",
                ".sidebar",
                ".sidebar-toggle",
                ".sidebar-close",

                /* Product */
                ".product-card",
                ".product-item",
                ".product-image",
                ".product-gallery",
                ".gallery",
                ".gallery-image",

                /* Product modal */
                ".product-modal",
                ".product-details",

                /* General public content */
                ".public-content"

            ];


            for (
                let i = 0;
                i < publicSelectors.length;
                i++
            ) {

                if (
                    element.closest(
                        publicSelectors[i]
                    )
                ) {

                    return true;
                }
            }


            return false;
        }


        /* ==================================================
           PUBLIC PAGE LINK
           
           Normal website pages are available to guests.
        ================================================== */

        function isPublicPageLink(element) {

            const link =
                element.closest("a");

            if (!link) {
                return false;
            }


            /* Account icon */
            if (
                link.id ===
                "accountOpen"
            ) {

                return true;
            }


            const href =
                link.getAttribute("href");


            if (!href) {
                return false;
            }


            /* Hash links */
            if (
                href === "#" ||
                href.startsWith("#")
            ) {

                return true;
            }


            /* External links */
            if (
                href.startsWith("http://") ||
                href.startsWith("https://") ||
                href.startsWith("mailto:") ||
                href.startsWith("tel:")
            ) {

                return true;
            }


            /* Get page name */
            const pageName =
                href
                    .split("/")
                    .pop()
                    .split("?")[0]
                    .split("#")[0];


            /* Protected pages */
            if (
                protectedPages.includes(
                    pageName
                )
            ) {

                return false;
            }


            /* All other HTML pages are public */
            if (
                pageName.endsWith(".html")
            ) {

                return true;
            }


            return true;
        }


        /* ==================================================
           CLICK CONTROL
        ================================================== */

        document.addEventListener(
            "click",
            function (event) {


                /* ==========================================
                   LOGGED-IN USER
                   
                   Logged-in users can use everything.
                ========================================== */

                if (
                    isUserLoggedIn()
                ) {

                    return;
                }


                const element =
                    event.target;


                /* ==========================================
                   SWEETALERT
                   
                   Never block SweetAlert buttons.
                ========================================== */

                if (
                    element.closest(
                        ".swal2-container"
                    )
                ) {

                    return;
                }


                /* ==========================================
                   ACCOUNT
                   
                   Login/Register must remain available.
                ========================================== */

                if (
                    element.closest(
                        "#accountOpen"
                    )
                ) {

                    return;
                }


                /* ==========================================
                   ACCOUNT MODAL
                   
                   Everything inside Login/Register modal
                   is allowed.
                ========================================== */

                if (
                    element.closest(
                        "#accountModal"
                    )
                ) {

                    return;
                }


                /* ==========================================
                   PROTECTED PAGE
                   
                   Example:
                   Cart.html
                   Wishlist.html
                   Orders.html
                   Checkout.html
                ========================================== */

                if (
                    isProtectedPage(
                        element
                    )
                ) {

                    event.preventDefault();

                    event.stopPropagation();

                    showLoginRequiredAlert();

                    return;
                }


                /* ==========================================
                   PROTECTED ACTION
                   
                   Example:
                   Add to Cart
                   Wishlist
                   Checkout
                ========================================== */

                if (
                    isProtectedAction(
                        element
                    )
                ) {

                    event.preventDefault();

                    event.stopPropagation();

                    showLoginRequiredAlert();

                    return;
                }


                /* ==========================================
                   PUBLIC UI
                   
                   Search, Sidebar, Gallery, etc.
                ========================================== */

                if (
                    isPublicUI(
                        element
                    )
                ) {

                    return;
                }


                /* ==========================================
                   NORMAL PUBLIC PAGE
                ========================================== */

                if (
                    isPublicPageLink(
                        element
                    )
                ) {

                    return;
                }


                /* ==========================================
                   EVERYTHING ELSE
                   
                   IMPORTANT:
                   Do NOT block normal clicks anymore.
                   
                   Guest users can:
                   - See products
                   - See images
                   - Open galleries
                   - Open product details
                   - Use search
                   - Open Sidebar
                   - Use language
                   - Use dark mode
                ========================================== */

                return;

            },
            true
        );


        /* ==================================================
           FORM SUBMIT
           
           Only forms that specifically require Login
           should be blocked.
        ================================================== */

        document.addEventListener(
            "submit",
            function (event) {


                /* ==========================================
                   LOGGED-IN USER
                ========================================== */

                if (
                    isUserLoggedIn()
                ) {

                    return;
                }


                const form =
                    event.target;


                /* ==========================================
                   LOGIN FORM
                ========================================== */

                if (
                    form ===
                    loginForm
                ) {

                    return;
                }


                /* ==========================================
                   REGISTER FORM
                ========================================== */

                if (
                    form ===
                    registerForm
                ) {

                    return;
                }


                /* ==========================================
                   SEARCH FORM
                   
                   Search is public.
                ========================================== */

                if (
                    form.id ===
                    "searchForm"
                ) {

                    return;
                }


                if (
                    form.closest(
                        ".search-form"
                    )
                ) {

                    return;
                }


                /* ==========================================
                   FORM REQUIRES LOGIN
                ========================================== */

                if (
                    form.matches(
                        "[data-requires-login]"
                    ) ||
                    form.closest(
                        "[data-requires-login]"
                    )
                ) {

                    event.preventDefault();

                    event.stopPropagation();

                    showLoginRequiredAlert();

                    return;
                }


                /* ==========================================
                   OTHER FORMS
                   
                   Do NOT block them automatically.
                ========================================== */

                return;

            },
            true
        );


        /* ==================================================
           CHANGE CONTROL
           
           Do NOT block every change event.
           
           Search filters, language, theme and other
           public controls must work for guests.
        ================================================== */

        document.addEventListener(
            "change",
            function (event) {


                /* ==========================================
                   LOGGED-IN USER
                ========================================== */

                if (
                    isUserLoggedIn()
                ) {

                    return;
                }


                const element =
                    event.target;


                /* ==========================================
                   PROTECTED CONTROL
                ========================================== */

                if (
                    element.closest(
                        "[data-requires-login]"
                    )
                ) {

                    event.preventDefault();

                    event.stopPropagation();

                    showLoginRequiredAlert();

                    return;
                }


                /* ==========================================
                   ALL OTHER CHANGE EVENTS
                   
                   Public:
                   - Search filters
                   - Language
                   - Theme
                   - Gallery
                   - Other UI
                ========================================== */

                return;

            },
            true
        );


        /* ==================================================
           INPUT CONTROL
           
           IMPORTANT:
           Guest users must be able to type in Search.
           
           Therefore we do NOT block input events.
        ================================================== */

        document.addEventListener(
            "input",
            function (event) {

                /*
                    Search input and other public inputs
                    are completely available to guests.
                */

                return;

            },
            true
        );


        /* ==================================================
           KEYDOWN CONTROL
           
           Do not block keyboard interaction for guests.
        ================================================== */

        document.addEventListener(
            "keydown",
            function (event) {

                /*
                    Search
                    Gallery
                    Sidebar
                    Public UI
                    are available.
                */

                return;

            },
            true
        );

    }
);
/* =========================================================
   FURNIRO AUTH GUARD
   Protects login-required pages and actions
========================================================= */


/* =========================================================
   CHECK LOGIN STATUS
========================================================= */

function isUserLoggedIn() {

    return !!localStorage.getItem("furniroCurrentUser");

}


/* =========================================================
   SHOW LOGIN FORM
========================================================= */

function showLoginForm() {

    const loginForm =
        document.querySelector("#modalLoginForm");

    const registerForm =
        document.querySelector("#modalRegisterForm");

    if (loginForm) {
        loginForm.style.display = "block";
    }

    if (registerForm) {
        registerForm.style.display = "none";
    }

}


/* =========================================================
   SHOW REGISTER FORM
========================================================= */

function showRegisterForm() {

    const loginForm =
        document.querySelector("#modalLoginForm");

    const registerForm =
        document.querySelector("#modalRegisterForm");

    if (loginForm) {
        loginForm.style.display = "none";
    }

    if (registerForm) {
        registerForm.style.display = "block";
    }

}


/* =========================================================
   OPEN ACCOUNT MODAL
========================================================= */

function openAccountModal() {

    const accountModal =
        document.querySelector("#accountModal");

    if (accountModal) {

        accountModal.style.display = "flex";

    }

}


/* =========================================================
   LOGIN REQUIRED ALERT
========================================================= */

function showLoginRequiredAlert() {

    Swal.fire({

        icon: "warning",

        title: "Login Required",

        text:
            "Please login or create an account to continue.",

        showCancelButton: true,

        showDenyButton: true,

        confirmButtonText: "Login",

        denyButtonText: "Register",

        cancelButtonText: "Close",

        position: "top",

        customClass: {

            container: "furniro-swal-container"

        }

    }).then(function (result) {

        if (result.isConfirmed) {

            openAccountModal();

            showLoginForm();

        }

        else if (result.isDenied) {

            openAccountModal();

            showRegisterForm();

        }

    });

}


/* =========================================================
   PROTECTED PAGES
========================================================= */

const protectedPages = [

    "Checkout.html",

    "Orders.html",

    "AccountSettings.html"

];


/* =========================================================
   GET CURRENT PAGE
========================================================= */

function getCurrentPage() {

    let page =
        window.location.pathname
            .split("/")
            .pop();

    if (!page) {

        page = "index.html";

    }

    return page;

}


/* =========================================================
   CHECK PROTECTED PAGE
========================================================= */

function isProtectedPage() {

    const currentPage =
        getCurrentPage();

    return protectedPages.some(function (page) {

        return page.toLowerCase() ===
            currentPage.toLowerCase();

    });

}


/* =========================================================
   PROTECTED ACTIONS
========================================================= */

function isProtectedAction(element) {

    if (!element) {

        return false;

    }


    /*
       ADD TO CART
    */

    const cartAction =
        element.closest(
            [
                "#addToCart",

                ".add-to-cart",

                ".add-cart",

                ".add-cart-btn",

                ".add-to-cart-btn",

                "#cartAction",

                ".cart-action",

                ".cart-remove",

                ".remove-from-cart",

                ".cart-update",

                ".update-cart"

            ].join(",")
        );


    if (cartAction) {

        return true;

    }


    /*
       WISHLIST
    */

    const wishlistAction =
        element.closest(
            [
                "#addToWishlist",

                "#wishlistButton",

                ".add-to-wishlist",

                ".wishlist-btn",

                ".wishlist-button",

                ".wishlist-icon",

                ".wishlist-link",

                ".wishlist-add",

                ".add-wishlist",

                ".product-wishlist",

                ".product-wishlist-btn",

                ".like-product",

                ".wishlist-action",

                ".remove-from-wishlist",

                ".wishlist-remove",

                ".wishlist-action-button",

                "[data-wishlist]",

                "[data-action='wishlist']",

                "[data-action='add-wishlist']",

                "[aria-label='Wishlist']",

                "[aria-label='Add to wishlist']",

                "[title='Wishlist']",

                "[title='Add to wishlist']"

            ].join(",")
        );


    if (wishlistAction) {

        return true;

    }


    /*
       COMPARE
    */

    const compareAction =
        element.closest(
            [
                "#compareButton",

                "#addToCompare",

                ".compare-product",

                ".compare-btn",

                ".compare-button",

                ".add-to-compare",

                ".compare-product",

                ".product-compare",

                "[data-compare]",

                "[data-action='compare']",

                "[aria-label='Compare']",

                "[title='Compare']"

            ].join(",")
        );


    if (compareAction) {

        return true;

    }


    /*
       CHECKOUT
    */

    const checkoutAction =
        element.closest(
            [
                "#checkoutButton",

                ".checkout-button",

                ".checkout-link"

            ].join(",")
        );


    if (checkoutAction) {

        return true;

    }


    /*
       ORDERS
    */

    const ordersAction =
        element.closest(
            [
                "#ordersButton",

                ".orders-button",

                ".orders-link"

            ].join(",")
        );


    if (ordersAction) {

        return true;

    }


    /*
       ACCOUNT SETTINGS
    */

    const accountSettings =
        element.closest(
            [
                "#accountSettings",

                ".account-settings",

                "[data-requires-login]"

            ].join(",")
        );


    if (accountSettings) {

        return true;

    }


    /*
       FONT AWESOME HEART
       Extra protection for heart icons
    */

    const heartIcon =
        element.closest(
            [
                ".fa-heart",

                ".fa-regular.fa-heart",

                ".fa-solid.fa-heart"

            ].join(",")
        );


    if (heartIcon) {

        return true;

    }


    return false;

}


/* =========================================================
   PUBLIC UI ELEMENTS
========================================================= */

function isPublicUI(element) {

    if (!element) {

        return false;

    }


    return !!element.closest(

        [

            /*
               ACCOUNT
            */

            "#accountOpen",

            "#accountModal",


            /*
               SEARCH
            */

            "#searchOpen",

            ".search-icon",

            ".search-button",

            ".search-toggle",

            ".search-input",

            ".search-form",

            "#searchInput",


            /*
               LANGUAGE
            */

            ".language-selector",

            ".language-menu",

            ".language-option",

            "[data-language]",


            /*
               DARK MODE
            */

            "#darkModeToggle",

            ".dark-mode-toggle",

            ".theme-toggle",

            "#themeToggle",


            /*
               MOBILE MENU
            */

            ".menu-toggle",

            ".mobile-menu-toggle",

            ".hamburger",

            "#mobileMenu",


            /*
               PRODUCT DISPLAY
               These are public only when the click
               is NOT on a protected action.
            */

            ".product-card",

            ".product-item",

            ".product-image",

            ".product-gallery",

            ".gallery",

            ".gallery-image",

            ".product-modal",

            ".product-details",

            ".public-content"

        ].join(",")

    );

}


/* =========================================================
   PUBLIC PAGE LINKS
========================================================= */

function isPublicPageLink(element) {

    if (!element) {

        return false;

    }


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


    const publicPages = [

        "index.html",

        "Shop.html",

        "About.html",

        "Contact.html",

        "Search.html",

        "Wishlist.html",

        "Cart.html",

        "Single-Product.html",

        "Product-Comparison.html",

        "Returns.html"

    ];


    const cleanHref =
        href
            .split("?")[0]
            .split("#")[0]
            .split("/")
            .pop();


    return publicPages.some(function (page) {

        return page.toLowerCase() ===
            cleanHref.toLowerCase();

    });

}


/* =========================================================
   ACCOUNT MODAL
========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const accountButton =
            event.target.closest("#accountOpen");


        if (accountButton) {

            /*
               Account button itself is public.
               It should open the account modal.
            */

            return;

        }

    },
    true
);


/* =========================================================
   GLOBAL AUTH GUARD
========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const element =
            event.target;


        /*
           -------------------------------------------------
           ALREADY LOGGED IN
           -------------------------------------------------
        */

        if (isUserLoggedIn()) {

            return;

        }


        /*
           -------------------------------------------------
           SWEETALERT ITSELF
           -------------------------------------------------
        */

        if (
            element.closest(".swal2-container") ||
            element.closest(".swal2-popup")
        ) {

            return;

        }


        /*
           -------------------------------------------------
           ACCOUNT BUTTON
           -------------------------------------------------
        */

        if (
            element.closest("#accountOpen") ||
            element.closest("#accountModal")
        ) {

            return;

        }


        /*
           -------------------------------------------------
           PROTECTED PAGE
           -------------------------------------------------
        */

        if (isProtectedPage()) {

            event.preventDefault();

            event.stopPropagation();

            showLoginRequiredAlert();

            return;

        }


        /*
           -------------------------------------------------
           PROTECTED ACTION
           -------------------------------------------------
        */

        if (isProtectedAction(element)) {

            event.preventDefault();

            event.stopPropagation();

            event.stopImmediatePropagation();

            showLoginRequiredAlert();

            return;

        }


        /*
           -------------------------------------------------
           PUBLIC UI
           -------------------------------------------------
        */

        if (isPublicUI(element)) {

            return;

        }


        /*
           -------------------------------------------------
           PUBLIC PAGE LINK
           -------------------------------------------------
        */

        if (isPublicPageLink(element)) {

            return;

        }


        /*
           -------------------------------------------------
           EVERYTHING ELSE
           -------------------------------------------------
        */

        return;

    },
    true
);


/* =========================================================
   PROTECTED PAGE CHECK ON LOAD
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        if (
            isProtectedPage() &&
            !isUserLoggedIn()
        ) {

            showLoginRequiredAlert();

        }

    }
);


/* =========================================================
   UPDATE ACCOUNT UI
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const currentUser =
            localStorage.getItem(
                "furniroCurrentUser"
            );


        if (!currentUser) {

            return;

        }


        let user = null;


        try {

            user =
                JSON.parse(currentUser);

        }

        catch (error) {

            console.error(
                "Invalid current user data.",
                error
            );

            return;

        }


        if (!user) {

            return;

        }


        /*
           Account avatar / initials
        */

        const accountButtons =
            document.querySelectorAll(
                "#accountOpen"
            );


        accountButtons.forEach(
            function (button) {

                const icon =
                    button.querySelector(
                        "i"
                    );


                /*
                   Get user's name
                */

                const fullName =
                    user.name ||
                    user.fullName ||
                    user.username ||
                    user.email ||
                    "";


                if (!fullName) {

                    return;

                }


                const nameParts =
                    fullName
                        .trim()
                        .split(/\s+/);


                let initials = "";


                if (nameParts.length >= 2) {

                    initials =
                        nameParts[0]
                            .charAt(0)
                            .toUpperCase() +

                        nameParts[nameParts.length - 1]
                            .charAt(0)
                            .toUpperCase();

                }

                else {

                    initials =
                        nameParts[0]
                            .substring(0, 2)
                            .toUpperCase();

                }


                /*
                   Keep original icon hidden
                   and show initials.
                */

                if (icon) {

                    icon.style.display =
                        "none";

                }


                let avatar =
                    button.querySelector(
                        ".account-initials"
                    );


                if (!avatar) {

                    avatar =
                        document.createElement(
                            "span"
                        );

                    avatar.className =
                        "account-initials";


                    button.appendChild(
                        avatar
                    );

                }


                avatar.textContent =
                    initials;

            }
        );

    }
);
/* =========================================================
   FURNIRO AUTH GUARD
   Protect account pages and selected actions
========================================================= */

(function () {
    "use strict";

    /* =====================================================
       CHECK CURRENT USER
    ===================================================== */

    function getCurrentUser() {
        try {
            const storedUser = localStorage.getItem(
                "furniroCurrentUser"
            );

            if (!storedUser) {
                return null;
            }

            const user = JSON.parse(storedUser);

            if (
                !user ||
                typeof user !== "object" ||
                !user.email
            ) {
                return null;
            }

            return user;
        } catch (error) {
            console.error(
                "Error reading current user:",
                error
            );

            return null;
        }
    }

    function isUserLoggedIn() {
        return getCurrentUser() !== null;
    }

    /* =====================================================
       LOGIN REQUIRED ALERT
       OK BUTTON ONLY
    ===================================================== */

    let alertIsOpen = false;

    function showLoginRequiredAlert() {
        if (alertIsOpen) {
            return;
        }

        if (typeof window.Swal !== "undefined") {
            alertIsOpen = true;

            window.Swal.fire({
                icon: "warning",
                title: "Login Required",
                text: "Please log in or create an account to continue.",
                confirmButtonText: "OK",
                confirmButtonColor: "#29251f",
                showCancelButton: false,
                showDenyButton: false,
                allowOutsideClick: true,
                allowEscapeKey: true
            })
                .then(function () {
                    alertIsOpen = false;
                })
                .catch(function () {
                    alertIsOpen = false;
                });

            return;
        }

        window.alert(
            "Please log in or create an account to continue."
        );
    }

    /* =====================================================
       ACCOUNT MODAL HELPERS
    ===================================================== */

    function showLoginForm() {
        const loginButton =
            document.getElementById("showLogin");

        const loginForm =
            document.getElementById("loginForm");

        const registerForm =
            document.getElementById("registerForm");

        if (loginForm) {
            loginForm.style.display = "block";
        }

        if (registerForm) {
            registerForm.style.display = "none";
        }

        if (loginButton) {
            loginButton.classList.add("active");
        }
    }

    function showRegisterForm() {
        const loginForm =
            document.getElementById("loginForm");

        const registerForm =
            document.getElementById("registerForm");

        if (loginForm) {
            loginForm.style.display = "none";
        }

        if (registerForm) {
            registerForm.style.display = "block";
        }
    }

    function openAccountModal() {
        const accountModal =
            document.getElementById("accountModal");

        if (accountModal) {
            accountModal.classList.add("active");
            accountModal.style.display = "flex";
        }
    }

    /* =====================================================
       EXPOSE FUNCTIONS FOR OTHER SCRIPTS
    ===================================================== */

    window.getCurrentUser = getCurrentUser;
    window.isUserLoggedIn = isUserLoggedIn;
    window.showLoginRequiredAlert =
        showLoginRequiredAlert;

    window.showLoginForm = showLoginForm;
    window.showRegisterForm = showRegisterForm;
    window.openAccountModal = openAccountModal;

    /* =====================================================
       PROTECTED PAGES
    ===================================================== */

    const protectedPages = [
        "Checkout.html",
        "Orders.html",
        "AccountSettings.html"
    ];

    function isProtectedPage() {
        const currentPage = window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();

        return protectedPages.some(function (page) {
            return currentPage === page.toLowerCase();
        });
    }

    /* =====================================================
       PROTECTED ACTIONS
       Does not include sidebar elements
    ===================================================== */


function isProtectedAction(element) {
    if (!(element instanceof Element)) {
        return false;
    }

    return Boolean(
        element.closest([
            /* Add to Cart */
            "#addToCart",
            "#addToCartBtn",
            "#add-cart",
            ".add-to-cart",
            ".addToCart",
            ".add-cart",
            ".add-to-cart-btn",
            "[data-action='add-to-cart']",

            /* Checkout */
            "#checkoutButton",
            "#proceedToCheckout",
            "#placeOrder",

            /* Wishlist */
            ".wishlist-button",
            ".add-to-wishlist",
            ".heart-icon",
            ".fa-heart",

            /* Compare */
            ".compare-button",
            ".add-to-compare",

            /* Other protected actions */
            "[data-protected='true']"
        ].join(","))
    );
}

    /* =====================================================
       PUBLIC UI
    ===================================================== */

    function isPublicUI(element) {
        if (!(element instanceof Element)) {
            return false;
        }

        return Boolean(
            element.closest([
                "#accountModal",
                "#loginForm",
                "#registerForm",
                ".swal2-container",
                ".swal2-popup"
            ].join(","))
        );
    }

    /* =====================================================
       PUBLIC LINKS
    ===================================================== */

    function isPublicPageLink(element) {
        if (!(element instanceof Element)) {
            return false;
        }

        const link = element.closest("a");

        if (!link) {
            return false;
        }

        const href = (
            link.getAttribute("href") || ""
        ).trim().toLowerCase();

        return (
            href === "" ||
            href.startsWith("#") ||
            href.startsWith("javascript:") ||
            href.startsWith("mailto:") ||
            href.startsWith("tel:") ||
            href.includes("account.html") ||
            href.includes("login") ||
            href.includes("register")
        );
    }

    /* =====================================================
       LOCK ONLY THE HOME HEADER SIDEBAR ICON

       Guest user:
       - Sidebar icon does not open the sidebar.
       - Login Required alert is displayed.
       - Sidebar is not closed or modified.

       Logged-in user:
       - Original sidebar behavior remains unchanged.
    ===================================================== */

    document.addEventListener(
        "click",
        function (event) {
            if (isUserLoggedIn()) {
                return;
            }

            const target = event.target;

            if (!(target instanceof Element)) {
                return;
            }

            const sidebarToggle =
                target.closest("#sidebarToggle");

            if (!sidebarToggle) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();

            showLoginRequiredAlert();
        },
        true
    );

    /* =====================================================
       HANDLE OTHER PROTECTED ACTIONS

       Does not block or close sidebar content.
    ===================================================== */

    document.addEventListener(
        "click",
        function (event) {
            if (isUserLoggedIn()) {
                return;
            }

            const target = event.target;

            if (!(target instanceof Element)) {
                return;
            }

            if (
                isPublicUI(target) ||
                isPublicPageLink(target)
            ) {
                return;
            }

            if (!isProtectedAction(target)) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();

            showLoginRequiredAlert();
        },
        true
    );

    /* =====================================================
       PROTECT DIRECT NAVIGATION TO ACCOUNT PAGES
    ===================================================== */

    document.addEventListener(
        "DOMContentLoaded",
        function () {
            if (!isUserLoggedIn()) {
                if (isProtectedPage()) {
                    document.body.innerHTML = `
                        <main style="
                            min-height: 100vh;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            padding: 24px;
                            text-align: center;
                            font-family: Arial, sans-serif;
                            background: #f8f7f4;
                            color: #29251f;
                        ">
                            <section>
                                <h2>Login Required</h2>
                                <p>
                                    Please log in or create an
                                    account to access this page.
                                </p>
                            </section>
                        </main>
                    `;
                }

                return;
            }

            updateAccountAvatar();
        }
    );

    /* =====================================================
       UPDATE ACCOUNT AVATAR
    ===================================================== */

    function updateAccountAvatar() {
        const user = getCurrentUser();

        if (!user) {
            return;
        }

        const accountButtons =
            document.querySelectorAll(
                "#accountOpen, #sidebarToggle, " +
                ".account-icon, [data-account-avatar]"
            );

        const initials = getUserInitials(
            user.name ||
            user.fullName ||
            user.email
        );

        accountButtons.forEach(function (button) {
            const avatar = button.querySelector(
                "img, .user-avatar, .account-initials"
            );

            if (!avatar) {
                return;
            }

            if (avatar.tagName === "IMG") {
                if (user.photo) {
                    avatar.src = user.photo;
                    avatar.alt = user.name || "User";
                }
            } else {
                avatar.textContent = initials;
            }
        });
    }

    /* =====================================================
       GET USER INITIALS
    ===================================================== */

    function getUserInitials(name) {
        if (!name || typeof name !== "string") {
            return "U";
        }

        const parts = name
            .trim()
            .split(/\s+/)
            .filter(Boolean);

        if (parts.length === 0) {
            return "U";
        }

        if (parts.length === 1) {
            return parts[0]
                .substring(0, 2)
                .toUpperCase();
        }

        return (
            parts[0].charAt(0) +
            parts[parts.length - 1].charAt(0)
        ).toUpperCase();
    }
})();
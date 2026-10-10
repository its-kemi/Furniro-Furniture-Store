
/* =====================================================
   FURNIRO ACCOUNT DASHBOARD
   Independent Sidebar JavaScript
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    "use strict";

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const sidebar =
        document.getElementById("accountSidebar");

    const sidebarToggle =
        document.getElementById("sidebarToggle");

    const sidebarOverlay =
        document.getElementById("sidebarOverlay");

    const sidebarLogout =
        document.getElementById("sidebarLogout");

    const sidebarProfile =
        document.getElementById("sidebarProfile");

    const sidebarUserName =
        document.getElementById("sidebarUserName");

    const sidebarUserEmail =
        document.getElementById("sidebarUserEmail");

    const sidebarUserPhoto =
        document.getElementById("sidebarUserPhoto");

    const sidebarUserInitials =
        document.getElementById("sidebarUserInitials");

    const dashboardUserName =
        document.getElementById("dashboardUserName");

    const dashboardFullName =
        document.getElementById("dashboardFullName");

    const dashboardEmail =
        document.getElementById("dashboardEmail");


    /* =====================================================
       GET CURRENT USER
    ===================================================== */

    function getCurrentUser() {

        try {

            const storedUser =
                localStorage.getItem("furniroCurrentUser");

            if (!storedUser) {
                return null;
            }

            const user = JSON.parse(storedUser);

            if (
                !user ||
                typeof user !== "object" ||
                Array.isArray(user)
            ) {
                return null;
            }

            return user;

        } catch (error) {

            console.error(
                "Unable to read current user:",
                error
            );

            return null;
        }
    }


    /* =====================================================
       GET USER INITIALS
    ===================================================== */

    function getUserInitials(name) {

        if (typeof name !== "string" || !name.trim()) {
            return "U";
        }

        const words = name
            .trim()
            .split(/\s+/)
            .filter(Boolean);

        if (words.length >= 2) {

            return (
                words[0].charAt(0) +
                words[1].charAt(0)
            ).toUpperCase();

        }

        return words[0].charAt(0).toUpperCase();
    }


    /* =====================================================
       DISPLAY USER INFORMATION
    ===================================================== */

    function updateDashboard() {

        const currentUser = getCurrentUser();

        if (!currentUser) {

            window.location.replace("Account.html");

            return;
        }

        const name =
            typeof currentUser.name === "string" &&
            currentUser.name.trim()
                ? currentUser.name.trim()
                : "User";

        const email =
            typeof currentUser.email === "string"
                ? currentUser.email
                : "";

        const initials = getUserInitials(name);

        const photo =
            typeof currentUser.photo === "string"
                ? currentUser.photo.trim()
                : "";


        if (sidebarUserName) {
            sidebarUserName.textContent = name;
        }

        if (sidebarUserEmail) {
            sidebarUserEmail.textContent = email;
        }

        if (dashboardUserName) {
            dashboardUserName.textContent =
                name.split(/\s+/)[0];
        }

        if (dashboardFullName) {
            dashboardFullName.textContent = name;
        }

        if (dashboardEmail) {
            dashboardEmail.textContent =
                email || "Not provided";
        }

        if (sidebarUserInitials) {
            sidebarUserInitials.textContent = initials;
        }


        /* Profile photo */

        if (sidebarUserPhoto) {

            sidebarUserPhoto.onerror = function () {

                sidebarUserPhoto.removeAttribute("src");

                if (sidebarUserPhoto.parentElement) {
                    sidebarUserPhoto.parentElement
                        .classList.remove("has-photo");
                }

            };

            sidebarUserPhoto.onload = function () {

                if (sidebarUserPhoto.parentElement) {
                    sidebarUserPhoto.parentElement
                        .classList.add("has-photo");
                }

            };

            if (photo) {
                sidebarUserPhoto.src = photo;
            } else {
                sidebarUserPhoto.removeAttribute("src");

                if (sidebarUserPhoto.parentElement) {
                    sidebarUserPhoto.parentElement
                        .classList.remove("has-photo");
                }
            }

        }

    }


    /* =====================================================
       OPEN SIDEBAR
    ===================================================== */

    function openSidebar() {

        if (!sidebar || !sidebarToggle || !sidebarOverlay) {
            return;
        }

        sidebar.classList.add("is-open");
        sidebarOverlay.classList.add("is-visible");

        sidebarToggle.setAttribute("aria-expanded", "true");

        document.body.classList.add("sidebar-open");

    }


    /* =====================================================
       CLOSE SIDEBAR
    ===================================================== */

    function closeSidebar() {

        if (!sidebar || !sidebarToggle || !sidebarOverlay) {
            return;
        }

        sidebar.classList.remove("is-open");
        sidebarOverlay.classList.remove("is-visible");

        sidebarToggle.setAttribute("aria-expanded", "false");

        document.body.classList.remove("sidebar-open");

    }


    /* =====================================================
       MOBILE SIDEBAR TOGGLE
    ===================================================== */

    if (sidebarToggle) {

        sidebarToggle.addEventListener("click", function () {

            if (sidebar && sidebar.classList.contains("is-open")) {
                closeSidebar();
            } else {
                openSidebar();
            }

        });

    }


    /* =====================================================
       CLOSE SIDEBAR OVERLAY
    ===================================================== */

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener("click", closeSidebar);
    }


    /* =====================================================
       CLOSE WITH ESCAPE KEY
    ===================================================== */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closeSidebar();
        }

    });


    /* =====================================================
       CLOSE AFTER NAVIGATION ON MOBILE
    ===================================================== */

    if (sidebar) {

        sidebar.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {
                closeSidebar();
            });

        });

    }


    /* =====================================================
       MY PROFILE
       Requires id="sidebarProfile" on the dashboard link.
    ===================================================== */

    if (sidebarProfile) {

        sidebarProfile.addEventListener("click", function (event) {

            event.preventDefault();

            const currentUser = getCurrentUser();

            if (!currentUser) {

                window.location.href = "Account.html";

                return;
            }

            window.location.href =
                "Account.html?openProfile=true";

        });

    }


    /* =====================================================
       LOGOUT
       Keeps registered users intact.
    ===================================================== */

    if (sidebarLogout) {

        sidebarLogout.addEventListener("click", function () {

            /*
               Use SweetAlert2 when available.
               Otherwise, use the browser confirmation dialog.
            */

            function finishLogout() {

                try {

                    localStorage.removeItem(
                        "furniroCurrentUser"
                    );

                    window.location.href = "index.html";

                } catch (error) {

                    console.error("Logout failed:", error);

                    if (typeof Swal !== "undefined") {

                        Swal.fire({
                            icon: "error",
                            title: "Logout Failed",
                            text: "Unable to log out. Please try again."
                        });

                    } else {

                        window.alert(
                            "Unable to log out. Please try again."
                        );

                    }

                }

            }


            if (typeof Swal !== "undefined") {

                Swal.fire({
                    icon: "warning",
                    title: "Logout?",
                    text: "Are you sure you want to logout?",
                    showCancelButton: true,
                    confirmButtonText: "Yes, Logout",
                    cancelButtonText: "Cancel",
                    position: "top",
                    customClass: {
                        container: "furniro-swal-container"
                    }
                }).then(function (result) {

                    if (!result.isConfirmed) {
                        return;
                    }

                    finishLogout();

                });

            } else {

                const confirmed = window.confirm(
                    "Are you sure you want to log out?"
                );

                if (confirmed) {
                    finishLogout();
                }

            }

        });

    }


    /* =====================================================
       INITIALIZE DASHBOARD
    ===================================================== */

    updateDashboard();

});

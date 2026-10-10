document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    /* =========================================
       CURRENT USER
    ========================================= */

    function getCurrentUser() {
        try {
            const data = localStorage.getItem("furniroCurrentUser");
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error("Could not read current user:", error);
            return null;
        }
    }

    /* =========================================
       USER INITIALS
    ========================================= */

    function getUserInitials(name) {
        if (!name || typeof name !== "string") {
            return "U";
        }

        const words = name.trim().split(/\s+/).filter(Boolean);

        if (words.length === 0) {
            return "U";
        }

        if (words.length === 1) {
            return words[0].substring(0, 2).toUpperCase();
        }

        return (
            words[0].charAt(0) +
            words[words.length - 1].charAt(0)
        ).toUpperCase();
    }

    /* =========================================
       DASHBOARD ELEMENTS
    ========================================= */

    const sidebar = document.getElementById("accountSidebar");
    const overlay = document.getElementById("sidebarOverlay");
    const toggleButton = document.getElementById("sidebarToggle");
    const logoutButton = document.getElementById("sidebarLogout");

    const sidebarUserName = document.getElementById("sidebarUserName");
    const sidebarUserEmail = document.getElementById("sidebarUserEmail");
    const sidebarUserPhoto = document.getElementById("sidebarUserPhoto");
    const sidebarUserInitials = document.getElementById("sidebarUserInitials");

    const dashboardUserName = document.getElementById("dashboardUserName");
    const dashboardFullName = document.getElementById("dashboardFullName");
    const dashboardEmail = document.getElementById("dashboardEmail");

    /* =========================================
       UPDATE USER INFORMATION
    ========================================= */

    function updateDashboard() {
        const user = getCurrentUser();

        /*
           Do not redirect automatically.
           This prevents unexpected navigation to Account.html.
        */

        if (!user) {
            console.warn("No logged-in user found.");
            return;
        }

        const name = user.name || "User";
        const email = user.email || "";
        const photo = user.photo || "";
        const initials = getUserInitials(name);

        if (sidebarUserName) {
            sidebarUserName.textContent = "Welcome, " + name;
        }

        if (sidebarUserEmail) {
            sidebarUserEmail.textContent = email;
        }

        if (sidebarUserInitials) {
            sidebarUserInitials.textContent = initials;
            sidebarUserInitials.hidden = Boolean(photo);
        }

        if (sidebarUserPhoto) {
            sidebarUserPhoto.onerror = function () {
                sidebarUserPhoto.hidden = true;

                if (sidebarUserInitials) {
                    sidebarUserInitials.hidden = false;
                }
            };

            if (photo) {
                sidebarUserPhoto.src = photo;
                sidebarUserPhoto.hidden = false;
            } else {
                sidebarUserPhoto.removeAttribute("src");
                sidebarUserPhoto.hidden = true;
            }
        }

        if (dashboardUserName) {
            dashboardUserName.textContent =
                name.trim().split(/\s+/)[0] || "User";
        }

        if (dashboardFullName) {
            dashboardFullName.textContent = name;
        }

        if (dashboardEmail) {
            dashboardEmail.textContent = email || "Not provided";
        }
    }

    /* =========================================
       OPEN SIDEBAR
    ========================================= */

    function openSidebar() {
        if (sidebar) {
            sidebar.classList.add("active");
            sidebar.setAttribute("aria-hidden", "false");
        }

        if (overlay) {
            overlay.classList.add("active");
            overlay.setAttribute("aria-hidden", "false");
        }

        if (toggleButton) {
            toggleButton.setAttribute("aria-expanded", "true");
            toggleButton.setAttribute(
                "aria-label",
                "Close navigation menu"
            );
        }

        document.body.classList.add("sidebar-open");
    }

    /* =========================================
       CLOSE SIDEBAR
    ========================================= */

    function closeSidebar() {
        if (sidebar) {
            sidebar.classList.remove("active");
            sidebar.setAttribute("aria-hidden", "true");
        }

        if (overlay) {
            overlay.classList.remove("active");
            overlay.setAttribute("aria-hidden", "true");
        }

        if (toggleButton) {
            toggleButton.setAttribute("aria-expanded", "false");
            toggleButton.setAttribute(
                "aria-label",
                "Open navigation menu"
            );
        }

        document.body.classList.remove("sidebar-open");
    }

    /* =========================================
       SIDEBAR TOGGLE BUTTON
    ========================================= */

    if (toggleButton) {
        toggleButton.addEventListener("click", function (event) {
            event.preventDefault();

            if (sidebar && sidebar.classList.contains("active")) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });
    }

    /* =========================================
       OVERLAY CLICK
    ========================================= */

    if (overlay) {
        overlay.addEventListener("click", closeSidebar);
    }

    /* =========================================
       ESCAPE KEY
    ========================================= */

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeSidebar();
        }
    });

    /* =========================================
       PROFILE LINKS
    ========================================= */

    document.addEventListener("click", function (event) {
        const target = event.target;

        if (!(target instanceof Element)) {
            return;
        }

        const link = target.closest(
            "#sidebarProfile, " +
            ".quick-access-grid a, " +
            ".information-heading a"
        );

        if (!link) {
            return;
        }

        const href = link.getAttribute("href") || "";
        const linkText = (link.textContent || "").trim();

        const isProfileLink =
            link.id === "sidebarProfile" ||
            href.includes("openProfile") ||
            /my\s*profile|view\s*profile/i.test(linkText);

        if (!isProfileLink) {
            return;
        }

        event.preventDefault();

       const user = getCurrentUser();

if (!user) {
    console.warn("No logged-in user found.");
    return;
}

/*
   Open the profile modal on the homepage.
*/

window.location.href = "index.html?openProfile=true";
});
    /* =========================================
       LOGOUT
    ========================================= */

    function performLogout() {
        localStorage.removeItem("furniroCurrentUser");
        window.location.href = "index.html";
    }

    if (logoutButton) {
        logoutButton.addEventListener("click", function (event) {
            event.preventDefault();

            if (typeof Swal !== "undefined") {
                Swal.fire({
                    title: "Log out?",
                    text: "Are you sure you want to log out?",
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonText: "Yes, log out",
                    cancelButtonText: "Cancel",
                    confirmButtonColor: "#29251f"
                }).then(function (result) {
                    if (result.isConfirmed) {
                        performLogout();
                    }
                });
            } else {
                if (window.confirm("Are you sure you want to log out?")) {
                    performLogout();
                }
            }
        });
    }

    /* =========================================
       INITIALIZE
    ========================================= */

    updateDashboard();
});
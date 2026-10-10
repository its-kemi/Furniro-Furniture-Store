
/*
   ACCOUNT PROFILE
*/

document.addEventListener("DOMContentLoaded", function () {

    "use strict";

    /* =====================================================
       PROFILE MODAL ELEMENTS
    ===================================================== */

    const profileModal =
        document.getElementById("profileModal");

    const profileModalClose =
        document.getElementById("profileModalClose");

    const profileModalView =
        document.getElementById("profileModalView");

    const profileModalEdit =
        document.getElementById("profileModalEdit");


    /* =====================================================
       PROFILE MODAL INFORMATION
    ===================================================== */

    const modalProfilePhoto =
        document.getElementById("modalProfilePhoto");

    const modalProfileInitials =
        document.getElementById("modalProfileInitials");

    const modalProfileName =
        document.getElementById("modalProfileName");

    const modalProfileEmail =
        document.getElementById("modalProfileEmail");

    const modalEditPhotoPreview =
        document.getElementById("modalEditPhotoPreview");

    const modalEditPhotoInitials =
        document.getElementById("modalEditPhotoInitials");


    /* =====================================================
       USER MENU
    ===================================================== */

    const myProfile =
        document.getElementById("myProfile");

    const userMenu =
        document.getElementById("userMenu");


    /* =====================================================
       ACCOUNT PROFILE SECTION
    ===================================================== */

    const profileSection =
        document.querySelector(".profile-section");

    const profilePhoto =
        document.getElementById("profilePhoto");

    const profileInitials =
        document.getElementById("profileInitials");

    const profileName =
        document.getElementById("profileName");

    const profileEmail =
        document.getElementById("profileEmail");


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

    let currentUser = getCurrentUser();


    /* =====================================================
       GET USER INITIALS
    ===================================================== */

    function getUserInitials(name) {

        if (typeof name !== "string" || !name.trim()) {
            return "";
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
       UPDATE PROFILE SECTION
    ===================================================== */

    function updateProfile() {

        if (!currentUser) {
            return;
        }

        if (profileName) {
            profileName.textContent =
                currentUser.name || "User";
        }

        if (profileEmail) {
            profileEmail.textContent =
                currentUser.email || "";
        }

        const initials =
            getUserInitials(currentUser.name);

        const photo =
            typeof currentUser.photo === "string"
                ? currentUser.photo.trim()
                : "";


        /* Profile photo */

        if (photo) {

            if (profilePhoto) {
                profilePhoto.src = photo;
                profilePhoto.style.display = "block";
            }

            if (profileInitials) {
                profileInitials.textContent = "";
                profileInitials.style.display = "none";
            }

        } else {

            if (profilePhoto) {
                profilePhoto.removeAttribute("src");
                profilePhoto.style.display = "none";
            }

            if (profileInitials) {
                profileInitials.textContent = initials;
                profileInitials.style.display = "flex";
            }

        }

    }


    /* =====================================================
       UPDATE PROFILE MODAL
    ===================================================== */

    function updateProfileModal() {

        if (!currentUser) {
            return;
        }

        if (modalProfileName) {
            modalProfileName.textContent =
                currentUser.name || "User";
        }

        if (modalProfileEmail) {
            modalProfileEmail.textContent =
                currentUser.email || "";
        }

        const initials =
            getUserInitials(currentUser.name);

        const photo =
            typeof currentUser.photo === "string"
                ? currentUser.photo.trim()
                : "";


        /* Main profile photo */

        if (photo) {

            if (modalProfilePhoto) {
                modalProfilePhoto.src = photo;
                modalProfilePhoto.style.display = "block";
            }

            if (modalProfileInitials) {
                modalProfileInitials.textContent = "";
                modalProfileInitials.style.display = "none";
            }

        } else {

            if (modalProfilePhoto) {
                modalProfilePhoto.removeAttribute("src");
                modalProfilePhoto.style.display = "none";
            }

            if (modalProfileInitials) {
                modalProfileInitials.textContent = initials;
                modalProfileInitials.style.display = "flex";
            }

        }


        /* Edit photo preview */

        if (modalEditPhotoPreview) {

            if (photo) {
                modalEditPhotoPreview.src = photo;
                modalEditPhotoPreview.style.display = "block";
            } else {
                modalEditPhotoPreview.removeAttribute("src");
                modalEditPhotoPreview.style.display = "none";
            }

        }


        /* Edit photo initials */

        if (modalEditPhotoInitials) {

            if (photo) {
                modalEditPhotoInitials.textContent = "";
                modalEditPhotoInitials.style.display = "none";
            } else {
                modalEditPhotoInitials.textContent = initials;
                modalEditPhotoInitials.style.display = "flex";
            }

        }

    }


    /* =====================================================
       OPEN EXISTING PROFILE MODAL
    ===================================================== */

    function openProfileModal() {

        currentUser = getCurrentUser();

        if (!currentUser || !profileModal) {
            return false;
        }

        if (userMenu) {
            userMenu.classList.remove("active");
        }

        if (profileModalView) {
            profileModalView.style.display = "block";
        }

        if (profileModalEdit) {
            profileModalEdit.classList.remove("active");
        }

        updateProfile();
        updateProfileModal();

        profileModal.classList.add("active");

        return true;
    }


    /* =====================================================
       MY PROFILE FROM EXISTING USER MENU
    ===================================================== */

    if (myProfile) {

        myProfile.addEventListener("click", function (event) {

            event.preventDefault();

            openProfileModal();

        });

    }


    /* =====================================================
       OPEN PROFILE FROM ACCOUNT DASHBOARD
       URL: Account.html?openProfile=true
    ===================================================== */

    const urlParams =
        new URLSearchParams(window.location.search);

    if (urlParams.get("openProfile") === "true") {

        if (!getCurrentUser()) {

            window.location.replace("Account.html");

            return;
        }

        if (!openProfileModal()) {

            console.error(
                "Profile modal was not found on Account.html."
            );

        } else {

            /*
               Remove the parameter after opening the modal.
               This prevents reopening it on a later refresh.
            */

            window.history.replaceState(
                {},
                document.title,
                window.location.pathname
            );

        }

    }


    /* =====================================================
       CLOSE PROFILE MODAL
    ===================================================== */

    if (profileModalClose) {

        profileModalClose.addEventListener("click", function () {

            if (profileModal) {
                profileModal.classList.remove("active");
            }

            if (profileModalView) {
                profileModalView.style.display = "block";
            }

            if (profileModalEdit) {
                profileModalEdit.classList.remove("active");
            }

        });

    }


    /* =====================================================
       INITIAL UI
    ===================================================== */

    if (currentUser) {
        updateProfile();
        updateProfileModal();
    }

});

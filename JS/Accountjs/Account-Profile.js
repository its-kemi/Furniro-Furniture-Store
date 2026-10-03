/*
   ACCOUNT PROFILE
*/

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /* =====================================================
           PROFILE MODAL ELEMENTS
        ===================================================== */

        const profileModal =
            document.getElementById(
                "profileModal"
            );

        const profileModalClose =
            document.getElementById(
                "profileModalClose"
            );

        const profileModalView =
            document.getElementById(
                "profileModalView"
            );

        const profileModalEdit =
            document.getElementById(
                "profileModalEdit"
            );


        /* =====================================================
           PROFILE MODAL INFORMATION
        ===================================================== */

        const modalProfilePhoto =
            document.getElementById(
                "modalProfilePhoto"
            );

        const modalProfileInitials =
            document.getElementById(
                "modalProfileInitials"
            );

        const modalProfileName =
            document.getElementById(
                "modalProfileName"
            );

        const modalProfileEmail =
            document.getElementById(
                "modalProfileEmail"
            );

        const modalEditPhotoPreview =
            document.getElementById(
                "modalEditPhotoPreview"
            );

        const modalEditPhotoInitials =
            document.getElementById(
                "modalEditPhotoInitials"
            );


        /* =====================================================
           USER MENU
        ===================================================== */

        const myProfile =
            document.getElementById(
                "myProfile"
            );

        const userMenu =
            document.getElementById(
                "userMenu"
            );


        /* =====================================================
           ACCOUNT PROFILE SECTION
        ===================================================== */

        const profileSection =
            document.querySelector(
                ".profile-section"
            );

        const profilePhoto =
            document.getElementById(
                "profilePhoto"
            );

        const profileInitials =
            document.getElementById(
                "profileInitials"
            );

        const profileName =
            document.getElementById(
                "profileName"
            );

        const profileEmail =
            document.getElementById(
                "profileEmail"
            );


        /* =====================================================
           GET CURRENT USER
        ===================================================== */

        let currentUser =
            JSON.parse(
                localStorage.getItem(
                    "furniroCurrentUser"
                )
            ) || null;


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


        /* =====================================================
           UPDATE PROFILE SECTION
        ===================================================== */

        function updateProfile() {

            if (!currentUser) {
                return;
            }


            /* Profile name */

            if (profileName) {

                profileName.textContent =
                    currentUser.name || "User";

            }


            /* Profile email */

            if (profileEmail) {

                profileEmail.textContent =
                    currentUser.email || "";

            }


            const initials =
                getUserInitials(
                    currentUser.name
                );


            /* =================================================
               REAL PHOTO
            ================================================= */

            if (currentUser.photo) {

                if (profilePhoto) {

                    profilePhoto.src =
                        currentUser.photo;

                    profilePhoto.style.display =
                        "block";

                }


                if (profileInitials) {

                    profileInitials.textContent =
                        "";

                    profileInitials.style.display =
                        "none";

                }

            }


            /* =================================================
               NO PHOTO
            ================================================= */

            else {

                if (profilePhoto) {

                    profilePhoto.removeAttribute(
                        "src"
                    );

                    profilePhoto.style.display =
                        "none";

                }


                if (profileInitials) {

                    profileInitials.textContent =
                        initials;

                    profileInitials.style.display =
                        "flex";

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


            /* Modal name */

            if (modalProfileName) {

                modalProfileName.textContent =
                    currentUser.name || "User";

            }


            /* Modal email */

            if (modalProfileEmail) {

                modalProfileEmail.textContent =
                    currentUser.email || "";

            }


            const initials =
                getUserInitials(
                    currentUser.name
                );


            /* =================================================
               MAIN PROFILE MODAL PHOTO
            ================================================= */

            if (currentUser.photo) {

                if (modalProfilePhoto) {

                    modalProfilePhoto.src =
                        currentUser.photo;

                    modalProfilePhoto.style.display =
                        "block";

                }


                if (modalProfileInitials) {

                    modalProfileInitials.textContent =
                        "";

                    modalProfileInitials.style.display =
                        "none";

                }

            }


            /* =================================================
               NO PROFILE PHOTO
            ================================================= */

            else {

                if (modalProfilePhoto) {

                    modalProfilePhoto.removeAttribute(
                        "src"
                    );

                    modalProfilePhoto.style.display =
                        "none";

                }


                if (modalProfileInitials) {

                    modalProfileInitials.textContent =
                        initials;

                    modalProfileInitials.style.display =
                        "flex";

                }

            }


            /* =================================================
               EDIT PHOTO PREVIEW
            ================================================= */

            if (modalEditPhotoPreview) {

                if (currentUser.photo) {

                    modalEditPhotoPreview.src =
                        currentUser.photo;

                    modalEditPhotoPreview.style.display =
                        "block";

                }

                else {

                    modalEditPhotoPreview.removeAttribute(
                        "src"
                    );

                    modalEditPhotoPreview.style.display =
                        "none";

                }

            }


            /* =================================================
               EDIT PHOTO INITIALS
            ================================================= */

            if (modalEditPhotoInitials) {

                if (currentUser.photo) {

                    modalEditPhotoInitials.textContent =
                        "";

                    modalEditPhotoInitials.style.display =
                        "none";

                }

                else {

                    modalEditPhotoInitials.textContent =
                        initials;

                    modalEditPhotoInitials.style.display =
                        "flex";

                }

            }

        }


        /* =====================================================
           MY PROFILE BUTTON
        ===================================================== */

        if (myProfile) {

            myProfile.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    /* Get latest user */

                    currentUser =
                        JSON.parse(
                            localStorage.getItem(
                                "furniroCurrentUser"
                            )
                        ) || null;


                    if (!currentUser) {
                        return;
                    }


                    /* Close User Menu */

                    if (userMenu) {

                        userMenu.classList.remove(
                            "active"
                        );

                    }


                    /* Show Profile View */

                    if (profileModalView) {

                        profileModalView.style.display =
                            "block";

                    }


                    /* Hide Edit Form */

                    if (profileModalEdit) {

                        profileModalEdit.classList.remove(
                            "active"
                        );

                    }


                    /* Update modal */

                    updateProfileModal();


                    /* Open modal */

                    if (profileModal) {

                        profileModal.classList.add(
                            "active"
                        );

                    }

                }
            );

        }


        /* =====================================================
           CLOSE PROFILE MODAL
        ===================================================== */

        if (profileModalClose) {

            profileModalClose.addEventListener(
                "click",
                function () {

                    if (profileModal) {

                        profileModal.classList.remove(
                            "active"
                        );

                    }


                    if (profileModalView) {

                        profileModalView.style.display =
                            "block";

                    }


                    if (profileModalEdit) {

                        profileModalEdit.classList.remove(
                            "active"
                        );

                    }

                }
            );

        }


        /* =====================================================
           INITIAL UI
        ===================================================== */

        if (currentUser) {

            updateProfile();

            updateProfileModal();

        }

    }
);
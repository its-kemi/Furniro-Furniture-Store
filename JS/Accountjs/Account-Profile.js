/* 
   ACCOUNT PROFILE
 */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /* 
           Profile elements
         */

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


        /* 
           Profile Modal information
         */

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


        /* 
           User Menu
         */

        const myProfile =
            document.getElementById(
                "myProfile"
            );

        const userMenu =
            document.getElementById(
                "userMenu"
            );


        /* 
           Account Profile section
         */

        const profileSection =
            document.querySelector(
                ".profile-section"
            );

        const profilePhoto =
            document.getElementById(
                "profilePhoto"
            );

        const profileName =
            document.getElementById(
                "profileName"
            );

        const profileEmail =
            document.getElementById(
                "profileEmail"
            );


        /* 
           Get current user
         */

        let currentUser =
            JSON.parse(
                localStorage.getItem(
                    "furniroCurrentUser"
                )
            ) || null;


        /* 
           Get user initials
         */

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


            return words[0]
                .charAt(0)
                .toUpperCase();

        }


        /* 
           Update Profile
         */

        function updateProfile() {

            if (!currentUser) {
                return;
            }


            /* 
               Profile name
             */

            if (profileName) {

                profileName.textContent =
                    currentUser.name;

            }


            /* 
               Profile email
             */

            if (profileEmail) {

                profileEmail.textContent =
                    currentUser.email;

            }


            /* 
               Profile photo

               If there is no photo,
               do not show logo.
             */

            if (profilePhoto) {

                if (currentUser.photo) {

                    profilePhoto.src =
                        currentUser.photo;

                    profilePhoto.style.display =
                        "block";

                } else {

                    profilePhoto.src =
                        "";

                    profilePhoto.style.display =
                        "none";

                }

            }

        }


        /* 
           Update Profile Modal
         */

        function updateProfileModal() {

            if (!currentUser) {
                return;
            }


            /* 
               Modal name
             */

            if (modalProfileName) {

                modalProfileName.textContent =
                    currentUser.name;

            }


            /* 
               Modal email
             */

            if (modalProfileEmail) {

                modalProfileEmail.textContent =
                    currentUser.email;

            }


            /* 
               Get initials
             */

            const initials =
                getUserInitials(
                    currentUser.name
                );


            /* 
               Modal photo
             */

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


            /* 
               No photo
               Show initials
             */

            else {

                if (modalProfilePhoto) {

                    modalProfilePhoto.src =
                        "";

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


            /* 
               Edit photo preview

               Keep edit preview separate.
             */

            if (modalEditPhotoPreview) {

                if (currentUser.photo) {

                    modalEditPhotoPreview.src =
                        currentUser.photo;

                } else {

                    modalEditPhotoPreview.src =
                        "";

                }

            }

        }


        /* 
           My Profile
         */

        if (myProfile) {

            myProfile.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    /* 
                       Get latest current user
                     */

                    currentUser =
                        JSON.parse(
                            localStorage.getItem(
                                "furniroCurrentUser"
                            )
                        ) || null;


                    if (!currentUser) {
                        return;
                    }


                    /* 
                       Close User Menu
                     */

                    if (userMenu) {

                        userMenu.classList.remove(
                            "active"
                        );

                    }


                    /* 
                       Show Profile View
                     */

                    if (profileModalView) {

                        profileModalView.style.display =
                            "block";

                    }


                    /* 
                       Hide Edit Form
                     */

                    if (profileModalEdit) {

                        profileModalEdit.classList.remove(
                            "active"
                        );

                    }


                    /* 
                       Update Profile Modal
                     */

                    updateProfileModal();


                    /* 
                       Open Profile Modal
                     */

                    if (profileModal) {

                        profileModal.classList.add(
                            "active"
                        );

                    }

                }
            );

        }


        /* 
           Close Profile Modal
         */

        if (profileModalClose) {

            profileModalClose.addEventListener(
                "click",
                function () {

                    if (profileModal) {

                        profileModal.classList.remove(
                            "active"
                        );

                    }


                    /* 
                       Return to Profile View
                     */

                    if (profileModalView) {

                        profileModalView.style.display =
                            "block";

                    }


                    /* 
                       Hide Edit Form
                     */

                    if (profileModalEdit) {

                        profileModalEdit.classList.remove(
                            "active"
                        );

                    }

                }
            );

        }


        /* 
           Load current user
         */

        if (currentUser) {

            updateProfile();

            updateProfileModal();

        }

    }
);
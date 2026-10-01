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
             */

            if (profilePhoto) {

                profilePhoto.src =
                    currentUser.photo ||
                    "assite/Header-images/logo.png";

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
               Modal photo
             */

            if (modalProfilePhoto) {

                modalProfilePhoto.src =
                    currentUser.photo ||
                    "assite/Header-images/logo.png";

            }


            /* 
               Edit photo preview
             */

            if (modalEditPhotoPreview) {

                modalEditPhotoPreview.src =
                    currentUser.photo ||
                    "assite/Header-images/logo.png";

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
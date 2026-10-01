/* 
   ACCOUNT PROFILE EDIT
 */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /* 
           Profile Modal elements
         */

        const modalEditProfile =
            document.getElementById(
                "modalEditProfile"
            );

        const profileModalView =
            document.getElementById(
                "profileModalView"
            );

        const profileModalEdit =
            document.getElementById(
                "profileModalEdit"
            );

        const modalProfileForm =
            document.getElementById(
                "modalProfileForm"
            );

        const modalEditName =
            document.getElementById(
                "modalEditName"
            );

        const modalEditEmail =
            document.getElementById(
                "modalEditEmail"
            );

        const modalEditPhoto =
            document.getElementById(
                "modalEditPhoto"
            );

        const modalEditPhotoPreview =
            document.getElementById(
                "modalEditPhotoPreview"
            );

        const modalCancelEdit =
            document.getElementById(
                "modalCancelEdit"
            );


        /* 
           Account Profile elements
         */

        const editProfileButton =
            document.getElementById(
                "editProfileButton"
            );

        const profileEdit =
            document.getElementById(
                "profileEdit"
            );

        const profileForm =
            document.getElementById(
                "profileForm"
            );

        const profileNameInput =
            document.getElementById(
                "profile-name"
            );

        const profileEmailInput =
            document.getElementById(
                "profile-email"
            );

        const profilePhotoInput =
            document.getElementById(
                "profile-photo-input"
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
           Update User Menu
         */

        function updateUserMenu() {

            const userMenuName =
                document.getElementById(
                    "userMenuName"
                );

            const userMenuEmail =
                document.getElementById(
                    "userMenuEmail"
                );

            const userMenuPhoto =
                document.getElementById(
                    "userMenuPhoto"
                );


            if (!currentUser) {
                return;
            }


            if (userMenuName) {

                userMenuName.textContent =
                    currentUser.name;

            }


            if (userMenuEmail) {

                userMenuEmail.textContent =
                    currentUser.email;

            }


            if (userMenuPhoto) {

                userMenuPhoto.src =
                    currentUser.photo ||
                    "assite/Header-images/logo.png";

            }

        }


        /* 
           Update Profile
         */

        function updateProfile() {

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


            if (!currentUser) {
                return;
            }


            if (profileName) {

                profileName.textContent =
                    currentUser.name;

            }


            if (profileEmail) {

                profileEmail.textContent =
                    currentUser.email;

            }


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


            if (!currentUser) {
                return;
            }


            if (modalProfileName) {

                modalProfileName.textContent =
                    currentUser.name;

            }


            if (modalProfileEmail) {

                modalProfileEmail.textContent =
                    currentUser.email;

            }


            if (modalProfilePhoto) {

                modalProfilePhoto.src =
                    currentUser.photo ||
                    "assite/Header-images/logo.png";

            }


            if (modalEditPhotoPreview) {

                modalEditPhotoPreview.src =
                    currentUser.photo ||
                    "assite/Header-images/logo.png";

            }

        }


        /* 
           Edit Profile from Modal
         */

        if (modalEditProfile) {

            modalEditProfile.addEventListener(
                "click",
                function () {

                    if (!currentUser) {
                        return;
                    }


                    /* 
                       Fill Name
                     */

                    if (modalEditName) {

                        modalEditName.value =
                            currentUser.name;

                    }


                    /* 
                       Fill Email
                     */

                    if (modalEditEmail) {

                        modalEditEmail.value =
                            currentUser.email;

                    }


                    /* 
                       Show Current Photo
                     */

                    if (modalEditPhotoPreview) {

                        modalEditPhotoPreview.src =
                            currentUser.photo ||
                            "assite/Header-images/logo.png";

                    }


                    /* 
                       Hide Profile View
                     */

                    if (profileModalView) {

                        profileModalView.style.display =
                            "none";

                    }


                    /* 
                       Show Edit Form
                     */

                    if (profileModalEdit) {

                        profileModalEdit.classList.add(
                            "active"
                        );

                    }

                }
            );

        }


        /* 
           Preview New Profile Photo
         */

        if (modalEditPhoto) {

            modalEditPhoto.addEventListener(
                "change",
                function () {

                    const file =
                        modalEditPhoto.files[0];


                    if (!file) {
                        return;
                    }


                    const reader =
                        new FileReader();


                    reader.onload =
                        function () {

                            if (
                                modalEditPhotoPreview
                            ) {

                                modalEditPhotoPreview.src =
                                    reader.result;

                            }

                        };


                    reader.readAsDataURL(
                        file
                    );

                }
            );

        }


        /* 
           Cancel Modal Edit
         */

        if (modalCancelEdit) {

            modalCancelEdit.addEventListener(
                "click",
                function () {

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
                       Reset Edit Form
                     */

                    if (modalProfileForm) {

                        modalProfileForm.reset();

                    }


                    /* 
                       Restore Current Photo
                     */

                    if (modalEditPhotoPreview) {

                        modalEditPhotoPreview.src =
                            currentUser?.photo ||
                            "assite/Header-images/logo.png";

                    }

                }
            );

        }


        /* 
           Save Profile from Modal
         */

        if (modalProfileForm) {

            modalProfileForm.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    if (!currentUser) {
                        return;
                    }


                    /* 
                       New Name
                     */

                    const newName =
                        modalEditName
                            ? modalEditName.value.trim()
                            : "";


                    /* 
                       New Email
                     */

                    const newEmail =
                        modalEditEmail
                            ? modalEditEmail.value
                                .trim()
                                .toLowerCase()
                            : "";


                    /* 
                       Name validation
                     */

                    if (newName.length < 2) {

                        alert(
                            "Please enter your full name."
                        );

                        return;
                    }


                    /* 
                       Email validation
                     */

                    if (
                        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                            newEmail
                        )
                    ) {

                        alert(
                            "Please enter a valid email."
                        );

                        return;
                    }


                    /* 
                       Get users
                     */

                    const users =
                        JSON.parse(
                            localStorage.getItem(
                                "furniroUsers"
                            )
                        ) || [];


                    /* 
                       Check duplicate email
                     */

                    const emailExists =
                        users.find(
                            function (user) {

                                return (
                                    user.email ===
                                        newEmail &&
                                    user.id !==
                                        currentUser.id
                                );

                            }
                        );


                    if (emailExists) {

                        alert(
                            "This email is already registered."
                        );

                        return;
                    }


                    /* 
                       Update name and email
                     */

                    currentUser.name =
                        newName;

                    currentUser.email =
                        newEmail;


                    /* 
                       Profile photo
                     */

                    const file =
                        modalEditPhoto
                            ? modalEditPhoto.files[0]
                            : null;


                    if (file) {

                        const reader =
                            new FileReader();


                        reader.onload =
                            function () {

                                currentUser.photo =
                                    reader.result;

                                saveModalProfile();

                            };


                        reader.readAsDataURL(
                            file
                        );

                    } else {

                        saveModalProfile();

                    }

                }
            );

        }


        /* 
           Save Modal Profile Data
         */

        function saveModalProfile() {

            /* 
               Save current user
             */

            localStorage.setItem(
                "furniroCurrentUser",
                JSON.stringify(
                    currentUser
                )
            );


            /* 
               Get users
             */

            const users =
                JSON.parse(
                    localStorage.getItem(
                        "furniroUsers"
                    )
                ) || [];


            /* 
               Find current user
             */

            const userIndex =
                users.findIndex(
                    function (user) {

                        return (
                            user.id ===
                            currentUser.id
                        );

                    }
                );


            /* 
               Update user
             */

            if (userIndex !== -1) {

                users[userIndex].name =
                    currentUser.name;

                users[userIndex].email =
                    currentUser.email;

                users[userIndex].photo =
                    currentUser.photo;

            }


            /* 
               Save users
             */

            localStorage.setItem(
                "furniroUsers",
                JSON.stringify(
                    users
                )
            );


            /* 
               Update UI
             */

            updateUserMenu();

            updateProfile();

            updateProfileModal();


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


            /* 
               Reset form
             */

            if (modalProfileForm) {

                modalProfileForm.reset();

            }


            alert(
                "Profile updated successfully!"
            );

        }


        /* 
           Edit Profile in Account.html
         */

        if (editProfileButton) {

            editProfileButton.addEventListener(
                "click",
                function () {

                    if (!currentUser) {
                        return;
                    }


                    if (profileNameInput) {

                        profileNameInput.value =
                            currentUser.name;

                    }


                    if (profileEmailInput) {

                        profileEmailInput.value =
                            currentUser.email;

                    }


                    if (profileEdit) {

                        profileEdit.classList.add(
                            "active"
                        );

                    }

                }
            );

        }


        /* 
           Save Profile in Account.html
         */

        if (profileForm) {

            profileForm.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    if (!currentUser) {
                        return;
                    }


                    const newName =
                        profileNameInput
                            ? profileNameInput.value.trim()
                            : "";


                    const newEmail =
                        profileEmailInput
                            ? profileEmailInput.value
                                .trim()
                                .toLowerCase()
                            : "";


                    /* 
                       Name validation
                     */

                    if (newName.length < 2) {

                        alert(
                            "Please enter your full name."
                        );

                        return;
                    }


                    /* 
                       Email validation
                     */

                    if (
                        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                            newEmail
                        )
                    ) {

                        alert(
                            "Please enter a valid email."
                        );

                        return;
                    }


                    /* 
                       Update current user
                     */

                    currentUser.name =
                        newName;

                    currentUser.email =
                        newEmail;


                    /* 
                       Profile photo
                     */

                    const file =
                        profilePhotoInput
                            ? profilePhotoInput.files[0]
                            : null;


                    if (file) {

                        const reader =
                            new FileReader();


                        reader.onload =
                            function () {

                                currentUser.photo =
                                    reader.result;

                                saveProfile();

                            };


                        reader.readAsDataURL(
                            file
                        );

                    } else {

                        saveProfile();

                    }

                }
            );

        }


        /* 
           Save Profile Data in Account.html
         */

        function saveProfile() {

            /* 
               Save current user
             */

            localStorage.setItem(
                "furniroCurrentUser",
                JSON.stringify(
                    currentUser
                )
            );


            /* 
               Get users
             */

            const users =
                JSON.parse(
                    localStorage.getItem(
                        "furniroUsers"
                    )
                ) || [];


            /* 
               Find current user
             */

            const userIndex =
                users.findIndex(
                    function (user) {

                        return (
                            user.id ===
                            currentUser.id
                        );

                    }
                );


            /* 
               Update user
             */

            if (userIndex !== -1) {

                users[userIndex].name =
                    currentUser.name;

                users[userIndex].email =
                    currentUser.email;

                users[userIndex].photo =
                    currentUser.photo;

            }


            /* 
               Save users
             */

            localStorage.setItem(
                "furniroUsers",
                JSON.stringify(
                    users
                )
            );


            /* 
               Update UI
             */

            updateUserMenu();

            updateProfile();

            updateProfileModal();


            /* 
               Close Edit Form
             */

            if (profileEdit) {

                profileEdit.classList.remove(
                    "active"
                );

            }


            /* 
               Reset form
             */

            if (profileForm) {

                profileForm.reset();

            }


            alert(
                "Profile updated successfully!"
            );

        }

    }
);
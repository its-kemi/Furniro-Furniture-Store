/*
   ACCOUNT PROFILE EDIT
*/

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /* =====================================================
           PROFILE MODAL ELEMENTS
        ===================================================== */

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

        const modalEditPhotoInitials =
            document.getElementById(
                "modalEditPhotoInitials"
            );

        const modalCancelEdit =
            document.getElementById(
                "modalCancelEdit"
            );


        /* =====================================================
           ACCOUNT PROFILE ELEMENTS
        ===================================================== */

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
           UPDATE USER MENU
        ===================================================== */

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

            const userMenuInitials =
                document.getElementById(
                    "userMenuInitials"
                );


            if (!currentUser) {
                return;
            }


            /* User name */

            if (userMenuName) {

                userMenuName.textContent =
                    currentUser.name || "User";

            }


            /* User email */

            if (userMenuEmail) {

                userMenuEmail.textContent =
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

                if (userMenuPhoto) {

                    userMenuPhoto.src =
                        currentUser.photo;

                    userMenuPhoto.style.display =
                        "block";

                }


                if (userMenuInitials) {

                    userMenuInitials.textContent =
                        "";

                    userMenuInitials.style.display =
                        "none";

                }

            }


            /* =================================================
               NO PHOTO
            ================================================= */

            else {

                if (userMenuPhoto) {

                    userMenuPhoto.removeAttribute(
                        "src"
                    );

                    userMenuPhoto.style.display =
                        "none";

                }


                if (userMenuInitials) {

                    userMenuInitials.textContent =
                        initials;

                    userMenuInitials.style.display =
                        "flex";

                }

            }

        }


        /* =====================================================
           UPDATE PROFILE
        ===================================================== */

        function updateProfile() {

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
               REAL PROFILE PHOTO
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
           EDIT PROFILE FROM MODAL
        ===================================================== */

        if (modalEditProfile) {

            modalEditProfile.addEventListener(
                "click",
                function () {

                    if (!currentUser) {
                        return;
                    }


                    /* Fill name */

                    if (modalEditName) {

                        modalEditName.value =
                            currentUser.name || "";

                    }


                    /* Fill email */

                    if (modalEditEmail) {

                        modalEditEmail.value =
                            currentUser.email || "";

                    }


                    /* =================================================
                       CURRENT PHOTO
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
                       CURRENT INITIALS
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
                                getUserInitials(
                                    currentUser.name
                                );

                            modalEditPhotoInitials.style.display =
                                "flex";

                        }

                    }


                    /* Hide Profile View */

                    if (profileModalView) {

                        profileModalView.style.display =
                            "none";

                    }


                    /* Show Edit Form */

                    if (profileModalEdit) {

                        profileModalEdit.classList.add(
                            "active"
                        );

                    }

                }
            );

        }


        /* =====================================================
           PREVIEW NEW PROFILE PHOTO
        ===================================================== */

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

                            /* Show new photo */

                            if (modalEditPhotoPreview) {

                                modalEditPhotoPreview.src =
                                    reader.result;

                                modalEditPhotoPreview.style.display =
                                    "block";

                            }


                            /* Hide initials */

                            if (modalEditPhotoInitials) {

                                modalEditPhotoInitials.textContent =
                                    "";

                                modalEditPhotoInitials.style.display =
                                    "none";

                            }

                        };


                    reader.readAsDataURL(
                        file
                    );

                }
            );

        }


        /* =====================================================
           CANCEL MODAL EDIT
        ===================================================== */

        if (modalCancelEdit) {

            modalCancelEdit.addEventListener(
                "click",
                function () {

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


                    /* Reset form */

                    if (modalProfileForm) {

                        modalProfileForm.reset();

                    }


                    /* =================================================
                       RESTORE OLD PHOTO OR INITIALS
                    ================================================= */

                    if (modalEditPhotoPreview) {

                        if (
                            currentUser &&
                            currentUser.photo
                        ) {

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


                    if (modalEditPhotoInitials) {

                        if (
                            currentUser &&
                            currentUser.photo
                        ) {

                            modalEditPhotoInitials.textContent =
                                "";

                            modalEditPhotoInitials.style.display =
                                "none";

                        }

                        else if (currentUser) {

                            modalEditPhotoInitials.textContent =
                                getUserInitials(
                                    currentUser.name
                                );

                            modalEditPhotoInitials.style.display =
                                "flex";

                        }

                    }

                }
            );

        }


        /* =====================================================
           SAVE PROFILE FROM MODAL
        ===================================================== */

        if (modalProfileForm) {

            modalProfileForm.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    if (!currentUser) {
                        return;
                    }


                    /* New name */

                    const newName =
                        modalEditName
                            ? modalEditName.value.trim()
                            : "";


                    /* New email */

                    const newEmail =
                        modalEditEmail
                            ? modalEditEmail.value
                                .trim()
                                .toLowerCase()
                            : "";


                    /* =================================================
                       NAME VALIDATION
                    ================================================= */

                    if (newName.length < 2) {

                        alert(
                            "Please enter your full name."
                        );

                        return;
                    }


                    /* =================================================
                       EMAIL VALIDATION
                    ================================================= */

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


                    /* =================================================
                       GET USERS
                    ================================================= */

                    const users =
                        JSON.parse(
                            localStorage.getItem(
                                "furniroUsers"
                            )
                        ) || [];


                    /* =================================================
                       CHECK DUPLICATE EMAIL
                    ================================================= */

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


                    /* Update name */

                    currentUser.name =
                        newName;


                    /* Update email */

                    currentUser.email =
                        newEmail;


                    /* =================================================
                       PROFILE PHOTO
                    ================================================= */

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

                    }

                    else {

                        saveModalProfile();

                    }

                }
            );

        }


        /* =====================================================
           SAVE MODAL PROFILE DATA
        ===================================================== */

        function saveModalProfile() {

            /* Save current user */

            localStorage.setItem(
                "furniroCurrentUser",
                JSON.stringify(
                    currentUser
                )
            );


            /* Get users */

            const users =
                JSON.parse(
                    localStorage.getItem(
                        "furniroUsers"
                    )
                ) || [];


            /* Find current user */

            const userIndex =
                users.findIndex(
                    function (user) {

                        return (
                            user.id ===
                            currentUser.id
                        );

                    }
                );


            /* Update user */

            if (userIndex !== -1) {

                users[userIndex].name =
                    currentUser.name;

                users[userIndex].email =
                    currentUser.email;

                users[userIndex].photo =
                    currentUser.photo;

            }


            /* Save users */

            localStorage.setItem(
                "furniroUsers",
                JSON.stringify(
                    users
                )
            );


            /* Update UI */

            updateUserMenu();

            updateProfile();

            updateProfileModal();


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


            /* Reset form */

            if (modalProfileForm) {

                modalProfileForm.reset();

            }


            alert(
                "Profile updated successfully!"
            );

        }


        /* =====================================================
           EDIT PROFILE IN ACCOUNT.HTML
        ===================================================== */

        if (editProfileButton) {

            editProfileButton.addEventListener(
                "click",
                function () {

                    if (!currentUser) {
                        return;
                    }


                    /* Fill name */

                    if (profileNameInput) {

                        profileNameInput.value =
                            currentUser.name || "";

                    }


                    /* Fill email */

                    if (profileEmailInput) {

                        profileEmailInput.value =
                            currentUser.email || "";

                    }


                    /* Show edit form */

                    if (profileEdit) {

                        profileEdit.classList.add(
                            "active"
                        );

                    }

                }
            );

        }


        /* =====================================================
           SAVE PROFILE IN ACCOUNT.HTML
        ===================================================== */

        if (profileForm) {

            profileForm.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    if (!currentUser) {
                        return;
                    }


                    /* New name */

                    const newName =
                        profileNameInput
                            ? profileNameInput.value.trim()
                            : "";


                    /* New email */

                    const newEmail =
                        profileEmailInput
                            ? profileEmailInput.value
                                .trim()
                                .toLowerCase()
                            : "";


                    /* =================================================
                       NAME VALIDATION
                    ================================================= */

                    if (newName.length < 2) {

                        alert(
                            "Please enter your full name."
                        );

                        return;
                    }


                    /* =================================================
                       EMAIL VALIDATION
                    ================================================= */

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


                    /* Update current user */

                    currentUser.name =
                        newName;

                    currentUser.email =
                        newEmail;


                    /* Profile photo */

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

                    }

                    else {

                        saveProfile();

                    }

                }
            );

        }


        /* =====================================================
           SAVE PROFILE DATA IN ACCOUNT.HTML
        ===================================================== */

        function saveProfile() {

            /* Save current user */

            localStorage.setItem(
                "furniroCurrentUser",
                JSON.stringify(
                    currentUser
                )
            );


            /* Get users */

            const users =
                JSON.parse(
                    localStorage.getItem(
                        "furniroUsers"
                    )
                ) || [];


            /* Find current user */

            const userIndex =
                users.findIndex(
                    function (user) {

                        return (
                            user.id ===
                            currentUser.id
                        );

                    }
                );


            /* Update user */

            if (userIndex !== -1) {

                users[userIndex].name =
                    currentUser.name;

                users[userIndex].email =
                    currentUser.email;

                users[userIndex].photo =
                    currentUser.photo;

            }


            /* Save users */

            localStorage.setItem(
                "furniroUsers",
                JSON.stringify(
                    users
                )
            );


            /* Update UI */

            updateUserMenu();

            updateProfile();

            updateProfileModal();


            /* Close Edit Form */

            if (profileEdit) {

                profileEdit.classList.remove(
                    "active"
                );

            }


            /* Reset form */

            if (profileForm) {

                profileForm.reset();

            }


            alert(
                "Profile updated successfully!"
            );

        }


        /* =====================================================
           INITIAL UI UPDATE
        ===================================================== */

        if (currentUser) {

            updateUserMenu();

            updateProfile();

            updateProfileModal();

        }

    }
);
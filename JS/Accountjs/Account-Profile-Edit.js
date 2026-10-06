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
            document.getElementById("modalEditProfile");

        const profileModalView =
            document.getElementById("profileModalView");

        const profileModalEdit =
            document.getElementById("profileModalEdit");

        const modalProfileForm =
            document.getElementById("modalProfileForm");

        const modalEditName =
            document.getElementById("modalEditName");

        const modalEditEmail =
            document.getElementById("modalEditEmail");

        const modalEditPhoto =
            document.getElementById("modalEditPhoto");

        const modalEditPhotoPreview =
            document.getElementById("modalEditPhotoPreview");

        const modalEditPhotoInitials =
            document.getElementById("modalEditPhotoInitials");

        const modalCancelEdit =
            document.getElementById("modalCancelEdit");

        const removeProfilePhoto =
            document.getElementById("removeProfilePhoto");


        /* =====================================================
           ACCOUNT PROFILE ELEMENTS
        ===================================================== */

        const editProfileButton =
            document.getElementById("editProfileButton");

        const profileEdit =
            document.getElementById("profileEdit");

        const profileForm =
            document.getElementById("profileForm");

        const profileNameInput =
            document.getElementById("profile-name");

        const profileEmailInput =
            document.getElementById("profile-email");

        const profilePhotoInput =
            document.getElementById("profile-photo-input");


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
           ORIGINAL PHOTO
           Used for Cancel
        ===================================================== */

        let originalProfilePhoto = "";


        /* =====================================================
           GET USER NAME
        ===================================================== */

        function getUserName(user) {

            if (!user) {
                return "User";
            }

            return (
                user.name ||
                user.fullName ||
                user.username ||
                "User"
            );

        }


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
                document.getElementById("userMenuName");

            const userMenuEmail =
                document.getElementById("userMenuEmail");

            const userMenuPhoto =
                document.getElementById("userMenuPhoto");

            const userMenuInitials =
                document.getElementById("userMenuInitials");


            if (!currentUser) {
                return;
            }


            /* User name */

            if (userMenuName) {

                userMenuName.textContent =
                    getUserName(currentUser);

            }


            /* User email */

            if (userMenuEmail) {

                userMenuEmail.textContent =
                    currentUser.email || "";

            }


            const initials =
                getUserInitials(
                    getUserName(currentUser)
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

                    userMenuPhoto.removeAttribute("src");

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
                document.getElementById("profilePhoto");

            const profileInitials =
                document.getElementById("profileInitials");

            const profileName =
                document.getElementById("profileName");

            const profileEmail =
                document.getElementById("profileEmail");


            if (!currentUser) {
                return;
            }


            /* Profile name */

            if (profileName) {

                profileName.textContent =
                    getUserName(currentUser);

            }


            /* Profile email */

            if (profileEmail) {

                profileEmail.textContent =
                    currentUser.email || "";

            }


            const initials =
                getUserInitials(
                    getUserName(currentUser)
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

                    profilePhoto.removeAttribute("src");

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
                document.getElementById("modalProfilePhoto");

            const modalProfileInitials =
                document.getElementById("modalProfileInitials");

            const modalProfileName =
                document.getElementById("modalProfileName");

            const modalProfileEmail =
                document.getElementById("modalProfileEmail");


            if (!currentUser) {
                return;
            }


            /* Modal name */

            if (modalProfileName) {

                modalProfileName.textContent =
                    getUserName(currentUser);

            }


            /* Modal email */

            if (modalProfileEmail) {

                modalProfileEmail.textContent =
                    currentUser.email || "";

            }


            const initials =
                getUserInitials(
                    getUserName(currentUser)
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

                    modalProfilePhoto.removeAttribute("src");

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


                    /* Save original photo */

                    originalProfilePhoto =
                        currentUser.photo || "";


                    /* Fill name */

                    if (modalEditName) {

                        modalEditName.value =
                            getUserName(currentUser);

                    }


                    /* Fill email */

                    if (modalEditEmail) {

                        modalEditEmail.value =
                            currentUser.email || "";

                    }


                    /* Current photo */

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


                    /* Current initials */

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
                                    getUserName(currentUser)
                                );

                            modalEditPhotoInitials.style.display =
                                "flex";

                        }

                    }


                    /* Clear file input */

                    if (modalEditPhoto) {
                        modalEditPhoto.value = "";
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


                    reader.readAsDataURL(file);

                }
            );

        }


        /* =====================================================
           REMOVE PROFILE PHOTO
        ===================================================== */

        if (removeProfilePhoto) {

            removeProfilePhoto.addEventListener(
                "click",
                function () {

                    if (!currentUser) {
                        return;
                    }


                    Swal.fire({
                        icon: "warning",
                        title: "Remove Profile Photo?",
                        text: "Your profile photo will be removed.",
                        showCancelButton: true,
                        confirmButtonText: "Yes, Remove",
                        cancelButtonText: "Cancel",
                        position: "top",
                        customClass: {
                            container:
                                "furniro-swal-container"
                        }
                    }).then(
                        function (result) {

                            if (!result.isConfirmed) {
                                return;
                            }


                            /* Remove photo */

                            currentUser.photo = "";


                            /* Remove preview */

                            if (modalEditPhotoPreview) {

                                modalEditPhotoPreview.removeAttribute(
                                    "src"
                                );

                                modalEditPhotoPreview.style.display =
                                    "none";

                            }


                            /* Show initials */

                            if (modalEditPhotoInitials) {

                                modalEditPhotoInitials.textContent =
                                    getUserInitials(
                                        getUserName(currentUser)
                                    );

                                modalEditPhotoInitials.style.display =
                                    "flex";

                            }


                            /* Clear selected file */

                            if (modalEditPhoto) {

                                modalEditPhoto.value =
                                    "";

                            }


                            Swal.fire({
                                icon: "success",
                                title: "Photo Removed!",
                                text: "Your profile photo has been removed.",
                                confirmButtonText: "OK",
                                position: "top",
                                customClass: {
                                    container:
                                        "furniro-swal-container"
                                }
                            });

                        }
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

                    /* Restore original photo */

                    if (currentUser) {

                        currentUser.photo =
                            originalProfilePhoto;

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


                    /* Reset form */

                    if (modalProfileForm) {

                        modalProfileForm.reset();

                    }


                    /* Restore photo preview */

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


                    /* Restore initials */

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
                                    getUserName(currentUser)
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

                        Swal.fire({
                            icon: "warning",
                            title: "Invalid Name",
                            text: "Please enter your full name.",
                            confirmButtonText: "OK",
                            position: "top",
                            customClass: {
                                container:
                                    "furniro-swal-container"
                            }
                        });

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

                        Swal.fire({
                            icon: "warning",
                            title: "Invalid Email",
                            text: "Please enter a valid email.",
                            confirmButtonText: "OK",
                            position: "top",
                            customClass: {
                                container:
                                    "furniro-swal-container"
                            }
                        });

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

                        Swal.fire({
                            icon: "warning",
                            title: "Email Already Exists",
                            text: "This email is already registered.",
                            confirmButtonText: "OK",
                            position: "top",
                            customClass: {
                                container:
                                    "furniro-swal-container"
                            }
                        });

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


                        reader.readAsDataURL(file);

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


            /* Reset original photo */

            originalProfilePhoto =
                currentUser.photo || "";


            /* Success Message */

            Swal.fire({
                icon: "success",
                title: "Profile Updated!",
                text: "Profile updated successfully.",
                confirmButtonText: "OK",
                position: "top",
                customClass: {
                    container:
                        "furniro-swal-container"
                }
            });

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
                            getUserName(currentUser);

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

                        Swal.fire({
                            icon: "warning",
                            title: "Invalid Name",
                            text: "Please enter your full name.",
                            confirmButtonText: "OK",
                            position: "top",
                            customClass: {
                                container:
                                    "furniro-swal-container"
                            }
                        });

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

                        Swal.fire({
                            icon: "warning",
                            title: "Invalid Email",
                            text: "Please enter a valid email.",
                            confirmButtonText: "OK",
                            position: "top",
                            customClass: {
                                container:
                                    "furniro-swal-container"
                            }
                        });

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

                        Swal.fire({
                            icon: "warning",
                            title: "Email Already Exists",
                            text: "This email is already registered.",
                            confirmButtonText: "OK",
                            position: "top",
                            customClass: {
                                container:
                                    "furniro-swal-container"
                            }
                        });

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


                        reader.readAsDataURL(file);

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


            /* Success Message */

            Swal.fire({
                icon: "success",
                title: "Profile Updated!",
                text: "Profile updated successfully.",
                confirmButtonText: "OK",
                position: "top",
                customClass: {
                    container:
                        "furniro-swal-container"
                }
            });

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
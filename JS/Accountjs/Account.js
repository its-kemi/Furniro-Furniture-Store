
document.addEventListener("DOMContentLoaded", function () {

    // - Account elements

    const accountOpen =
        document.getElementById("accountOpen");

    const accountModal =
        document.getElementById("accountModal");

    const accountClose =
        document.getElementById("accountClose");


    // - Login and Register

    const loginForm =
        document.getElementById("modalLoginForm");

    const registerForm =
        document.getElementById("modalRegisterForm");


    // - User menu

    const userMenu =
        document.getElementById("userMenu");

    const userMenuName =
        document.getElementById("userMenuName");

    const userMenuEmail =
        document.getElementById("userMenuEmail");

    const userMenuPhoto =
        document.getElementById("userMenuPhoto");

    const logoutButton =
        document.getElementById("logoutButton");

    const myProfile =
        document.getElementById("myProfile");


    // - Profile Modal

    const profileModal =
        document.getElementById("profileModal");

    const profileModalClose =
        document.getElementById("profileModalClose");

    const modalProfilePhoto =
        document.getElementById("modalProfilePhoto");

    const modalProfileName =
        document.getElementById("modalProfileName");

    const modalProfileEmail =
        document.getElementById("modalProfileEmail");

    const modalEditProfile =
        document.getElementById("modalEditProfile");


    // - Profile Modal Edit

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

    const modalCancelEdit =
        document.getElementById("modalCancelEdit");


    // - Profile elements

    const profileSection =
        document.querySelector(".profile-section");

    const profilePhoto =
        document.getElementById("profilePhoto");

    const profileName =
        document.getElementById("profileName");

    const profileEmail =
        document.getElementById("profileEmail");

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


    // - Register inputs

    const registerNameInput =
        document.getElementById("modal-register-name");

    const registerEmailInput =
        document.getElementById("modal-register-email");

    const registerPasswordInput =
        document.getElementById("modal-register-password");

    const registerConfirmInput =
        document.getElementById("modal-register-confirm");


    // - Login inputs

    const loginEmailInput =
        document.getElementById("modal-login-email");

    const loginPasswordInput =
        document.getElementById("modal-login-password");


    // - Current user

    let currentUser =
        JSON.parse(
            localStorage.getItem("furniroCurrentUser")
        ) || null;


    // - Open account

    if (accountOpen) {

        accountOpen.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                if (currentUser) {

                    if (userMenu) {

                        userMenu.classList.toggle(
                            "active"
                        );

                    }

                    return;
                }


                if (accountModal) {

                    accountModal.classList.add(
                        "active"
                    );

                    accountModal.setAttribute(
                        "aria-hidden",
                        "false"
                    );

                    document.body.style.overflow =
                        "hidden";

                }

            }
        );

    }


    // - Close account modal

    if (accountClose) {

        accountClose.addEventListener(
            "click",
            function () {

                if (accountModal) {

                    accountModal.classList.remove(
                        "active"
                    );

                    accountModal.setAttribute(
                        "aria-hidden",
                        "true"
                    );

                }

                document.body.style.overflow =
                    "";

            }
        );

    }


    // - Register

    if (registerForm) {

        registerForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const name =
                    registerNameInput
                        ? registerNameInput.value.trim()
                        : "";


                const email =
                    registerEmailInput
                        ? registerEmailInput.value
                            .trim()
                            .toLowerCase()
                        : "";


                const password =
                    registerPasswordInput
                        ? registerPasswordInput.value
                        : "";


                const confirmPassword =
                    registerConfirmInput
                        ? registerConfirmInput.value
                        : "";


                // - Name validation

                if (name.length < 2) {

                    alert(
                        "Please enter your full name."
                    );

                    return;

                }


                // - Email validation

                if (
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
                ) {

                    alert(
                        "Please enter a valid email."
                    );

                    return;

                }


                // - Password validation

                if (password.length < 6) {

                    alert(
                        "Password must be at least 6 characters."
                    );

                    return;

                }


                // - Confirm password

                if (password !== confirmPassword) {

                    alert(
                        "Passwords do not match."
                    );

                    return;

                }


                // - Get users

                let users =
                    JSON.parse(
                        localStorage.getItem(
                            "furniroUsers"
                        )
                    ) || [];


                // - Check existing user

                const existingUser =
                    users.find(
                        function (user) {

                            return user.email === email;

                        }
                    );


                if (existingUser) {

                    alert(
                        "This email is already registered."
                    );

                    return;

                }


                // - New user

                const newUser = {

                    id: Date.now(),

                    name: name,

                    email: email,

                    password: password,

                    photo:
                        "assite/Header-images/logo.png"

                };


                // - Add user

                users.push(newUser);


                localStorage.setItem(
                    "furniroUsers",
                    JSON.stringify(users)
                );


                alert(
                    "Account created successfully!"
                );


                registerForm.reset();

            }
        );

    }


    // - Login

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const email =
                    loginEmailInput
                        ? loginEmailInput.value
                            .trim()
                            .toLowerCase()
                        : "";


                const password =
                    loginPasswordInput
                        ? loginPasswordInput.value
                        : "";


                // - Get users

                const users =
                    JSON.parse(
                        localStorage.getItem(
                            "furniroUsers"
                        )
                    ) || [];


                // - Find user

                const user =
                    users.find(
                        function (item) {

                            return item.email === email;

                        }
                    );


                if (!user) {

                    alert(
                        "No account found with this email."
                    );

                    return;

                }


                // - Check password

                if (user.password !== password) {

                    alert(
                        "Incorrect password."
                    );

                    return;

                }


                // - Current user

                currentUser = {

                    id: user.id,

                    name: user.name,

                    email: user.email,

                    photo:
                        user.photo ||
                        "assite/Header-images/logo.png"

                };


                // - Save current user

                localStorage.setItem(
                    "furniroCurrentUser",
                    JSON.stringify(currentUser)
                );


                // - Update UI

                updateUserMenu();

                updateProfile();

                updateProfileModal();


                alert(
                    "Login successful!"
                );


                loginForm.reset();


                // - Close account modal

                if (accountModal) {

                    accountModal.classList.remove(
                        "active"
                    );

                    accountModal.setAttribute(
                        "aria-hidden",
                        "true"
                    );

                }

                document.body.style.overflow =
                    "";

            }
        );

    }


    // - Update user menu

    function updateUserMenu() {

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


    // - Update profile

    function updateProfile() {

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


    // - Update profile modal

    function updateProfileModal() {

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


    // - My Profile

    if (myProfile) {

        myProfile.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                if (!currentUser) {
                    return;
                }


                // - Close User Menu

                if (userMenu) {

                    userMenu.classList.remove(
                        "active"
                    );

                }


                // - Show Profile View

                if (profileModalView) {

                    profileModalView.style.display =
                        "block";

                }


                // - Hide Edit Form

                if (profileModalEdit) {

                    profileModalEdit.classList.remove(
                        "active"
                    );

                }


                // - Update Profile Modal

                updateProfileModal();


                // - Open Profile Modal

                if (profileModal) {

                    profileModal.classList.add(
                        "active"
                    );

                }

            }
        );

    }


    // - Close Profile Modal

    if (profileModalClose) {

        profileModalClose.addEventListener(
            "click",
            function () {

                if (profileModal) {

                    profileModal.classList.remove(
                        "active"
                    );

                }


                // - Return to Profile View

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


    // - Edit Profile from Modal

    if (modalEditProfile) {

        modalEditProfile.addEventListener(
            "click",
            function () {

                if (!currentUser) {
                    return;
                }


                // - Fill Name

                if (modalEditName) {

                    modalEditName.value =
                        currentUser.name;

                }


                // - Fill Email

                if (modalEditEmail) {

                    modalEditEmail.value =
                        currentUser.email;

                }


                // - Show Current Photo

                if (modalEditPhotoPreview) {

                    modalEditPhotoPreview.src =
                        currentUser.photo ||
                        "assite/Header-images/logo.png";

                }


                // - Hide Profile View

                if (profileModalView) {

                    profileModalView.style.display =
                        "none";

                }


                // - Show Edit Form

                if (profileModalEdit) {

                    profileModalEdit.classList.add(
                        "active"
                    );

                }

            }
        );

    }


    // - Preview New Profile Photo

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

                        if (modalEditPhotoPreview) {

                            modalEditPhotoPreview.src =
                                reader.result;

                        }

                    };


                reader.readAsDataURL(file);

            }
        );

    }


    // - Cancel Modal Edit

    if (modalCancelEdit) {

        modalCancelEdit.addEventListener(
            "click",
            function () {

                // - Show Profile View

                if (profileModalView) {

                    profileModalView.style.display =
                        "block";

                }


                // - Hide Edit Form

                if (profileModalEdit) {

                    profileModalEdit.classList.remove(
                        "active"
                    );

                }


                // - Reset Edit Form

                if (modalProfileForm) {

                    modalProfileForm.reset();

                }


                // - Restore Current Photo

                if (modalEditPhotoPreview) {

                    modalEditPhotoPreview.src =
                        currentUser?.photo ||
                        "assite/Header-images/logo.png";

                }

            }
        );

    }


    // - Save Profile from Modal

    if (modalProfileForm) {

        modalProfileForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                if (!currentUser) {
                    return;
                }


                // - New Name

                const newName =
                    modalEditName
                        ? modalEditName.value.trim()
                        : "";


                // - New Email

                const newEmail =
                    modalEditEmail
                        ? modalEditEmail.value
                            .trim()
                            .toLowerCase()
                        : "";


                // - Name validation

                if (newName.length < 2) {

                    alert(
                        "Please enter your full name."
                    );

                    return;

                }


                // - Email validation

                if (
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)
                ) {

                    alert(
                        "Please enter a valid email."
                    );

                    return;

                }


                // - Get users

                const users =
                    JSON.parse(
                        localStorage.getItem(
                            "furniroUsers"
                        )
                    ) || [];


                // - Check duplicate email

                const emailExists =
                    users.find(
                        function (user) {

                            return (
                                user.email === newEmail &&
                                user.id !== currentUser.id
                            );

                        }
                    );


                if (emailExists) {

                    alert(
                        "This email is already registered."
                    );

                    return;

                }


                // - Update name and email

                currentUser.name =
                    newName;

                currentUser.email =
                    newEmail;


                // - Profile photo

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


    // - Save Modal Profile Data

    function saveModalProfile() {

        // - Save current user

        localStorage.setItem(
            "furniroCurrentUser",
            JSON.stringify(currentUser)
        );


        // - Get users

        const users =
            JSON.parse(
                localStorage.getItem(
                    "furniroUsers"
                )
            ) || [];


        // - Find current user

        const userIndex =
            users.findIndex(
                function (user) {

                    return user.id === currentUser.id;

                }
            );


        // - Update user

        if (userIndex !== -1) {

            users[userIndex].name =
                currentUser.name;

            users[userIndex].email =
                currentUser.email;

            users[userIndex].photo =
                currentUser.photo;

        }


        // - Save users

        localStorage.setItem(
            "furniroUsers",
            JSON.stringify(users)
        );


        // - Update UI

        updateUserMenu();

        updateProfile();

        updateProfileModal();


        // - Return to Profile View

        if (profileModalView) {

            profileModalView.style.display =
                "block";

        }


        // - Hide Edit Form

        if (profileModalEdit) {

            profileModalEdit.classList.remove(
                "active"
            );

        }


        // - Reset form

        if (modalProfileForm) {

            modalProfileForm.reset();

        }


        alert(
            "Profile updated successfully!"
        );

    }


    // - Edit Profile in Account.html

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


    // - Save Profile in Account.html

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


                // - Name validation

                if (newName.length < 2) {

                    alert(
                        "Please enter your full name."
                    );

                    return;

                }


                // - Email validation

                if (
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)
                ) {

                    alert(
                        "Please enter a valid email."
                    );

                    return;

                }


                // - Update current user

                currentUser.name =
                    newName;

                currentUser.email =
                    newEmail;


                // - Profile photo

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


    // - Save Profile Data in Account.html

    function saveProfile() {

        // - Save current user

        localStorage.setItem(
            "furniroCurrentUser",
            JSON.stringify(currentUser)
        );


        // - Get users

        const users =
            JSON.parse(
                localStorage.getItem(
                    "furniroUsers"
                )
            ) || [];


        // - Find current user

        const userIndex =
            users.findIndex(
                function (user) {

                    return user.id === currentUser.id;

                }
            );


        // - Update user

        if (userIndex !== -1) {

            users[userIndex].name =
                currentUser.name;

            users[userIndex].email =
                currentUser.email;

            users[userIndex].photo =
                currentUser.photo;

        }


        // - Save users

        localStorage.setItem(
            "furniroUsers",
            JSON.stringify(users)
        );


        // - Update UI

        updateUserMenu();

        updateProfile();

        updateProfileModal();


        // - Close edit form

        if (profileEdit) {

            profileEdit.classList.remove(
                "active"
            );

        }


        // - Reset form

        if (profileForm) {

            profileForm.reset();

        }


        alert(
            "Profile updated successfully!"
        );

    }


    // - Logout

    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            function () {

                // - Remove current user

                localStorage.removeItem(
                    "furniroCurrentUser"
                );


                currentUser = null;


                // - Close user menu

                if (userMenu) {

                    userMenu.classList.remove(
                        "active"
                    );

                }


                // - Close profile modal

                if (profileModal) {

                    profileModal.classList.remove(
                        "active"
                    );

                }


                // - Return Profile View

                if (profileModalView) {

                    profileModalView.style.display =
                        "block";

                }


                // - Hide Modal Edit

                if (profileModalEdit) {

                    profileModalEdit.classList.remove(
                        "active"
                    );

                }


                // - Close Account.html edit

                if (profileEdit) {

                    profileEdit.classList.remove(
                        "active"
                    );

                }


                alert(
                    "You have been logged out."
                );

            }
        );

    }


    // - Load current user

    if (currentUser) {

        updateUserMenu();

        updateProfile();

        updateProfileModal();

    }

});

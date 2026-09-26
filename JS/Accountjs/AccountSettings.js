// - Account Settings

document.addEventListener("DOMContentLoaded", function () {

    // - Current User

    const currentUser =
        JSON.parse(
            localStorage.getItem("furniroCurrentUser")
        );


    // - Settings Elements

    const settingsProfileForm =
        document.getElementById(
            "settingsProfileForm"
        );

    const settingsName =
        document.getElementById(
            "settings-name"
        );

    const settingsEmail =
        document.getElementById(
            "settings-email"
        );


    const settingsPasswordForm =
        document.getElementById(
            "settingsPasswordForm"
        );

    const currentPassword =
        document.getElementById(
            "current-password"
        );

    const newPassword =
        document.getElementById(
            "new-password"
        );

    const confirmPassword =
        document.getElementById(
            "confirm-password"
        );


    const settingsLogoutButton =
        document.getElementById(
            "settingsLogoutButton"
        );


    // - Check Login

    if (!currentUser) {

        if (settingsName) {
            settingsName.value = "";
        }

        if (settingsEmail) {
            settingsEmail.value = "";
        }

        return;
    }


    // - Show Current User Information

    if (settingsName) {

        settingsName.value =
            currentUser.name || "";
    }


    if (settingsEmail) {

        settingsEmail.value =
            currentUser.email || "";
    }


    // - Save Personal Information

    if (settingsProfileForm) {

        settingsProfileForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const name =
                    settingsName.value.trim();

                const email =
                    settingsEmail.value
                        .trim()
                        .toLowerCase();


                // - Check Name

                if (!name) {

                    alert(
                        "Please enter your full name."
                    );

                    return;
                }


                // - Check Email

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (!emailPattern.test(email)) {

                    alert(
                        "Please enter a valid email address."
                    );

                    return;
                }


                // - Get Users

                const users =
                    JSON.parse(
                        localStorage.getItem(
                            "furniroUsers"
                        )
                    ) || [];


                // - Check Duplicate Email

                const emailExists =
                    users.some(function (user) {

                        return (
                            user.email === email &&
                            user.email !== currentUser.email
                        );

                    });


                if (emailExists) {

                    alert(
                        "This email is already in use."
                    );

                    return;
                }


                // - Update Current User

                currentUser.name = name;

                currentUser.email = email;


                // - Update Users Array

                const updatedUsers =
                    users.map(function (user) {

                        if (
                            user.email ===
                            currentUser.email
                        ) {

                            return currentUser;
                        }

                        return user;
                    });


                // - Save Current User

                localStorage.setItem(
                    "furniroCurrentUser",
                    JSON.stringify(currentUser)
                );


                // - Save Users

                localStorage.setItem(
                    "furniroUsers",
                    JSON.stringify(updatedUsers)
                );


                alert(
                    "Your personal information has been updated."
                );

            }
        );

    }


    // - Change Password

    if (settingsPasswordForm) {

        settingsPasswordForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const oldPassword =
                    currentPassword.value;

                const password =
                    newPassword.value;

                const confirm =
                    confirmPassword.value;


                // - Check Current Password

                if (
                    oldPassword !==
                    currentUser.password
                ) {

                    alert(
                        "Current password is incorrect."
                    );

                    return;
                }


                // - Check New Password

                if (password.length < 6) {

                    alert(
                        "New password must be at least 6 characters."
                    );

                    return;
                }


                // - Check Confirm Password

                if (password !== confirm) {

                    alert(
                        "New passwords do not match."
                    );

                    return;
                }


                // - Update Password

                currentUser.password =
                    password;


                // - Get Users

                const users =
                    JSON.parse(
                        localStorage.getItem(
                            "furniroUsers"
                        )
                    ) || [];


                // - Update User

                const updatedUsers =
                    users.map(function (user) {

                        if (
                            user.email ===
                            currentUser.email
                        ) {

                            return currentUser;
                        }

                        return user;
                    });


                // - Save Current User

                localStorage.setItem(
                    "furniroCurrentUser",
                    JSON.stringify(currentUser)
                );


                // - Save Users

                localStorage.setItem(
                    "furniroUsers",
                    JSON.stringify(updatedUsers)
                );


                // - Clear Password Fields

                currentPassword.value = "";

                newPassword.value = "";

                confirmPassword.value = "";


                alert(
                    "Your password has been updated."
                );

            }
        );

    }


    // - Logout

    if (settingsLogoutButton) {

        settingsLogoutButton.addEventListener(
            "click",
            function () {

                const confirmLogout =
                    confirm(
                        "Are you sure you want to logout?"
                    );


                if (!confirmLogout) {
                    return;
                }


                // - Remove Current User

                localStorage.removeItem(
                    "furniroCurrentUser"
                );


                // - Go Home

                window.location.href =
                    "index.html";

            }
        );

    }

});
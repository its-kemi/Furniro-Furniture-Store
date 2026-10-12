
/*
   ACCOUNT SETTINGS PASSWORD
   Password Hashing with PBKDF2
*/

document.addEventListener("DOMContentLoaded", function () {

    const settingsPasswordForm =
        document.getElementById("settingsPasswordForm");

    const currentPassword =
        document.getElementById("current-password");

    const newPassword =
        document.getElementById("new-password");

    const confirmPassword =
        document.getElementById("confirm-password");


    /* CHECK FORM */

    if (
        !settingsPasswordForm ||
        !currentPassword ||
        !newPassword ||
        !confirmPassword
    ) {
        return;
    }


    /* GET CURRENT USER */

    let currentUser;

    try {
        currentUser = JSON.parse(
            localStorage.getItem("furniroCurrentUser")
        );
    } catch (error) {
        currentUser = null;
    }

    if (!currentUser) {
        return;
    }


    /* CHECK PASSWORD UTILITY */

    if (
        !window.FurniroPassword ||
        typeof window.FurniroPassword.createPasswordHash !== "function" ||
        typeof window.FurniroPassword.verifyPassword !== "function"
    ) {
        console.error(
            "Password-Utils.js is missing or loaded incorrectly."
        );
        return;
    }


    /* CHANGE PASSWORD */

    settingsPasswordForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            const oldPassword = currentPassword.value;
            const password = newPassword.value;
            const confirm = confirmPassword.value;


            /* VALIDATE NEW PASSWORD */

            if (password.length < 6) {
                await Swal.fire({
                    icon: "warning",
                    title: "Password Too Short",
                    text: "New password must be at least 6 characters.",
                    confirmButtonText: "OK",
                    position: "top",
                    customClass: {
                        container: "furniro-swal-container"
                    }
                });

                return;
            }


            if (password !== confirm) {
                await Swal.fire({
                    icon: "warning",
                    title: "Passwords Do Not Match",
                    text: "New passwords do not match.",
                    confirmButtonText: "OK",
                    position: "top",
                    customClass: {
                        container: "furniro-swal-container"
                    }
                });

                return;
            }


            if (oldPassword === password) {
                await Swal.fire({
                    icon: "warning",
                    title: "Same Password",
                    text: "Please choose a different new password.",
                    confirmButtonText: "OK"
                });

                return;
            }


            /* GET USERS */

            let users;

            try {
                users = JSON.parse(
                    localStorage.getItem("furniroUsers")
                ) || [];

                if (!Array.isArray(users)) {
                    throw new Error("Invalid users data.");
                }
            } catch (error) {
                await Swal.fire({
                    icon: "error",
                    title: "Storage Error",
                    text: "Unable to read registered accounts."
                });

                return;
            }


            /* FIND USER */

            const userIndex = users.findIndex(function (user) {
                return user.id === currentUser.id;
            });

            if (userIndex === -1) {
                await Swal.fire({
                    icon: "error",
                    title: "User Not Found",
                    text: "User account not found."
                });

                return;
            }

            const user = users[userIndex];


            /* CHECK STORED HASH */

            if (!user.passwordHash || !user.passwordSalt) {
                await Swal.fire({
                    icon: "error",
                    title: "Password Format Error",
                    text:
                        "This account does not have a supported hashed password. Please register a new test account."
                });

                return;
            }


            /* VERIFY CURRENT PASSWORD */

            let isCurrentPasswordValid = false;

            try {
                isCurrentPasswordValid =
                    await window.FurniroPassword.verifyPassword(
                        oldPassword,
                        user.passwordSalt,
                        user.passwordHash
                    );
            } catch (error) {
                console.error(
                    "Password verification error:",
                    error
                );

                await Swal.fire({
                    icon: "error",
                    title: "Verification Failed",
                    text: "Unable to verify your current password."
                });

                return;
            }

            if (!isCurrentPasswordValid) {
                await Swal.fire({
                    icon: "warning",
                    title: "Incorrect Password",
                    text: "Current password is incorrect."
                });

                return;
            }


            /* CREATE NEW PASSWORD HASH */

            try {
                const result =
                    await window.FurniroPassword.createPasswordHash(
                        password
                    );

                if (
                    !result ||
                    !result.passwordSalt ||
                    !result.passwordHash
                ) {
                    throw new Error(
                        "Password utility returned an invalid result."
                    );
                }


                /* UPDATE PASSWORD HASH AND SALT */

                users[userIndex].passwordSalt =
                    result.passwordSalt;

                users[userIndex].passwordHash =
                    result.passwordHash;


                /* REMOVE OLD PLAIN-TEXT PASSWORD */

                delete users[userIndex].password;


                /* SAVE USERS */

                localStorage.setItem(
                    "furniroUsers",
                    JSON.stringify(users)
                );


                /* CLEAR FIELDS */

                currentPassword.value = "";
                newPassword.value = "";
                confirmPassword.value = "";


                /* SUCCESS */

                await Swal.fire({
                    icon: "success",
                    title: "Password Updated!",
                    text:
                        "Your password has been updated successfully.",
                    confirmButtonText: "OK",
                    position: "top",
                    customClass: {
                        container: "furniro-swal-container"
                    }
                });

            } catch (error) {
                console.error(
                    "Password update error:",
                    error
                );

                await Swal.fire({
                    icon: "error",
                    title: "Update Failed",
                    text:
                        "Password could not be updated. Please try again."
                });
            }
        }
    );
});

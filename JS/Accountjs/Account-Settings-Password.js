/* 
   ACCOUNT SETTINGS PASSWORD
*/

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /*
           Settings Password elements
        */

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


        /*
           Get current user
        */

        const currentUser =
            JSON.parse(
                localStorage.getItem(
                    "furniroCurrentUser"
                )
            );


        /*
           Check Login
        */

        if (!currentUser) {
            return;
        }


        /*
           Change Password
        */

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


                    /*
                       Get Users
                    */

                    const users =
                        JSON.parse(
                            localStorage.getItem(
                                "furniroUsers"
                            )
                        ) || [];


                    /*
                       Find Current User
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


                    if (userIndex === -1) {

                        Swal.fire({
                            icon: "error",
                            title: "User Not Found",
                            text: "User account not found.",
                            confirmButtonText: "OK",
                            position: "top",
                            customClass: {
                                container:
                                    "furniro-swal-container"
                            }
                        });

                        return;
                    }


                    /*
                       Get Full User
                    */

                    const user =
                        users[userIndex];


                    /*
                       Check Current Password
                    */

                    if (
                        oldPassword !==
                        user.password
                    ) {

                        Swal.fire({
                            icon: "warning",
                            title: "Incorrect Password",
                            text: "Current password is incorrect.",
                            confirmButtonText: "OK",
                            position: "top",
                            customClass: {
                                container:
                                    "furniro-swal-container"
                            }
                        });

                        return;
                    }


                    /*
                       Check New Password
                    */

                    if (
                        password.length < 6
                    ) {

                        Swal.fire({
                            icon: "warning",
                            title: "Password Too Short",
                            text: "New password must be at least 6 characters.",
                            confirmButtonText: "OK",
                            position: "top",
                            customClass: {
                                container:
                                    "furniro-swal-container"
                            }
                        });

                        return;
                    }


                    /*
                       Check Confirm Password
                    */

                    if (
                        password !==
                        confirm
                    ) {

                        Swal.fire({
                            icon: "warning",
                            title: "Passwords Do Not Match",
                            text: "New passwords do not match.",
                            confirmButtonText: "OK",
                            position: "top",
                            customClass: {
                                container:
                                    "furniro-swal-container"
                            }
                        });

                        return;
                    }


                    /*
                       Update Password
                    */

                    users[userIndex].password =
                        password;


                    /*
                       Save Users
                    */

                    localStorage.setItem(
                        "furniroUsers",
                        JSON.stringify(
                            users
                        )
                    );


                    /*
                       Clear Password Fields
                    */

                    currentPassword.value =
                        "";

                    newPassword.value =
                        "";

                    confirmPassword.value =
                        "";


                    /*
                       Success Message
                    */

                    Swal.fire({
                        icon: "success",
                        title: "Password Updated!",
                        text: "Your password has been updated successfully.",
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

    }
);
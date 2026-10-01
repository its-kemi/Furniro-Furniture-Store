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

                        alert(
                            "User account not found."
                        );

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

                        alert(
                            "Current password is incorrect."
                        );

                        return;
                    }


                    /* 
                       Check New Password
                     */

                    if (
                        password.length < 6
                    ) {

                        alert(
                            "New password must be at least 6 characters."
                        );

                        return;
                    }


                    /* 
                       Check Confirm Password
                     */

                    if (
                        password !==
                        confirm
                    ) {

                        alert(
                            "New passwords do not match."
                        );

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


                    alert(
                        "Your password has been updated."
                    );

                }
            );

        }

    }
);
/* 
   ACCOUNT SETTINGS PROFILE
*/

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /*
           Settings Profile elements
        */

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

            if (settingsName) {
                settingsName.value = "";
            }

            if (settingsEmail) {
                settingsEmail.value = "";
            }

            return;
        }


        /*
           Show Current User Information
        */

        if (settingsName) {

            settingsName.value =
                currentUser.name || "";

        }

        if (settingsEmail) {

            settingsEmail.value =
                currentUser.email || "";

        }


        /*
           Save Personal Information
        */

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


                    /*
                       Check Name
                    */

                    if (!name) {

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


                    /*
                       Check Email
                    */

                    const emailPattern =
                        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                    if (
                        !emailPattern.test(
                            email
                        )
                    ) {

                        Swal.fire({
                            icon: "warning",
                            title: "Invalid Email",
                            text: "Please enter a valid email address.",
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
                       Get Users
                    */

                    const users =
                        JSON.parse(
                            localStorage.getItem(
                                "furniroUsers"
                            )
                        ) || [];


                    /*
                       Check Duplicate Email
                    */

                    const emailExists =
                        users.some(
                            function (user) {

                                return (
                                    user.email ===
                                        email &&
                                    user.id !==
                                        currentUser.id
                                );

                            }
                        );


                    if (emailExists) {

                        Swal.fire({
                            icon: "warning",
                            title: "Email Already in Use",
                            text: "This email is already in use.",
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
                       Update Current User
                    */

                    currentUser.name =
                        name;

                    currentUser.email =
                        email;


                    /*
                       Update Users Array
                    */

                    const updatedUsers =
                        users.map(
                            function (user) {

                                if (
                                    user.id ===
                                    currentUser.id
                                ) {

                                    return {
                                        ...user,
                                        name:
                                            currentUser.name,
                                        email:
                                            currentUser.email
                                    };

                                }

                                return user;

                            }
                        );


                    /*
                       Save Current User
                    */

                    localStorage.setItem(
                        "furniroCurrentUser",
                        JSON.stringify(
                            currentUser
                        )
                    );


                    /*
                       Save Users
                    */

                    localStorage.setItem(
                        "furniroUsers",
                        JSON.stringify(
                            updatedUsers
                        )
                    );


                    /*
                       Success Message
                    */

                    Swal.fire({
                        icon: "success",
                        title: "Profile Updated!",
                        text: "Your personal information has been updated successfully.",
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
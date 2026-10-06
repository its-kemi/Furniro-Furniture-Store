/* 
   ACCOUNT SETTINGS LOGOUT
*/

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /*
           Settings Logout
        */

        const settingsLogoutButton =
            document.getElementById(
                "settingsLogoutButton"
            );


        /*
           Logout
        */

        if (settingsLogoutButton) {

            settingsLogoutButton.addEventListener(
                "click",
                function () {

                    Swal.fire({
                        icon: "warning",
                        title: "Logout?",
                        text: "Are you sure you want to logout?",
                        showCancelButton: true,
                        confirmButtonText: "Yes, Logout",
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


                            /*
                               Remove Current User
                            */

                            localStorage.removeItem(
                                "furniroCurrentUser"
                            );


                            /*
                               Go Home
                            */

                            window.location.href =
                                "index.html";

                        }
                    );

                }
            );

        }

    }
);
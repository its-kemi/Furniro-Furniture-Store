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

                    const confirmLogout =
                        confirm(
                            "Are you sure you want to logout?"
                        );


                    if (!confirmLogout) {
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

    }
);
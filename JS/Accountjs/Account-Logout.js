/* 
   ACCOUNT LOGOUT
 */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /* 
           Logout elements
         */

        const logoutButton =
            document.getElementById(
                "logoutButton"
            );

        const userMenu =
            document.getElementById(
                "userMenu"
            );

        const profileModal =
            document.getElementById(
                "profileModal"
            );

        const profileModalView =
            document.getElementById(
                "profileModalView"
            );

        const profileModalEdit =
            document.getElementById(
                "profileModalEdit"
            );

        const profileEdit =
            document.getElementById(
                "profileEdit"
            );


        /* 
           Logout
         */

        if (logoutButton) {

            logoutButton.addEventListener(
                "click",
                function () {

                    /* 
                       Remove current user
                     */

                    localStorage.removeItem(
                        "furniroCurrentUser"
                    );


                    /* 
                       Close User Menu
                     */

                    if (userMenu) {

                        userMenu.classList.remove(
                            "active"
                        );

                    }


                    /* 
                       Close Profile Modal
                     */

                    if (profileModal) {

                        profileModal.classList.remove(
                            "active"
                        );

                    }


                    /* 
                       Return Profile View
                     */

                    if (profileModalView) {

                        profileModalView.style.display =
                            "block";

                    }


                    /* 
                       Hide Profile Modal Edit
                     */

                    if (profileModalEdit) {

                        profileModalEdit.classList.remove(
                            "active"
                        );

                    }


                    /* 
                       Close Account.html Edit
                     */

                    if (profileEdit) {

                        profileEdit.classList.remove(
                            "active"
                        );

                    }


                    /* 
                       Success message
                     */

                    alert(
                        "You have been logged out."
                    );

                }
            );

        }

    }
);
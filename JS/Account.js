document.addEventListener("DOMContentLoaded", function () {

    const accountOpen =
        document.getElementById("accountOpen");

    const accountModal =
        document.getElementById("accountModal");

    const accountClose =
        document.getElementById("accountClose");


    console.log("Account Open:", accountOpen);
    console.log("Account Modal:", accountModal);
    console.log("Account Close:", accountClose);


    // ================= OPEN ACCOUNT =================

    if (accountOpen && accountModal) {

        accountOpen.addEventListener("click", function (event) {

            event.preventDefault();

            console.log("ACCOUNT CLICKED");

            accountModal.classList.add("active");

            accountModal.setAttribute(
                "aria-hidden",
                "false"
            );

            document.body.style.overflow = "hidden";

        });

    }


    // ================= CLOSE ACCOUNT =================

    if (accountClose && accountModal) {

        accountClose.addEventListener("click", function () {

            console.log("ACCOUNT CLOSED");

            accountModal.classList.remove("active");

            accountModal.setAttribute(
                "aria-hidden",
                "true"
            );

            document.body.style.overflow = "";

        });

    }


    // ================= CLOSE BY OUTSIDE CLICK =================

    if (accountModal) {

        accountModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === accountModal
                ) {

                    accountModal.classList.remove(
                        "active"
                    );

                    accountModal.setAttribute(
                        "aria-hidden",
                        "true"
                    );

                    document.body.style.overflow = "";

                }

            }
        );

    }


    // ================= ESCAPE =================

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                accountModal
            ) {

                accountModal.classList.remove(
                    "active"
                );

                accountModal.setAttribute(
                    "aria-hidden",
                    "true"
                );

                document.body.style.overflow = "";

            }

        }
    );

});
document.addEventListener("DOMContentLoaded", function () {

    // - Showroom button

    const showroomButton =
        document.querySelector(
            "#showroomContactButton"
        );

    const contactForm =
        document.querySelector(
            "#contactForm"
        );

    // - Check elements

    if (
        !showroomButton ||
        !contactForm
    ) {
        return;
    }

    // - Button click

    showroomButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            // - Smooth scroll to form

            contactForm.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            // - Focus name input

            setTimeout(
                function () {

                    const nameInput =
                        document.querySelector(
                            "#name"
                        );

                    if (nameInput) {

                        nameInput.focus();

                    }

                },
                700
            );

        }
    );

});
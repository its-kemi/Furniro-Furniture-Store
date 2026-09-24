document.addEventListener("DOMContentLoaded", function () {

    // - Contact form

    const contactForm =
        document.querySelector(
            "#contactForm"
        );

    const formMessage =
        document.querySelector(
            "#formMessage"
        );

    // - Check form

    if (!contactForm) {
        return;
    }

    // - Submit form

    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            // - Form inputs

            const name =
                document.querySelector(
                    "#name"
                );

            const email =
                document.querySelector(
                    "#email"
                );

            const message =
                document.querySelector(
                    "#message"
                );

            // - Check inputs

            if (
                !name ||
                !email ||
                !message
            ) {
                return;
            }

            // - Get values

            const nameValue =
                name.value.trim();

            const emailValue =
                email.value.trim();

            const messageValue =
                message.value.trim();

            // - Check name

            if (nameValue === "") {

                showFormMessage(
                    "Please enter your name.",
                    "error"
                );

                name.focus();

                return;
            }

            // - Check email

            if (emailValue === "") {

                showFormMessage(
                    "Please enter your email address.",
                    "error"
                );

                email.focus();

                return;
            }

            // - Email pattern

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (
                !emailPattern.test(
                    emailValue
                )
            ) {

                showFormMessage(
                    "Please enter a valid email address.",
                    "error"
                );

                email.focus();

                return;
            }

            // - Check message

            if (messageValue === "") {

                showFormMessage(
                    "Please write your message.",
                    "error"
                );

                message.focus();

                return;
            }

            // - Success

            showFormMessage(
                "Thank you, " +
                nameValue +
                "! Your message has been submitted successfully.",
                "success"
            );

            // - Clear form

            contactForm.reset();

        }
    );

    // - Form message

    function showFormMessage(
        text,
        type
    ) {

        if (!formMessage) {
            return;
        }

        formMessage.textContent =
            text;

        formMessage.className =
            "form-message show " +
            type;
    }

});
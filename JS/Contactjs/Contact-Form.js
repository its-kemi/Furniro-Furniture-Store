document.addEventListener("DOMContentLoaded", function () {

    // - Contact form

    const contactForm =
        document.querySelector(
            "#contactForm"
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

                Swal.fire({
                    icon: "warning",
                    title: "Name Required",
                    text: "Please enter your name.",
                    confirmButtonText: "OK",
                    position: "top",
                    customClass: {
                        container:
                            "furniro-swal-container"
                    }
                });

                name.focus();

                return;
            }

            // - Check email

            if (emailValue === "") {

                Swal.fire({
                    icon: "warning",
                    title: "Email Required",
                    text: "Please enter your email address.",
                    confirmButtonText: "OK",
                    position: "top",
                    customClass: {
                        container:
                            "furniro-swal-container"
                    }
                });

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

                email.focus();

                return;
            }

            // - Check message

            if (messageValue === "") {

                Swal.fire({
                    icon: "warning",
                    title: "Message Required",
                    text: "Please write your message.",
                    confirmButtonText: "OK",
                    position: "top",
                    customClass: {
                        container:
                            "furniro-swal-container"
                    }
                });

                message.focus();

                return;
            }

            // - Success

            Swal.fire({
                icon: "success",
                title: "Message Submitted!",
                text:
                    "Thank you, " +
                    nameValue +
                    "! Your message has been submitted successfully.",
                confirmButtonText: "OK",
                position: "top",
                customClass: {
                    container:
                        "furniro-swal-container"
                }
            });

            // - Clear form

            contactForm.reset();

        }
    );

});
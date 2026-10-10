
document.addEventListener("DOMContentLoaded", function () {

    // =====================================================
    // CONTACT FORM
    // =====================================================

    const contactForm = document.querySelector("#contactForm");

    if (!contactForm) {
        return;
    }

    // =====================================================
    // FORM INPUTS
    // =====================================================

    const name = document.querySelector("#name");
    const email = document.querySelector("#email");
    const message = document.querySelector("#message");

    if (!name || !email || !message) {
        return;
    }

    // =====================================================
    // GET LOGGED-IN USER
    // =====================================================

    let currentUser = null;

    try {
        currentUser = JSON.parse(
            localStorage.getItem("furniroCurrentUser")
        );
    } catch (error) {
        console.error("Unable to read current user:", error);
    }

    // =====================================================
    // AUTO-FILL NAME AND EMAIL
    // =====================================================

    if (currentUser) {

        const userName =
            currentUser.name ||
            currentUser.fullName ||
            currentUser.username ||
            "";

        const userEmail =
            currentUser.email || "";

        if (userName) {
            name.value = userName;
        }

        if (userEmail) {
            email.value = userEmail;
        }

        // Prevent editing account information
        if (userName) {
            name.readOnly = true;
        }

        if (userEmail) {
            email.readOnly = true;
        }
    }

    // =====================================================
    // SUBMIT CONTACT FORM
    // =====================================================

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        // Get input values
        const nameValue = name.value.trim();
        const emailValue = email.value.trim();
        const messageValue = message.value.trim();

        // =================================================
        // VALIDATE NAME
        // =================================================

        if (nameValue === "") {

            Swal.fire({
                icon: "warning",
                title: "Name Required",
                text: "Please enter your name.",
                confirmButtonText: "OK",
                position: "top",
                customClass: {
                    container: "furniro-swal-container"
                }
            });

            name.focus();
            return;
        }

        // =================================================
        // VALIDATE EMAIL
        // =================================================

        if (emailValue === "") {

            Swal.fire({
                icon: "warning",
                title: "Email Required",
                text: "Please enter your email address.",
                confirmButtonText: "OK",
                position: "top",
                customClass: {
                    container: "furniro-swal-container"
                }
            });

            email.focus();
            return;
        }

        // Email format
        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(emailValue)) {

            Swal.fire({
                icon: "warning",
                title: "Invalid Email",
                text: "Please enter a valid email address.",
                confirmButtonText: "OK",
                position: "top",
                customClass: {
                    container: "furniro-swal-container"
                }
            });

            email.focus();
            return;
        }

        // =================================================
        // VALIDATE MESSAGE
        // =================================================

        if (messageValue === "") {

            Swal.fire({
                icon: "warning",
                title: "Message Required",
                text: "Please write your message.",
                confirmButtonText: "OK",
                position: "top",
                customClass: {
                    container: "furniro-swal-container"
                }
            });

            message.focus();
            return;
        }

        // =================================================
        // CREATE MESSAGE OBJECT
        // =================================================

        const newMessage = {
            id: Date.now(),
            name: nameValue,
            email: emailValue,
            message: messageValue,
            date: new Date().toISOString()
        };

        // =================================================
        // SAVE MESSAGE TO LOCAL STORAGE
        // =================================================

        try {

            const storedMessages = localStorage.getItem(
                "furniroContactMessages"
            );

            const savedMessages = storedMessages
                ? JSON.parse(storedMessages)
                : [];

            if (!Array.isArray(savedMessages)) {
                throw new Error("Invalid saved messages data.");
            }

            savedMessages.push(newMessage);

            localStorage.setItem(
                "furniroContactMessages",
                JSON.stringify(savedMessages)
            );

            // =============================================
            // SUCCESS MESSAGE
            // =============================================

            Swal.fire({
                icon: "success",
                title: "Message Saved!",
                text:
                    "Thank you, " +
                    nameValue +
                    "! Your message has been saved successfully.",
                confirmButtonText: "OK",
                position: "top",
                customClass: {
                    container: "furniro-swal-container"
                }
            });

            // =============================================
            // RESET FORM
            // =============================================

            contactForm.reset();

            // Restore logged-in user's information
            if (currentUser) {

                const userName =
                    currentUser.name ||
                    currentUser.fullName ||
                    currentUser.username ||
                    "";

                const userEmail =
                    currentUser.email || "";

                if (userName) {
                    name.value = userName;
                }

                if (userEmail) {
                    email.value = userEmail;
                }
            }

        } catch (error) {

            console.error(
                "Contact form storage error:",
                error
            );

            Swal.fire({
                icon: "error",
                title: "Unable to Save",
                text:
                    "Your message could not be saved. Please try again.",
                confirmButtonText: "OK",
                position: "top",
                customClass: {
                    container: "furniro-swal-container"
                }
            });
        }

    });

});

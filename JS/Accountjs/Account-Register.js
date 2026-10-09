
/*
   ACCOUNT REGISTER
   Password Hashing with PBKDF2
*/

document.addEventListener("DOMContentLoaded", function () {

    /*
       Register elements
    */

    const registerForm =
        document.getElementById("modalRegisterForm");

    const registerNameInput =
        document.getElementById("modal-register-name");

    const registerEmailInput =
        document.getElementById("modal-register-email");

    const registerPasswordInput =
        document.getElementById("modal-register-password");

    const registerConfirmInput =
        document.getElementById("modal-register-confirm");


    /*
       Account Modal
    */

    const accountModal =
        document.getElementById("accountModal");


    /*
       Create message element
    */

    function createMessage(input, type, message) {

        if (!input) {
            return;
        }

        let messageElement =
            input.parentElement.querySelector(
                `[data-message-for="${input.id}"]`
            );

        if (!messageElement) {

            messageElement = document.createElement("small");

            messageElement.dataset.messageFor = input.id;

            messageElement.className = "account-form-message";

            input.insertAdjacentElement(
                "afterend",
                messageElement
            );

        }

        messageElement.classList.remove("error", "success");

        messageElement.classList.add(type);

        messageElement.textContent = message;

    }


    /*
       Clear input message
    */

    function clearMessage(input) {

        if (!input) {
            return;
        }

        const messageElement =
            input.parentElement.querySelector(
                `[data-message-for="${input.id}"]`
            );

        if (messageElement) {

            messageElement.textContent = "";

            messageElement.classList.remove("error", "success");

        }

    }


    /*
       Clear messages while typing
    */

    [
        registerNameInput,
        registerEmailInput,
        registerPasswordInput,
        registerConfirmInput
    ].forEach(function (input) {

        if (input) {

            input.addEventListener("input", function () {

                clearMessage(input);

            });

        }

    });


    /*
       Register
    */

    if (registerForm) {

        registerForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                /*
                   Clear old messages
                */

                [
                    registerNameInput,
                    registerEmailInput,
                    registerPasswordInput,
                    registerConfirmInput
                ].forEach(clearMessage);


                /*
                   Get register information
                */

                const name = registerNameInput
                    ? registerNameInput.value.trim()
                    : "";

                const email = registerEmailInput
                    ? registerEmailInput.value.trim().toLowerCase()
                    : "";

                const password = registerPasswordInput
                    ? registerPasswordInput.value
                    : "";

                const confirmPassword = registerConfirmInput
                    ? registerConfirmInput.value
                    : "";


                /*
                   Name validation
                */

                if (name.length < 2) {

                    createMessage(
                        registerNameInput,
                        "error",
                        "Please enter your full name."
                    );

                    registerNameInput.focus();

                    return;

                }


                /*
                   Email validation
                */

                if (!email) {

                    createMessage(
                        registerEmailInput,
                        "error",
                        "Please enter your email address."
                    );

                    registerEmailInput.focus();

                    return;

                }


                /*
                   Email format validation
                */

                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {

                    createMessage(
                        registerEmailInput,
                        "error",
                        "Please enter a valid email address."
                    );

                    registerEmailInput.focus();

                    return;

                }


                /*
                   Password validation
                */

                if (!password) {

                    createMessage(
                        registerPasswordInput,
                        "error",
                        "Please create a password."
                    );

                    registerPasswordInput.focus();

                    return;

                }


                /*
                   Password length
                */

                if (password.length < 6) {

                    createMessage(
                        registerPasswordInput,
                        "error",
                        "Password must be at least 6 characters."
                    );

                    registerPasswordInput.focus();

                    return;

                }


                /*
                   Confirm password
                */

                if (!confirmPassword) {

                    createMessage(
                        registerConfirmInput,
                        "error",
                        "Please confirm your password."
                    );

                    registerConfirmInput.focus();

                    return;

                }


                /*
                   Password match
                */

                if (password !== confirmPassword) {

                    createMessage(
                        registerConfirmInput,
                        "error",
                        "Passwords do not match."
                    );

                    registerConfirmInput.focus();

                    return;

                }


                /*
                   Check password utility
                */

                if (
                    !window.FurniroPassword ||
                    typeof window.FurniroPassword.createPasswordHash !==
                        "function"
                ) {

                    Swal.fire({
                        icon: "error",
                        title: "Security Utility Missing",
                        text: "Please check Password-Utils.js and its script order."
                    });

                    return;

                }


                /*
                   Get existing users
                */

                let users = [];

                try {

                    users = JSON.parse(
                        localStorage.getItem("furniroUsers")
                    ) || [];

                    if (!Array.isArray(users)) {
                        throw new Error("Invalid users data.");
                    }

                } catch (error) {

                    Swal.fire({
                        icon: "error",
                        title: "Storage Error",
                        text: "Unable to read registered accounts."
                    });

                    return;

                }


                /*
                   Check existing email
                */

                const existingUser = users.find(function (user) {

                    return (
                        user.email &&
                        user.email.toLowerCase() === email
                    );

                });


                /*
                   Email already exists
                */

                if (existingUser) {

                    createMessage(
                        registerEmailInput,
                        "error",
                        "This email is already registered."
                    );

                    registerEmailInput.focus();

                    return;

                }


                /*
                   Disable submit button during hashing
                */

                const submitButton =
                    registerForm.querySelector(
                        'button[type="submit"], input[type="submit"]'
                    );

                if (submitButton) {
                    submitButton.disabled = true;
                }


                try {

                    /*
                       Create password hash and salt
                    */

                    const passwordData =
                        await window.FurniroPassword.createPasswordHash(
                            password
                        );


                    /*
                       Create new user
                       Never save the plain password
                    */

                    const newUser = {

                        id: Date.now(),

                        name: name,

                        email: email,

                        passwordHash:
                            passwordData.passwordHash,

                        passwordSalt:
                            passwordData.passwordSalt,

                        photo:
                            ""

                    };


                    /*
                       Save user
                    */

                    users.push(newUser);

                    localStorage.setItem(
                        "furniroUsers",
                        JSON.stringify(users)
                    );


                    /*
                       Current user
                       Do not include password or hash
                    */

                    const currentUser = {

                        id: newUser.id,

                        name: newUser.name,

                        email: newUser.email,

                        photo: newUser.photo

                    };


                    /*
                       Save current user
                    */

                    localStorage.setItem(
                        "furniroCurrentUser",
                        JSON.stringify(currentUser)
                    );


                    /*
                       Success message
                    */

                    await Swal.fire({

                        icon: "success",

                        title: "Account Created!",

                        text: "Welcome to Furniro.",

                        confirmButtonText: "OK",

                        position: "top",

                        customClass: {
                            container: "furniro-swal-container"
                        }

                    });


                    /*
                       Reset form
                    */

                    registerForm.reset();


                    /*
                       Keep account modal open
                    */

                    if (accountModal) {

                        accountModal.classList.add("active");

                        accountModal.setAttribute(
                            "aria-hidden",
                            "false"
                        );

                    }

                    document.body.style.overflow = "hidden";


                } catch (error) {

                    console.error(
                        "Registration error:",
                        error
                    );

                    Swal.fire({
                        icon: "error",
                        title: "Registration Failed",
                        text: "Your account could not be saved. Please try again."
                    });

                } finally {

                    /*
                       Enable submit button again
                    */

                    if (submitButton) {
                        submitButton.disabled = false;
                    }

                }

            }
        );

    }

});
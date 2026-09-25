document.addEventListener("DOMContentLoaded", function () {

    // - Account elements

    const accountOpen =
        document.getElementById("accountOpen");

    const accountModal =
        document.getElementById("accountModal");

    const accountClose =
        document.getElementById("accountClose");


    // - Forms

    const loginForm =
        document.getElementById("loginForm");

    const registerForm =
        document.getElementById("registerForm");

    const modalLoginForm =
        document.getElementById("modalLoginForm");

    const modalRegisterForm =
        document.getElementById("modalRegisterForm");


    // - Check modal

    if (!accountModal) {
        return;
    }


    // - Users

    let users =
        JSON.parse(
            localStorage.getItem("furniroUsers")
        ) || [];


    // - Current user

    let currentUser =
        JSON.parse(
            localStorage.getItem("furniroCurrentUser")
        ) || null;


    // - Open account

    if (accountOpen) {

        accountOpen.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                accountModal.classList.add(
                    "active"
                );

                accountModal.setAttribute(
                    "aria-hidden",
                    "false"
                );

                document.body.style.overflow =
                    "hidden";

            }
        );

    }


    // - Close account

    function closeAccount() {

        accountModal.classList.remove(
            "active"
        );

        accountModal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow =
            "";

    }


    // - Close button

    if (accountClose) {

        accountClose.addEventListener(
            "click",
            closeAccount
        );

    }


    // - Close outside

    accountModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target === accountModal
            ) {

                closeAccount();

            }

        }
    );


    // - Escape key

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                closeAccount();

            }

        }
    );


    // - Email validation

    function validEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            .test(email);

    }


    // - Message

    function showMessage(
        form,
        message,
        type
    ) {

        let messageBox =
            form.querySelector(
                ".account-message"
            );


        if (!messageBox) {

            messageBox =
                document.createElement("p");

            messageBox.className =
                "account-message";

            form.prepend(
                messageBox
            );

        }


        messageBox.textContent =
            message;

        messageBox.className =
            "account-message " + type;

    }


    // - Register

    function registerUser(form) {

        const nameInput =
            form.querySelector(
                'input[type="text"]'
            );

        const emailInput =
            form.querySelector(
                'input[type="email"]'
            );

        const passwordInputs =
            form.querySelectorAll(
                'input[type="password"]'
            );


        if (
            !nameInput ||
            !emailInput ||
            passwordInputs.length < 2
        ) {

            return;

        }


        const name =
            nameInput.value.trim();

        const email =
            emailInput.value
                .trim()
                .toLowerCase();

        const password =
            passwordInputs[0].value;

        const confirmPassword =
            passwordInputs[1].value;


        // - Check name

        if (!name) {

            showMessage(
                form,
                "Please enter your full name.",
                "error"
            );

            return;

        }


        // - Check email

        if (!validEmail(email)) {

            showMessage(
                form,
                "Please enter a valid email address.",
                "error"
            );

            return;

        }


        // - Check password

        if (password.length < 6) {

            showMessage(
                form,
                "Password must contain at least 6 characters.",
                "error"
            );

            return;

        }


        // - Check passwords

        if (
            password !==
            confirmPassword
        ) {

            showMessage(
                form,
                "Passwords do not match.",
                "error"
            );

            return;

        }


        // - Check email exists

        const emailExists =
            users.some(
                function (user) {

                    return user.email === email;

                }
            );


        if (emailExists) {

            showMessage(
                form,
                "This email is already registered.",
                "error"
            );

            return;

        }


        // - Create user

        const newUser = {

            id:
                Date.now(),

            name:
                name,

            email:
                email,

            password:
                password

        };


        // - Save user

        users.push(
            newUser
        );


        localStorage.setItem(
            "furniroUsers",
            JSON.stringify(users)
        );


        // - Success

        showMessage(
            form,
            "Account created successfully. Please login.",
            "success"
        );


        form.reset();

    }


    // - Register submit

    function handleRegister(event) {

        event.preventDefault();

        registerUser(
            event.currentTarget
        );

    }


    if (registerForm) {

        registerForm.addEventListener(
            "submit",
            handleRegister
        );

    }


    if (modalRegisterForm) {

        modalRegisterForm.addEventListener(
            "submit",
            handleRegister
        );

    }


    // - Login

    function loginUser(form) {

        const emailInput =
            form.querySelector(
                'input[type="email"]'
            );

        const passwordInput =
            form.querySelector(
                'input[type="password"]'
            );

        const rememberInput =
            form.querySelector(
                'input[type="checkbox"]'
            );


        if (
            !emailInput ||
            !passwordInput
        ) {

            return;

        }


        const email =
            emailInput.value
                .trim()
                .toLowerCase();

        const password =
            passwordInput.value;


        const rememberMe =
            rememberInput
                ? rememberInput.checked
                : false;


        // - Check email

        if (!validEmail(email)) {

            showMessage(
                form,
                "Please enter a valid email address.",
                "error"
            );

            return;

        }


        // - Find user

        const user =
            users.find(
                function (item) {

                    return item.email === email;

                }
            );


        // - Check user

        if (!user) {

            showMessage(
                form,
                "This email is not registered.",
                "error"
            );

            return;

        }


        // - Check password

        if (
            user.password !==
            password
        ) {

            showMessage(
                form,
                "Incorrect password.",
                "error"
            );

            return;

        }


        // - Current user

        currentUser = {

            id:
                user.id,

            name:
                user.name,

            email:
                user.email

        };


        localStorage.setItem(
            "furniroCurrentUser",
            JSON.stringify(currentUser)
        );


        // - Remember me

        if (rememberMe) {

            localStorage.setItem(
                "furniroRememberMe",
                "true"
            );

        } else {

            localStorage.removeItem(
                "furniroRememberMe"
            );

        }


        // - Success

        showMessage(
            form,
            "Login successful. Welcome back!",
            "success"
        );


        form.reset();


        // - Close modal

        setTimeout(
            function () {

                closeAccount();

            },
            800
        );

    }


    // - Login submit

    function handleLogin(event) {

        event.preventDefault();

        loginUser(
            event.currentTarget
        );

    }


    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            handleLogin
        );

    }


    if (modalLoginForm) {

        modalLoginForm.addEventListener(
            "submit",
            handleLogin
        );

    }


});
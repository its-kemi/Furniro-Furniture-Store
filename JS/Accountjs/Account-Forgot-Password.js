
/* =========================================================
   ACCOUNT FORGOT PASSWORD
   Password Hashing with PBKDF2 + SHA-256
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const forgotPassword =
            document.getElementById(
                "modalForgotPassword"
            );

        if (!forgotPassword) {
            return;
        }

        /* =====================================================
           PASSWORD HASHING
        ===================================================== */

        function generateSalt() {
            const salt = crypto.getRandomValues(
                new Uint8Array(16)
            );

            return Array.from(salt)
                .map(function (byte) {
                    return byte
                        .toString(16)
                        .padStart(2, "0");
                })
                .join("");
        }

        async function hashPassword(password, saltHex) {
            const salt = new Uint8Array(
                saltHex.match(/.{2}/g).map(
                    function (byte) {
                        return parseInt(byte, 16);
                    }
                )
            );

            const encoder = new TextEncoder();

            const keyMaterial =
                await crypto.subtle.importKey(
                    "raw",
                    encoder.encode(password),
                    "PBKDF2",
                    false,
                    ["deriveBits"]
                );

            const hashBuffer =
                await crypto.subtle.deriveBits(
                    {
                        name: "PBKDF2",
                        salt: salt,
                        iterations: 100000,
                        hash: "SHA-256"
                    },
                    keyMaterial,
                    256
                );

            return Array.from(
                new Uint8Array(hashBuffer)
            )
                .map(function (byte) {
                    return byte
                        .toString(16)
                        .padStart(2, "0");
                })
                .join("");
        }

        /* =====================================================
           FORGOT PASSWORD CLICK
        ===================================================== */

        forgotPassword.addEventListener(
            "click",
            function (event) {
                event.preventDefault();
                showEmailStep();
            }
        );

        /* =====================================================
           STEP 1 - EMAIL
        ===================================================== */

        function showEmailStep() {
            Swal.fire({
                title: "Forgot Password?",
                input: "email",
                inputLabel: "Enter your registered email",
                inputPlaceholder: "your@email.com",
                confirmButtonText: "Send OTP",
                showCancelButton: true,
                cancelButtonText: "Cancel",

                inputValidator: function (value) {
                    if (!value || !value.trim()) {
                        return "Please enter your email.";
                    }
                }

            }).then(function (result) {
                if (!result.isConfirmed) {
                    return;
                }

                const email = result.value
                    .trim()
                    .toLowerCase();

                checkEmail(email);
            });
        }

        /* =====================================================
           CHECK EMAIL
        ===================================================== */

        function checkEmail(email) {
            let users = [];

            try {
                users = JSON.parse(
                    localStorage.getItem("furniroUsers")
                ) || [];
            } catch (error) {
                users = [];
            }

            const user = users.find(
                function (user) {
                    return (
                        user.email &&
                        user.email.trim().toLowerCase() === email
                    );
                }
            );

            if (!user) {
                Swal.fire({
                    icon: "error",
                    title: "Email Not Found",
                    text: "No account was found with this email."
                });

                return;
            }

            generateOTP(email);
        }

        /* =====================================================
           GENERATE OTP
        ===================================================== */

        function generateOTP(email) {
            const otp = crypto.getRandomValues(
                new Uint32Array(1)
            )[0] % 900000 + 100000;

            const resetData = {
                email: email,
                otp: String(otp),
                expiresAt: Date.now() + 5 * 60 * 1000
            };

            sessionStorage.setItem(
                "furniroPasswordReset",
                JSON.stringify(resetData)
            );

            /*
             * TEST VERSION ONLY
             *
             * OTP is displayed on the screen.
             * A real website must send OTP through
             * a trusted backend and email service.
             */

            Swal.fire({
                icon: "info",
                title: "Verification Code",
                html:
                    "Your OTP is:<br>" +
                    "<strong style='font-size:28px'>" +
                    otp +
                    "</strong>",
                confirmButtonText: "Enter OTP"
            }).then(function (result) {
                if (result.isConfirmed) {
                    showOTPStep();
                }
            });
        }

        /* =====================================================
           STEP 2 - OTP
        ===================================================== */

        function showOTPStep() {
            Swal.fire({
                title: "Verify OTP",
                input: "text",
                inputLabel: "Enter the verification code",
                inputPlaceholder: "Enter 6-digit OTP",

                inputAttributes: {
                    maxlength: "6",
                    inputmode: "numeric"
                },

                confirmButtonText: "Verify",
                showCancelButton: true,
                cancelButtonText: "Cancel",

                inputValidator: function (value) {
                    if (!value || !/^\d{6}$/.test(value)) {
                        return "Please enter a valid 6-digit OTP.";
                    }
                }

            }).then(function (result) {
                if (!result.isConfirmed) {
                    return;
                }

                verifyOTP(result.value.trim());
            });
        }

        /* =====================================================
           VERIFY OTP
        ===================================================== */

        function verifyOTP(enteredOTP) {
            let resetData;

            try {
                resetData = JSON.parse(
                    sessionStorage.getItem(
                        "furniroPasswordReset"
                    ) || "null"
                );
            } catch (error) {
                resetData = null;
            }

            if (!resetData) {
                Swal.fire({
                    icon: "error",
                    title: "OTP Expired",
                    text: "Please request a new OTP."
                });

                return;
            }

            if (Date.now() > resetData.expiresAt) {
                sessionStorage.removeItem(
                    "furniroPasswordReset"
                );

                Swal.fire({
                    icon: "error",
                    title: "OTP Expired",
                    text: "Please request a new OTP."
                });

                return;
            }

            if (enteredOTP !== resetData.otp) {
                Swal.fire({
                    icon: "error",
                    title: "Invalid OTP",
                    text: "The verification code is incorrect."
                });

                return;
            }

            Swal.fire({
                icon: "success",
                title: "Verified",
                text: "Email verified successfully.",
                confirmButtonText: "Continue"
            }).then(function (result) {
                if (result.isConfirmed) {
                    showNewPasswordStep();
                }
            });
        }

        /* =====================================================
           STEP 3 - NEW PASSWORD
        ===================================================== */

        function showNewPasswordStep() {
            Swal.fire({
                title: "New Password",

                html: `
                    <input
                        type="password"
                        id="newPassword"
                        class="swal2-input"
                        placeholder="New Password"
                        autocomplete="new-password"
                    >

                    <input
                        type="password"
                        id="confirmNewPassword"
                        class="swal2-input"
                        placeholder="Confirm Password"
                        autocomplete="new-password"
                    >
                `,

                confirmButtonText: "Update Password",
                showCancelButton: true,
                cancelButtonText: "Cancel",

                preConfirm: function () {
                    const newPassword =
                        document.getElementById(
                            "newPassword"
                        ).value;

                    const confirmPassword =
                        document.getElementById(
                            "confirmNewPassword"
                        ).value;

                    if (!newPassword) {
                        Swal.showValidationMessage(
                            "Please enter a new password."
                        );

                        return false;
                    }

                    if (newPassword.length < 6) {
                        Swal.showValidationMessage(
                            "Password must be at least 6 characters."
                        );

                        return false;
                    }

                    if (newPassword !== confirmPassword) {
                        Swal.showValidationMessage(
                            "Passwords do not match."
                        );

                        return false;
                    }

                    return newPassword;
                }

            }).then(async function (result) {
                if (!result.isConfirmed) {
                    return;
                }

                await updatePassword(result.value);
            });
        }

        /* =====================================================
           STEP 4 - UPDATE PASSWORD WITH HASHING
        ===================================================== */

        async function updatePassword(newPassword) {
            let resetData;

            try {
                resetData = JSON.parse(
                    sessionStorage.getItem(
                        "furniroPasswordReset"
                    ) || "null"
                );
            } catch (error) {
                resetData = null;
            }

            if (
                !resetData ||
                Date.now() > resetData.expiresAt
            ) {
                sessionStorage.removeItem(
                    "furniroPasswordReset"
                );

                Swal.fire({
                    icon: "error",
                    title: "Reset Failed",
                    text: "Password reset session has expired."
                });

                return;
            }

            let users = [];

            try {
                users = JSON.parse(
                    localStorage.getItem("furniroUsers")
                ) || [];
            } catch (error) {
                users = [];
            }

            const userIndex = users.findIndex(
                function (user) {
                    return (
                        user.email &&
                        user.email.trim().toLowerCase() ===
                        resetData.email
                    );
                }
            );

            if (userIndex === -1) {
                Swal.fire({
                    icon: "error",
                    title: "User Not Found",
                    text: "The account could not be found."
                });

                return;
            }

            try {
                /* Generate a unique salt for this password */

                const salt = generateSalt();

                /* Hash the new password */

                const hashedPassword = await hashPassword(
                    newPassword,
                    salt
                );

                /* Save the hash and salt */

                users[userIndex].password = hashedPassword;
                users[userIndex].passwordSalt = salt;

                localStorage.setItem(
                    "furniroUsers",
                    JSON.stringify(users)
                );

                /* Remove temporary reset data */

                sessionStorage.removeItem(
                    "furniroPasswordReset"
                );

                Swal.fire({
                    icon: "success",
                    title: "Password Updated!",
                    text:
                        "Your password has been hashed and updated successfully.",
                    confirmButtonText: "Login"
                });

            } catch (error) {
                console.error(
                    "Password hashing error:",
                    error
                );

                Swal.fire({
                    icon: "error",
                    title: "Reset Failed",
                    text:
                        "Unable to update the password. Please try again."
                });
            }
        }

    }
);

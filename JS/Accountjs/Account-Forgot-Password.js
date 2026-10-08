/* =========================================================
   ACCOUNT FORGOT PASSWORD
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

                title:
                    "Forgot Password?",

                input:
                    "email",

                inputLabel:
                    "Enter your registered email",

                inputPlaceholder:
                    "your@email.com",

                confirmButtonText:
                    "Send OTP",

                showCancelButton:
                    true,

                cancelButtonText:
                    "Cancel",

                inputValidator:
                    function (value) {

                        if (!value) {

                            return (
                                "Please enter your email."
                            );

                        }

                    }

            }).then(
                function (result) {

                    if (!result.isConfirmed) {
                        return;
                    }


                    const email =
                        result.value
                            .trim()
                            .toLowerCase();


                    checkEmail(email);

                }
            );

        }


        /* =====================================================
           CHECK EMAIL
        ===================================================== */

        function checkEmail(email) {

            let users = [];


            try {

                users =
                    JSON.parse(
                        localStorage.getItem(
                            "furniroUsers"
                        )
                    ) || [];

            } catch (error) {

                users = [];

            }


            const user =
                users.find(
                    function (user) {

                        return (
                            user.email ===
                            email
                        );

                    }
                );


            if (!user) {

                Swal.fire({

                    icon:
                        "error",

                    title:
                        "Email Not Found",

                    text:
                        "No account was found with this email."

                });

                return;

            }


            generateOTP(email);

        }


        /* =====================================================
           GENERATE OTP
        ===================================================== */

        function generateOTP(email) {

            const otp =
                Math.floor(
                    100000 +
                    Math.random() * 900000
                ).toString();


            const resetData = {

                email:
                    email,

                otp:
                    otp,

                expiresAt:
                    Date.now() +
                    5 * 60 * 1000

            };


            sessionStorage.setItem(
                "furniroPasswordReset",
                JSON.stringify(
                    resetData
                )
            );


            /*
             * TEST VERSION
             *
             * In a real website,
             * OTP must be sent through
             * backend/email service.
             */

            Swal.fire({

                icon:
                    "info",

                title:
                    "Verification Code",

                html:
                    "Your OTP is:<br>" +
                    "<strong style='font-size:28px'>" +
                    otp +
                    "</strong>",

                confirmButtonText:
                    "Enter OTP"

            }).then(
                function () {

                    showOTPStep();

                }
            );

        }


        /* =====================================================
           STEP 2 - OTP
        ===================================================== */

        function showOTPStep() {

            Swal.fire({

                title:
                    "Verify OTP",

                input:
                    "text",

                inputLabel:
                    "Enter the verification code",

                inputPlaceholder:
                    "Enter 6-digit OTP",

                inputAttributes: {

                    maxlength:
                        "6",

                    inputmode:
                        "numeric"

                },

                confirmButtonText:
                    "Verify",

                showCancelButton:
                    true,

                cancelButtonText:
                    "Cancel",

                inputValidator:
                    function (value) {

                        if (!value) {

                            return (
                                "Please enter the OTP."
                            );

                        }

                    }

            }).then(
                function (result) {

                    if (!result.isConfirmed) {
                        return;
                    }


                    verifyOTP(
                        result.value.trim()
                    );

                }
            );

        }


        /* =====================================================
           VERIFY OTP
        ===================================================== */

        function verifyOTP(
            enteredOTP
        ) {

            const resetData =
                JSON.parse(
                    sessionStorage.getItem(
                        "furniroPasswordReset"
                    ) || "null"
                );


            if (!resetData) {

                Swal.fire({

                    icon:
                        "error",

                    title:
                        "OTP Expired",

                    text:
                        "Please request a new OTP."

                });

                return;

            }


            /* Check OTP expiration */

            if (
                Date.now() >
                resetData.expiresAt
            ) {

                sessionStorage.removeItem(
                    "furniroPasswordReset"
                );

                Swal.fire({

                    icon:
                        "error",

                    title:
                        "OTP Expired",

                    text:
                        "Please request a new OTP."

                });

                return;

            }


            /* Compare OTP */

            if (
                enteredOTP !==
                resetData.otp
            ) {

                Swal.fire({

                    icon:
                        "error",

                    title:
                        "Invalid OTP",

                    text:
                        "The verification code is incorrect."

                });

                return;

            }


            /* OTP correct */

            Swal.fire({

                icon:
                    "success",

                title:
                    "Verified",

                text:
                    "Email verified successfully.",

                confirmButtonText:
                    "Continue"

            }).then(
                function () {

                    showNewPasswordStep();

                }
            );

        }


        /* =====================================================
           STEP 3 - NEW PASSWORD
        ===================================================== */

        function showNewPasswordStep() {

            Swal.fire({

                title:
                    "New Password",

                html: `

                    <input
                        type="password"
                        id="newPassword"
                        class="swal2-input"
                        placeholder="New Password"
                    >

                    <input
                        type="password"
                        id="confirmNewPassword"
                        class="swal2-input"
                        placeholder="Confirm Password"
                    >

                `,

                confirmButtonText:
                    "Update Password",

                showCancelButton:
                    true,

                cancelButtonText:
                    "Cancel",

                preConfirm:
                    function () {

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

                            return;

                        }


                        if (
                            newPassword.length <
                            6
                        ) {

                            Swal.showValidationMessage(
                                "Password must be at least 6 characters."
                            );

                            return;

                        }


                        if (
                            newPassword !==
                            confirmPassword
                        ) {

                            Swal.showValidationMessage(
                                "Passwords do not match."
                            );

                            return;

                        }


                        return newPassword;

                    }

            }).then(
                function (result) {

                    if (!result.isConfirmed) {
                        return;
                    }


                    updatePassword(
                        result.value
                    );

                }
            );

        }


        /* =====================================================
           STEP 4 - UPDATE PASSWORD
        ===================================================== */

        function updatePassword(
            newPassword
        ) {

            const resetData =
                JSON.parse(
                    sessionStorage.getItem(
                        "furniroPasswordReset"
                    ) || "null"
                );


            if (!resetData) {

                Swal.fire({

                    icon:
                        "error",

                    title:
                        "Reset Failed",

                    text:
                        "Password reset session has expired."

                });

                return;

            }


            let users = [];


            try {

                users =
                    JSON.parse(
                        localStorage.getItem(
                            "furniroUsers"
                        )
                    ) || [];

            } catch (error) {

                users = [];

            }


            /* Find SAME user by email */

            const userIndex =
                users.findIndex(
                    function (user) {

                        return (
                            user.email ===
                            resetData.email
                        );

                    }
                );


            if (
                userIndex === -1
            ) {

                Swal.fire({

                    icon:
                        "error",

                    title:
                        "User Not Found",

                    text:
                        "The account could not be found."

                });

                return;

            }


            /* Update only password */

            users[userIndex].password =
                newPassword;


            /* Save updated users */

            localStorage.setItem(
                "furniroUsers",
                JSON.stringify(
                    users
                )
            );


            /* Remove OTP data */

            sessionStorage.removeItem(
                "furniroPasswordReset"
            );


            Swal.fire({

                icon:
                    "success",

                title:
                    "Password Updated!",

                text:
                    "Your password has been updated successfully.",

                confirmButtonText:
                    "Login"

            });

        }

    }
);
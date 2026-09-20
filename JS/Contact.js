document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* ==================================================
           SCROLL REVEAL
           حرکت فقط از پایین به بالا
        ================================================== */

        const revealElements =
            document.querySelectorAll(
                ".contact-heading, " +
                ".contact-info-card, " +
                ".contact-form, " +
                ".contact-showroom, " +
                ".faq-heading, " +
                ".faq-item"
            );


        const revealObserver =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "show"
                                );


                                revealObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.15
                }
            );


        revealElements.forEach(
            function (element) {

                element.classList.add(
                    "reveal"
                );


                revealObserver.observe(
                    element
                );

            }
        );



        /* ==================================================
           BANNER SCROLL
        ================================================== */

        const bannerScroll =
            document.querySelector(
                "#bannerScroll"
            );


        const contactSection =
            document.querySelector(
                "#contact-section"
            );


        if (
            bannerScroll &&
            contactSection
        ) {

            bannerScroll.addEventListener(
                "click",
                function () {

                    contactSection.scrollIntoView(
                        {
                            behavior: "smooth",
                            block: "start"
                        }
                    );

                }
            );

        }



        /* ==================================================
           CONTACT INFORMATION CARDS
        ================================================== */

        const contactCards =
            document.querySelectorAll(
                ".contact-info-card"
            );


        contactCards.forEach(
            function (card) {

                card.addEventListener(
                    "click",
                    function () {

                        contactCards.forEach(
                            function (item) {

                                item.classList.remove(
                                    "contact-selected"
                                );

                            }
                        );


                        card.classList.add(
                            "contact-selected"
                        );

                    }
                );

            }
        );



        /* ==================================================
           CONTACT FORM
        ================================================== */

        const contactForm =
            document.querySelector(
                "#contactForm"
            );


        const formMessage =
            document.querySelector(
                "#formMessage"
            );


        if (contactForm) {

            contactForm.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


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


                    if (
                        !name ||
                        !email ||
                        !message
                    ) {

                        return;

                    }


                    const nameValue =
                        name.value.trim();


                    const emailValue =
                        email.value.trim();


                    const messageValue =
                        message.value.trim();



                    /* NAME */

                    if (
                        nameValue === ""
                    ) {

                        showFormMessage(
                            "Please enter your name.",
                            "error"
                        );


                        name.focus();

                        return;

                    }



                    /* EMAIL */

                    if (
                        emailValue === ""
                    ) {

                        showFormMessage(
                            "Please enter your email address.",
                            "error"
                        );


                        email.focus();

                        return;

                    }



                    /* EMAIL FORMAT */

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



                    /* MESSAGE */

                    if (
                        messageValue === ""
                    ) {

                        showFormMessage(
                            "Please write your message.",
                            "error"
                        );


                        message.focus();

                        return;

                    }



                    /* SUCCESS */

                    showFormMessage(
                        "Thank you, " +
                        nameValue +
                        "! Your message has been sent.",
                        "success"
                    );


                    contactForm.reset();

                }
            );

        }



        /* ==================================================
           FORM MESSAGE FUNCTION
        ================================================== */

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



        /* ==================================================
           SHOWROOM GET IN TOUCH
        ================================================== */

        const showroomButton =
            document.querySelector(
                "#showroomContactButton"
            );


        if (
            showroomButton &&
            contactForm
        ) {

            showroomButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    contactForm.scrollIntoView(
                        {
                            behavior: "smooth",
                            block: "center"
                        }
                    );


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

        }



        /* ==================================================
           FAQ ACCORDION
        ================================================== */

        const faqItems =
            document.querySelectorAll(
                ".faq-item"
            );


        faqItems.forEach(
            function (item) {

                item.addEventListener(
                    "click",
                    function () {

                        const isActive =
                            item.classList.contains(
                                "faq-active"
                            );


                        /* CLOSE ALL */

                        faqItems.forEach(
                            function (faq) {

                                faq.classList.remove(
                                    "faq-active"
                                );

                            }
                        );


                        /* OPEN SELECTED */

                        if (!isActive) {

                            item.classList.add(
                                "faq-active"
                            );

                        }

                    }
                );



                /* KEYBOARD */

                item.addEventListener(
                    "keydown",
                    function (event) {

                        if (
                            event.key === "Enter" ||
                            event.key === " "
                        ) {

                            event.preventDefault();

                            item.click();

                        }

                    }
                );

            }
        );



        /* ==================================================
           NEWSLETTER
        ================================================== */

        const newsletterForm =
            document.querySelector(
                "#newsletterForm"
            );


        const newsletterEmail =
            document.querySelector(
                "#newsletterEmail"
            );


        if (
            newsletterForm &&
            newsletterEmail
        ) {

            newsletterForm.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    const email =
                        newsletterEmail.value.trim();


                    if (
                        email === ""
                    ) {

                        alert(
                            "Please enter your email."
                        );


                        newsletterEmail.focus();

                        return;

                    }



                    /* EMAIL FORMAT */

                    const emailPattern =
                        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                    if (
                        !emailPattern.test(
                            email
                        )
                    ) {

                        alert(
                            "Please enter a valid email address."
                        );


                        newsletterEmail.focus();

                        return;

                    }


                    alert(
                        "Thank you for subscribing!"
                    );


                    newsletterForm.reset();

                }
            );

        }



        /* ==================================================
           ESCAPE KEY
        ================================================== */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape"
                ) {

                    faqItems.forEach(
                        function (item) {

                            item.classList.remove(
                                "faq-active"
                            );

                        }
                    );

                }

            }
        );

    }
);
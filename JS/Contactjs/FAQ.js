// ==================================================
// CUSTOMER FEEDBACK / FAQ
// ==================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const faqItems =
            document.querySelectorAll(
                ".faq-item"
            );


        if (faqItems.length === 0) {
            return;
        }


        // ==================================================
        // OPEN / CLOSE FAQ
        // ==================================================

        faqItems.forEach(
            function (item) {

                const question =
                    item.querySelector("h3");


                if (!question) {
                    return;
                }


                question.addEventListener(
                    "click",
                    function (event) {

                        event.stopPropagation();

                        const isActive =
                            item.classList.contains(
                                "faq-active"
                            );


                        // Close all
                        faqItems.forEach(
                            function (faq) {

                                faq.classList.remove(
                                    "faq-active"
                                );

                                const icon =
                                    faq.querySelector(
                                        "h3 i"
                                    );

                                if (icon) {

                                    icon.classList.remove(
                                        "fa-minus"
                                    );

                                    icon.classList.add(
                                        "fa-plus"
                                    );
                                }

                            }
                        );


                        // Open selected
                        if (!isActive) {

                            item.classList.add(
                                "faq-active"
                            );


                            const icon =
                                item.querySelector(
                                    "h3 i"
                                );


                            if (icon) {

                                icon.classList.remove(
                                    "fa-plus"
                                );

                                icon.classList.add(
                                    "fa-minus"
                                );

                            }

                        }

                    }
                );

            }
        );


        // ==================================================
        // SUBMIT FEEDBACK
        // ==================================================

        const feedbackButtons =
            document.querySelectorAll(
                ".feedback-submit"
            );


        feedbackButtons.forEach(
            function (button, index) {

                button.addEventListener(
                    "click",
                    function (event) {

                        event.stopPropagation();


                        const faqItem =
                            button.closest(
                                ".faq-item"
                            );


                        const textarea =
                            faqItem.querySelector(
                                ".feedback-textarea"
                            );


                        const feedback =
                            textarea.value.trim();


                        // Don't submit empty feedback
                        if (feedback === "") {

                            textarea.focus();

                            return;
                        }


                        // ==================================================
                        // GET OLD FEEDBACKS
                        // ==================================================

                        let feedbacks =
                            JSON.parse(
                                localStorage.getItem(
                                    "furniroFeedbacks"
                                )
                            ) || [];


                        // ==================================================
                        // CREATE NEW FEEDBACK
                        // ==================================================

                        const newFeedback = {

                            question:
                                faqItem.querySelector(
                                    "h3"
                                ).textContent.trim(),

                            answer: feedback,

                            date:
                                new Date().toLocaleString()

                        };


                        // Add new feedback
                        feedbacks.push(
                            newFeedback
                        );


                        // ==================================================
                        // SAVE TO LOCAL STORAGE
                        // ==================================================

                        localStorage.setItem(
                            "furniroFeedbacks",
                            JSON.stringify(
                                feedbacks
                            )
                        );


                        // ==================================================
                        // SUCCESS MESSAGE
                        // ==================================================

                        const oldMessage =
                            faqItem.querySelector(
                                ".feedback-success"
                            );


                        if (oldMessage) {
                            oldMessage.remove();
                        }


                        const successMessage =
                            document.createElement(
                                "p"
                            );


                        successMessage.className =
                            "feedback-success";


                        successMessage.textContent =
                            "Thank you! Your feedback has been saved.";


                        button.insertAdjacentElement(
                            "afterend",
                            successMessage
                        );


                        // Clear textarea
                        textarea.value = "";


                        console.log(
                            "Feedback saved:",
                            newFeedback
                        );

                    }
                );

            }
        );


        // ==================================================
        // PREVENT FAQ CLOSE
        // ==================================================

        const feedbackAreas =
            document.querySelectorAll(
                ".feedback-answer"
            );


        feedbackAreas.forEach(
            function (area) {

                area.addEventListener(
                    "click",
                    function (event) {

                        event.stopPropagation();

                    }
                );

            }
        );


        // ==================================================
        // ESCAPE KEY
        // ==================================================

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


                            const icon =
                                item.querySelector(
                                    "h3 i"
                                );


                            if (icon) {

                                icon.classList.remove(
                                    "fa-minus"
                                );

                                icon.classList.add(
                                    "fa-plus"
                                );

                            }

                        }
                    );

                }

            }
        );

    }
);
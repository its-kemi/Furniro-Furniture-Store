document.addEventListener("DOMContentLoaded", function () {

    // - FAQ items

    const faqItems =
        document.querySelectorAll(
            ".faq-item"
        );

    // - Check FAQ items

    if (faqItems.length === 0) {
        return;
    }

    // - FAQ click

    faqItems.forEach(function (item) {

        item.addEventListener(
            "click",
            function () {

                const isActive =
                    item.classList.contains(
                        "faq-active"
                    );

                // - Close all FAQ items

                faqItems.forEach(
                    function (faq) {

                        faq.classList.remove(
                            "faq-active"
                        );

                    }
                );

                // - Open selected FAQ

                if (!isActive) {

                    item.classList.add(
                        "faq-active"
                    );

                }

            }
        );

        // - Keyboard control

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

    });

    // - Escape key

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

});
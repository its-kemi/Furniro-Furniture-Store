document.addEventListener("DOMContentLoaded", function () {

    // - Contact cards

    const contactCards =
        document.querySelectorAll(
            ".contact-info-card"
        );

    // - Check cards

    if (contactCards.length === 0) {
        return;
    }

    // - Card click

    contactCards.forEach(function (card) {

        card.addEventListener(
            "click",
            function () {

                // - Remove selected from all cards

                contactCards.forEach(
                    function (item) {

                        item.classList.remove(
                            "contact-selected"
                        );

                    }
                );

                // - Add selected to clicked card

                card.classList.add(
                    "contact-selected"
                );

            }
        );

    });

});
document.addEventListener("DOMContentLoaded", function () {

    // - Process cards

    const processCards =
        document.querySelectorAll(".process-card");

    // - Check cards

    if (processCards.length === 0) {
        return;
    }

    // - Card click

    processCards.forEach(function (card) {

        card.addEventListener(
            "click",
            function () {

                // - Remove active

                processCards.forEach(
                    function (otherCard) {

                        otherCard.classList.remove(
                            "process-active"
                        );

                    }
                );

                // - Add active

                card.classList.add(
                    "process-active"
                );

            }
        );

    });

});
document.addEventListener("DOMContentLoaded", function () {

    const featureCards =
        document.querySelectorAll(".feature-card");

    if (featureCards.length === 0) {
        return;
    }

    featureCards.forEach(function (card) {

        const button =
            card.querySelector(".feature-more");

        const details =
            card.querySelector(".feature-details");

        if (!button || !details) {
            return;
        }

        button.addEventListener("click", function (event) {

            event.stopPropagation();

            const isSelected =
                card.classList.contains("feature-selected");


            if (isSelected) {

                card.classList.remove(
                    "feature-selected"
                );

                button.textContent =
                    "Learn More";

                card.insertBefore(
                    button,
                    details
                );

            } else {

                card.classList.add(
                    "feature-selected"
                );

                button.textContent =
                    "Show Less";

                details.after(button);

            }

        });

    });

});
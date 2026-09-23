document.addEventListener("DOMContentLoaded", function () {

    // - Select value items

    const valueItems =
        document.querySelectorAll(".value-item");


    // - Check value items

    if (valueItems.length === 0) {
        return;
    }


    // - Add click event

    valueItems.forEach(function (item) {

        const button =
            item.querySelector(".value-arrow");


        if (!button) {
            return;
        }


        // - Button click

        button.addEventListener("click", function () {

            const isOpen =
                item.classList.contains("value-open");


            // - Close all values

            valueItems.forEach(function (otherItem) {

                otherItem.classList.remove(
                    "value-open"
                );

                const otherButton =
                    otherItem.querySelector(".value-arrow");

                if (otherButton) {

                    otherButton.textContent =
                        "→";

                    otherButton.setAttribute(
                        "aria-label",
                        "Show more"
                    );

                }

            });


            // - Open selected value

            if (!isOpen) {

                item.classList.add(
                    "value-open"
                );

                button.textContent =
                    "←";

                button.setAttribute(
                    "aria-label",
                    "Show less"
                );

            }

        });

    });

});
const readMoreButtons = document.querySelectorAll(".read-more");

readMoreButtons.forEach(function (button) {

    button.addEventListener("click", function (event) {

        event.preventDefault();

        const moreText = button.previousElementSibling;

        moreText.classList.toggle("show");

        if (moreText.classList.contains("show")) {
            button.textContent = "Read Less";
        } else {
            button.textContent = "Read More";
        }

    });

});
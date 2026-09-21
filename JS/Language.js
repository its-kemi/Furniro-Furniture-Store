document.addEventListener("DOMContentLoaded", function () {

    // - Language button

    const languageButton =
        document.getElementById("languageButton");

    const languageDropdown =
        document.getElementById("languageDropdown");

    const languageOptions =
        document.querySelectorAll(".language-option");


    if (!languageButton || !languageDropdown) {
        return;
    }


    // - Open language options

    languageButton.addEventListener("click", function (event) {

        event.stopPropagation();

        languageDropdown.classList.toggle("active");

    });


    // - Select language option

    languageOptions.forEach(function (option) {

        option.addEventListener("click", function (event) {

            event.stopPropagation();


            const language =
                option.dataset.language;


            // - Remove active option

            languageOptions.forEach(function (item) {

                item.classList.remove("active");

            });


            // - Set selected option

            option.classList.add("active");


            // - Save selected language

            localStorage.setItem(
                "furniro-language",
                language
            );


            // - Close language options

            languageDropdown.classList.remove("active");

        });

    });


    // - Close language options outside

    document.addEventListener("click", function () {

        languageDropdown.classList.remove("active");

    });

});
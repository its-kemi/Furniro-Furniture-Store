document.addEventListener("DOMContentLoaded", function () {

    const themeButton =
        document.getElementById("themeButton");

    if (!themeButton) {
        return;
    }


    const themeIcon =
        themeButton.querySelector("i");


    const savedTheme =
        localStorage.getItem("furniro-theme");


    if (savedTheme === "dark") {

        document.body.classList.add("dark-mode");

        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");

    }


    themeButton.addEventListener("click", function () {

        document.body.classList.toggle("dark-mode");


        const isDark =
            document.body.classList.contains("dark-mode");


        if (isDark) {

            themeIcon.classList.remove("fa-moon");
            themeIcon.classList.add("fa-sun");

            localStorage.setItem(
                "furniro-theme",
                "dark"
            );

        } else {

            themeIcon.classList.remove("fa-sun");
            themeIcon.classList.add("fa-moon");

            localStorage.setItem(
                "furniro-theme",
                "light"
            );

        }

    });

});
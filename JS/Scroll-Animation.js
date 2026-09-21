document.addEventListener("DOMContentLoaded", function () {

    const sections = document.querySelectorAll(
        "main > section, body > section, footer"
    );

    sections.forEach(function (section, index) {

        section.classList.add("scroll-reveal");

        section.style.transitionDelay =
            (index * 0.08) + "s";

    });


    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "show"
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    document
        .querySelectorAll(".scroll-reveal")
        .forEach(function (section) {

            observer.observe(section);

        });

});
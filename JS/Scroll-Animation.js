/* ==================================================
   GENERAL SCROLL ANIMATION
================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const elements = document.querySelectorAll(
        "section, .section, main > div, article"
    );


    /* ==================================================
       INITIAL STATE
    ================================================== */

    elements.forEach((element) => {

        element.style.opacity = "0";
        element.style.transform = "translateY(50px)";
        element.style.transition =
            "opacity 0.8s ease, transform 0.8s ease";

    });


    /* ==================================================
       SCROLL OBSERVER
    ================================================== */

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );


    /* ==================================================
       START
    ================================================== */

    elements.forEach((element) => {
        observer.observe(element);
    });

});
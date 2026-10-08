/* =========================================================
   FURNIRO ABOUT PAGE
   ANIMATIONS + ACTIONS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       1. HEADER SCROLL
    ===================================================== */

    const header = document.querySelector("header");

    if (header) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 50) {

                header.classList.add("header-scrolled");

            } else {

                header.classList.remove("header-scrolled");

            }

        });

    }


    /* =====================================================
       2. STATS COUNTER
    ===================================================== */

    const statNumbers = document.querySelectorAll(
        ".stat-item strong"
    );

    let counterStarted = false;

    const statsSection = document.querySelector(
        ".about-stats"
    );


    if (statsSection) {

        const statsObserver = new IntersectionObserver(
            function (entries) {

                if (
                    entries[0].isIntersecting &&
                    !counterStarted
                ) {

                    counterStarted = true;

                    statNumbers.forEach(function (number) {

                        animateCounter(number);

                    });

                    statsObserver.unobserve(statsSection);

                }

            },
            {
                threshold: 0.4
            }
        );


        statsObserver.observe(statsSection);

    }


    /* =====================================================
       COUNTER FUNCTION
    ===================================================== */

    function animateCounter(element) {

        const originalText =
            element.textContent.trim();


        const hasPlus =
            originalText.includes("+");


        const numericValue =
            parseInt(
                originalText.replace(/\D/g, ""),
                10
            );


        if (isNaN(numericValue)) return;


        const duration = 1500;

        const startTime =
            performance.now();


        function updateCounter(currentTime) {

            const progress =
                Math.min(
                    (currentTime - startTime) /
                    duration,
                    1
                );


            const value =
                Math.floor(
                    progress * numericValue
                );


            element.textContent =
                value +
                (hasPlus ? "+" : "");


            if (progress < 1) {

                requestAnimationFrame(
                    updateCounter
                );

            } else {

                element.textContent =
                    originalText;

            }

        }


        requestAnimationFrame(updateCounter);

    }


    /* =====================================================
       3. FEATURE CARD ACTION
    ===================================================== */

    const featureCards =
        document.querySelectorAll(
            ".feature-card"
        );


    featureCards.forEach(function (card) {

        card.addEventListener(
            "click",
            function () {

                featureCards.forEach(
                    function (item) {

                        item.classList.remove(
                            "feature-selected"
                        );

                    }
                );


                card.classList.add(
                    "feature-selected"
                );

            }
        );

    });


    /* =====================================================
       4. VALUE ITEM ACTION
    ===================================================== */

    const valueItems =
        document.querySelectorAll(
            ".value-item"
        );


    valueItems.forEach(function (item) {

        item.addEventListener(
            "click",
            function () {

                valueItems.forEach(
                    function (value) {

                        value.classList.remove(
                            "value-selected"
                        );

                    }
                );


                item.classList.add(
                    "value-selected"
                );

            }
        );

    });


    /* =====================================================
       5. SHOP LINK HOVER
    ===================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href="Shop.html"]'
        );


    internalLinks.forEach(function (link) {

        link.addEventListener(
            "mouseenter",
            function () {

                link.classList.add(
                    "cta-hover"
                );

            }
        );


        link.addEventListener(
            "mouseleave",
            function () {

                link.classList.remove(
                    "cta-hover"
                );

            }
        );

    });

});
/* =========================================================
   FURNIRO ABOUT PAGE
   STATS COUNTER
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

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

});
/* ================================
   FEATURES ACTIONS
================================ */

document.addEventListener("DOMContentLoaded", function () {

    const featureButtons =
        document.querySelectorAll(".feature");

    const featureOverlay =
        document.querySelector("#featureOverlay");

    const featureClose =
        document.querySelector("#featureClose");

    const featureModalIcon =
        document.querySelector("#featureModalIcon");

    const featureModalTitle =
        document.querySelector("#featureModalTitle");

    const featureModalText =
        document.querySelector("#featureModalText");


    const featureData = {

        quality: {
            title: "High Quality",
            icon: "fa-solid fa-trophy",
            text:
                "Our furniture is crafted from carefully selected materials to provide quality, comfort and durability."
        },

        warranty: {
            title: "Warranty Protection",
            icon: "fa-solid fa-shield-halved",
            text:
                "Our products include warranty protection. Please check the warranty information for each product."
        },

        shipping: {
            title: "Free Shipping",
            icon: "fa-solid fa-truck",
            text:
                "Enjoy free shipping on qualifying orders over 150 dollars."
        },

        support: {
            title: "24 / 7 Support",
            icon: "fa-solid fa-headset",
            text:
                "Our support team is available to help you with your questions about products, orders and services."
        }

    };


    /* OPEN MODAL */

    featureButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const featureType =
                button.dataset.feature;

            const selectedFeature =
                featureData[featureType];

            if (!selectedFeature) {
                return;
            }

            featureModalTitle.textContent =
                selectedFeature.title;

            featureModalText.textContent =
                selectedFeature.text;

            featureModalIcon.className =
                selectedFeature.icon;

            featureOverlay.classList.add("active");

            document.body.style.overflow = "hidden";

        });

    });


    /* CLOSE MODAL */

    function closeFeatureModal() {

        featureOverlay.classList.remove("active");

        document.body.style.overflow = "";

    }


    featureClose.addEventListener(
        "click",
        closeFeatureModal
    );


    /* CLICK OUTSIDE */

    featureOverlay.addEventListener(
        "click",
        function (event) {

            if (event.target === featureOverlay) {

                closeFeatureModal();

            }

        }
    );


    /* ESCAPE */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                closeFeatureModal();

            }

        }
    );

});
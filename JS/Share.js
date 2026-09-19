/* ==================================================
   SHARE PRODUCT POPUP
================================================== */


/* ==================================================
   SHARE BUTTONS
================================================== */

const shareButtons =
    document.querySelectorAll(
        ".share-product"
    );


/* ==================================================
   SHARE ELEMENTS
================================================== */

const shareOverlay =
    document.querySelector(
        "#shareOverlay"
    );


const shareClose =
    document.querySelector(
        "#shareClose"
    );


const shareProductName =
    document.querySelector(
        "#shareProductName"
    );


const shareWhatsApp =
    document.querySelector(
        "#shareWhatsApp"
    );


const shareTelegram =
    document.querySelector(
        "#shareTelegram"
    );


const shareFacebook =
    document.querySelector(
        "#shareFacebook"
    );


const shareX =
    document.querySelector(
        "#shareX"
    );


const shareCopy =
    document.querySelector(
        "#shareCopy"
    );


const shareMessage =
    document.querySelector(
        "#shareMessage"
    );


/* ==================================================
   OPEN SHARE POPUP
================================================== */

shareButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {


            /* ==========================
               GET PRODUCT DATA
            ========================== */

            const productId =
                button.dataset.id;


            const productName =
                button.dataset.name;


            /* ==========================
               CREATE PRODUCT URL
            ========================== */

            const productUrl =
                new URL(
                    "Single-Product.html?id=" +
                    productId,
                    window.location.href
                ).href;


            /* ==========================
               PRODUCT NAME
            ========================== */

            shareProductName.textContent =
                productName;


            /* ==========================
               WHATSAPP
            ========================== */

            shareWhatsApp.href =
                "https://wa.me/?text=" +
                encodeURIComponent(
                    "Check out " +
                    productName +
                    " on Furniro: " +
                    productUrl
                );


            /* ==========================
               TELEGRAM
            ========================== */

            shareTelegram.href =
                "https://t.me/share/url?url=" +
                encodeURIComponent(
                    productUrl
                ) +
                "&text=" +
                encodeURIComponent(
                    "Check out " +
                    productName +
                    " on Furniro."
                );


            /* ==========================
               FACEBOOK
            ========================== */

            shareFacebook.href =
                "https://www.facebook.com/sharer/sharer.php?u=" +
                encodeURIComponent(
                    productUrl
                );


            /* ==========================
               X
            ========================== */

            shareX.href =
                "https://twitter.com/intent/tweet?text=" +
                encodeURIComponent(
                    "Check out " +
                    productName +
                    " on Furniro."
                ) +
                "&url=" +
                encodeURIComponent(
                    productUrl
                );


            /* ==========================
               RESET MESSAGE
            ========================== */

            shareMessage.textContent =
                "";


            /* ==========================
               OPEN POPUP
            ========================== */

            shareOverlay.classList.add(
                "active"
            );


        }
    );

});


/* ==================================================
   CLOSE BUTTON
================================================== */

shareClose.addEventListener(
    "click",
    function () {

        shareOverlay.classList.remove(
            "active"
        );

    }
);


/* ==================================================
   CLICK OUTSIDE POPUP
================================================== */

shareOverlay.addEventListener(
    "click",
    function (event) {

        if (
            event.target ===
            shareOverlay
        ) {

            shareOverlay.classList.remove(
                "active"
            );

        }

    }
);


/* ==================================================
   ESC KEY
================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape"
        ) {

            shareOverlay.classList.remove(
                "active"
            );

        }

    }
);


/* ==================================================
   COPY PRODUCT LINK
================================================== */

shareCopy.addEventListener(
    "click",
    async function () {


        const currentProduct =
            shareProductName.textContent;


        const shareButtons =
            document.querySelectorAll(
                ".share-product"
            );


        let productId = null;


        shareButtons.forEach(
            function (button) {

                if (
                    button.dataset.name ===
                    currentProduct
                ) {

                    productId =
                        button.dataset.id;

                }

            }
        );


        if (!productId) {

            return;

        }


        const productUrl =
            new URL(
                "Single-Product.html?id=" +
                productId,
                window.location.href
            ).href;


        try {

            await navigator.clipboard.writeText(
                productUrl
            );


            shareMessage.textContent =
                "Product link copied!";


        }

        catch (error) {

            shareMessage.textContent =
                "Unable to copy product link.";

        }

    }
);
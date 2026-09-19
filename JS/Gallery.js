/* ==================================================
   GALLERY LIGHTBOX
================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* ==================================================
           GALLERY IMAGES
        ================================================== */

        const galleryImages =
            document.querySelectorAll(
                ".gallery-images img"
            );


        /* ==================================================
           LIGHTBOX
        ================================================== */

        const galleryLightbox =
            document.querySelector(
                "#galleryLightbox"
            );


        const galleryLightboxImage =
            document.querySelector(
                "#galleryLightboxImage"
            );


        const galleryLightboxClose =
            document.querySelector(
                "#galleryLightboxClose"
            );


        /* ==================================================
           CHECK ELEMENTS
        ================================================== */

        if (
            galleryImages.length === 0 ||
            !galleryLightbox ||
            !galleryLightboxImage ||
            !galleryLightboxClose
        ) {

            console.log(
                "Gallery elements not found."
            );

            return;

        }


        /* ==================================================
           OPEN LIGHTBOX
        ================================================== */

        galleryImages.forEach(
            function (image) {

                image.addEventListener(
                    "click",
                    function () {

                        galleryLightboxImage.src =
                            image.src;

                        galleryLightboxImage.alt =
                            image.alt;

                        galleryLightbox.classList.add(
                            "active"
                        );

                        document.body.style.overflow =
                            "hidden";

                    }
                );

            }
        );


        /* ==================================================
           CLOSE LIGHTBOX
        ================================================== */

        function closeLightbox() {

            galleryLightbox.classList.remove(
                "active"
            );

            galleryLightboxImage.src =
                "";

            document.body.style.overflow =
                "";

        }


        /* ==================================================
           CLOSE BUTTON
        ================================================== */

        galleryLightboxClose.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();

                closeLightbox();

            }
        );


        /* ==================================================
           CLICK OUTSIDE IMAGE
        ================================================== */

        galleryLightbox.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    galleryLightbox
                ) {

                    closeLightbox();

                }

            }
        );


        /* ==================================================
           ESCAPE KEY
        ================================================== */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape"
                ) {

                    closeLightbox();

                }

            }
        );

    }
);
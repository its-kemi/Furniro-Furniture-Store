document.addEventListener("DOMContentLoaded", function () {

    // - Process items

    const processItems =
        document.querySelectorAll(".process-item");

    const galleryOverlay =
        document.getElementById("processGalleryOverlay");

    const galleryClose =
        document.getElementById("processGalleryClose");

    const galleryGrid =
        document.getElementById("processGalleryGrid");

    if (
        processItems.length === 0 ||
        !galleryOverlay ||
        !galleryClose ||
        !galleryGrid
    ) {
        return;
    }

    // - Process images

    const processImages = {

        inspiration: [
            "assite/about.images/Inspiration-1.png",
            "assite/about.images/Inspiration-2.png",
            "assite/about.images/Inspiration-3.png",
            "assite/about.images/Inspiration-4.png"
        ],

        design: [
            "assite/about.images/Design-1.png",
            "assite/about.images/Design-2.png",
            "assite/about.images/Design-3.png",
            "assite/about.images/Design-4.png"
        ],

        craftsmanship: [
            "assite/about.images/Craftsmanship-1.png",
            "assite/about.images/Craftsmanship-2.png",
            "assite/about.images/Craftsmanship-3.png",
            "assite/about.images/Craftsmanship-4.png"
        ],

        home: [
            "assite/about.images/Home-1.png",
            "assite/about.images/Home-2.png",
            "assite/about.images/Home-3.png",
            "assite/about.images/Home-4.png"
        ]

    };

    // - Open gallery

    function openGallery(processName) {

        const images =
            processImages[processName];

        if (!images) {
            return;
        }

        galleryGrid.innerHTML = "";

        images.forEach(function (imagePath) {

            const item =
                document.createElement("div");

            item.className =
                "process-gallery-item";

            const image =
                document.createElement("img");

            image.src = imagePath;

            image.alt = "";

            item.appendChild(image);

            galleryGrid.appendChild(item);

        });

        galleryOverlay.classList.add(
            "gallery-open"
        );

        document.body.style.overflow =
            "hidden";

    }

    // - Close gallery

    function closeGallery() {

        galleryOverlay.classList.remove(
            "gallery-open"
        );

        document.body.style.overflow = "";

        setTimeout(function () {

            if (
                !galleryOverlay.classList.contains(
                    "gallery-open"
                )
            ) {
                galleryGrid.innerHTML = "";
            }

        }, 400);

    }

    // - Process click

    processItems.forEach(function (item) {

        item.addEventListener(
            "click",
            function () {

                const processName =
                    item.dataset.process;

                openGallery(processName);

            }
        );

    });

    // - Close button

    galleryClose.addEventListener(
        "click",
        closeGallery
    );

    // - Click outside

    galleryOverlay.addEventListener(
        "click",
        function (event) {

            if (
                event.target === galleryOverlay
            ) {
                closeGallery();
            }

        }
    );

    // - Escape

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                galleryOverlay.classList.contains(
                    "gallery-open"
                )
            ) {
                closeGallery();
            }

        }
    );

});
/*
   FURNIRO PAGINATION
 */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* 
           ELEMENTS
        */

        const productGrid =
            document.querySelector(
                ".products-grid"
            );


        const pagination =
            document.querySelector(
                "#pagination"
            );


        const paginationNext =
            document.querySelector(
                "#paginationNext"
            );


        /* 
           CHECK ELEMENTS
        */

        if (
            !productGrid ||
            !pagination
        ) {
            return;
        }


        /* 
           PRODUCTS
        */

        const products =
            Array.from(
                productGrid.querySelectorAll(
                    ".product-card"
                )
            );


        if (
            products.length === 0
        ) {
            return;
        }


        /* 
           SETTINGS
        */

        const productsPerPage = 16;

        const totalPages =
            Math.ceil(
                products.length /
                productsPerPage
            );

        let currentPage = 1;


        /* 
           PAGE BUTTONS
        */

        const pageButtons =
            pagination.querySelectorAll(
                ".pagination-btn[data-page]"
            );


        /* 
           SHOW PAGE
        */

        function showPage(page) {


            /*
               - صفحه معتبر باشد
            */

            if (
                page < 1 ||
                page > totalPages
            ) {
                return;
            }


            currentPage = page;


            /* 
               HIDE ALL PRODUCTS
            */

            products.forEach(
                function (product) {

                    product.style.display =
                        "none";

                }
            );


            /* 
               START INDEX
            */

            const startIndex =
                (
                    currentPage - 1
                ) *
                productsPerPage;


            const endIndex =
                startIndex +
                productsPerPage;


            /* 
               SHOW CURRENT PRODUCTS
            */

            const currentProducts =
                products.slice(
                    startIndex,
                    endIndex
                );


            currentProducts.forEach(
                function (product) {

                    product.style.display =
                        "";

                }
            );


            /* 
               ACTIVE BUTTON
            */

            pageButtons.forEach(
                function (button) {

                    const buttonPage =
                        Number(
                            button.dataset.page
                        );


                    if (
                        buttonPage ===
                        currentPage
                    ) {

                        button.classList.add(
                            "active"
                        );

                    } else {

                        button.classList.remove(
                            "active"
                        );

                    }

                }
            );


            /* 
               NEXT BUTTON
            */

            if (paginationNext) {

                if (
                    currentPage >=
                    totalPages
                ) {

                    paginationNext.disabled =
                        true;

                    paginationNext.style.opacity =
                        "0.4";

                    paginationNext.style.cursor =
                        "not-allowed";

                } else {

                    paginationNext.disabled =
                        false;

                    paginationNext.style.opacity =
                        "1";

                    paginationNext.style.cursor =
                        "pointer";

                }

            }


            /* 
               SCROLL TO PRODUCTS
            */

            productGrid.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }


        /* 
           PAGE BUTTON CLICK
        */

        pageButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const page =
                            Number(
                                button.dataset.page
                            );


                        showPage(page);

                    }
                );

            }
        );


        /* 
           NEXT BUTTON CLICK
        */

        if (paginationNext) {

            paginationNext.addEventListener(
                "click",
                function () {

                    if (
                        currentPage <
                        totalPages
                    ) {

                        showPage(
                            currentPage + 1
                        );

                    }

                }
            );

        }


        /* 
           INITIAL PAGE
        */

        showPage(1);

    }
);
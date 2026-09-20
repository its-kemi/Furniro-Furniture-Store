

document.addEventListener(
    "DOMContentLoaded",
    function () {


        

        const productGrid =
            document.querySelector(
                ".products-grid"
            );


        const showProducts =
            document.querySelector(
                "#showProducts"
            );


        const sortProducts =
            document.querySelector(
                "#sortProducts"
            );


        const resultsText =
            document.querySelector(
                "#resultsText"
            );


        const prevPage =
            document.querySelector(
                "#prevPage"
            );


        const nextPage =
            document.querySelector(
                "#nextPage"
            );


        const toolbarDots =
            document.querySelectorAll(
                "#toolbarDots span"
            );


        const viewToggle =
            document.querySelector(
                "#viewToggle"
            );


        const viewToggleIcon =
            document.querySelector(
                "#viewToggleIcon"
            );


        const filterButton =
            document.querySelector(
                "#filterButton"
            );



        /* 
           CHECK
         */

        if (!productGrid) {
            return;
        }



        /* 
           PRODUCTS
         */

        const productCards = Array.from(
            productGrid.querySelectorAll(
                ".product-card"
            )
        );


        if (productCards.length === 0) {
            return;
        }



        /* 
           STATE
         */

        let currentPage = 1;

        let itemsPerPage =
            showProducts
                ? Number(showProducts.value)
                : 16;

        let currentView =
            "grid";



        /* 
           GET VISIBLE PRODUCTS
         */

        function getAvailableProducts() {

            return productCards.filter(
                function (card) {

                    return (
                        card.dataset.categoryHidden !==
                        "true"
                    );

                }
            );

        }



        /* 
           FORMAT RESULT
         */

        function updateResults(
            visibleProducts,
            startIndex,
            endIndex
        ) {

            if (!resultsText) {
                return;
            }


            if (visibleProducts.length === 0) {

                resultsText.textContent =
                    "No products found.";

                return;

            }


            const start =
                startIndex + 1;


            const end =
                Math.min(
                    endIndex,
                    visibleProducts.length
                );


            resultsText.textContent =
                `Showing ${start}–${end} of ${visibleProducts.length} results`;

        }



        /* 
           UPDATE DOTS
        */

        function updateDots(
            totalPages
        ) {

            if (toolbarDots.length === 0) {
                return;
            }


            toolbarDots.forEach(
                function (dot, index) {

                    if (
                        index ===
                        currentPage - 1
                    ) {

                        dot.classList.add(
                            "active"
                        );

                    } else {

                        dot.classList.remove(
                            "active"
                        );

                    }


                    if (
                        index >= totalPages
                    ) {

                        dot.style.display =
                            "none";

                    } else {

                        dot.style.display =
                            "block";

                    }

                }
            );

        }



        /* 
           RENDER PRODUCTS
     */

        function renderProducts() {

            const availableProducts =
                getAvailableProducts();


            const totalProducts =
                availableProducts.length;


            const totalPages =
                Math.max(
                    1,
                    Math.ceil(
                        totalProducts /
                        itemsPerPage
                    )
                );


            if (
                currentPage >
                totalPages
            ) {

                currentPage =
                    totalPages;

            }


            productCards.forEach(
                function (card) {

                    card.style.display =
                        "none";

                }
            );


            const startIndex =
                (
                    currentPage - 1
                ) *
                itemsPerPage;


            const endIndex =
                startIndex +
                itemsPerPage;


            const currentProducts =
                availableProducts.slice(
                    startIndex,
                    endIndex
                );


            currentProducts.forEach(
                function (card) {

                    card.style.display =
                        "";

                }
            );


            updateResults(
                availableProducts,
                startIndex,
                endIndex
            );


            updateDots(
                totalPages
            );


            if (prevPage) {

                prevPage.disabled =
                    currentPage === 1;

            }


            if (nextPage) {

                nextPage.disabled =
                    currentPage >=
                    totalPages;

            }

        }



        /* 
           SHOW PRODUCTS
        */

        if (showProducts) {

            showProducts.addEventListener(
                "change",
                function () {

                    itemsPerPage =
                        Number(
                            showProducts.value
                        );


                    currentPage =
                        1;


                    renderProducts();

                }
            );

        }



        /* 
           PREVIOUS PAGE
         */

        if (prevPage) {

            prevPage.addEventListener(
                "click",
                function () {

                    if (
                        currentPage >
                        1
                    ) {

                        currentPage--;

                        renderProducts();

                    }

                }
            );

        }



        /* 
           NEXT PAGE
        */

        if (nextPage) {

            nextPage.addEventListener(
                "click",
                function () {

                    const totalProducts =
                        getAvailableProducts()
                            .length;


                    const totalPages =
                        Math.ceil(
                            totalProducts /
                            itemsPerPage
                        );


                    if (
                        currentPage <
                        totalPages
                    ) {

                        currentPage++;

                        renderProducts();

                    }

                }
            );

        }



        /* 
           SORT PRODUCTS
         */

        if (sortProducts) {

            sortProducts.addEventListener(
                "change",
                function () {

                    const sortType =
                        sortProducts.value;


                    const cards =
                        Array.from(
                            productCards
                        );


                    if (
                        sortType ===
                        "price-low"
                    ) {

                        cards.sort(
                            function (a, b) {

                                return (
                                    Number(
                                        a.dataset.price
                                    ) -
                                    Number(
                                        b.dataset.price
                                    )
                                );

                            }
                        );

                    }


                    else if (
                        sortType ===
                        "price-high"
                    ) {

                        cards.sort(
                            function (a, b) {

                                return (
                                    Number(
                                        b.dataset.price
                                    ) -
                                    Number(
                                        a.dataset.price
                                    )
                                );

                            }
                        );

                    }


                    else if (
                        sortType ===
                        "name-a-z"
                    ) {

                        cards.sort(
                            function (a, b) {

                                return (
                                    a.dataset.name ||
                                    ""
                                ).localeCompare(
                                    b.dataset.name ||
                                    ""
                                );

                            }
                        );

                    }


                    else if (
                        sortType ===
                        "name-z-a"
                    ) {

                        cards.sort(
                            function (a, b) {

                                return (
                                    b.dataset.name ||
                                    ""
                                ).localeCompare(
                                    a.dataset.name ||
                                    ""
                                );

                            }
                        );

                    }


                    else {

                        cards.sort(
                            function (a, b) {

                                return (
                                    Number(
                                        a.dataset.id
                                    ) -
                                    Number(
                                        b.dataset.id
                                    )
                                );

                            }
                        );

                    }


                    cards.forEach(
                        function (card) {

                            productGrid.appendChild(
                                card
                            );

                        }
                    );


                    currentPage =
                        1;


                    renderProducts();

                }
            );

        }



        /* 
           GRID / LIST VIEW
         */

        if (viewToggle) {

            viewToggle.addEventListener(
                "click",
                function () {

                    if (
                        currentView ===
                        "grid"
                    ) {

                        currentView =
                            "list";


                        productGrid.classList.add(
                            "list-view"
                        );


                        if (viewToggleIcon) {

                            viewToggleIcon.className =
                                "fa-solid fa-grip";

                        }


                        viewToggle.title =
                            "Grid view";

                    }

                    else {

                        currentView =
                            "grid";


                        productGrid.classList.remove(
                            "list-view"
                        );


                        if (viewToggleIcon) {

                            viewToggleIcon.className =
                                "fa-solid fa-list";

                        }


                        viewToggle.title =
                            "List view";

                    }

                }
            );

        }



        /* 
           FILTER BUTTON
        */

        if (filterButton) {

            filterButton.addEventListener(
                "click",
                function () {

                    const filterSection =
                        document.querySelector(
                            ".shop-filter-panel"
                        );


                    if (filterSection) {

                        filterSection.classList.toggle(
                            "active"
                        );

                    }

                }
            );

        }



        

        renderProducts();

    }
);
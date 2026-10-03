/* =========================================================
   FURNIRO SEARCH
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =====================================================
           PRODUCTS DATA
        ===================================================== */

        const products = [

            {
                id: 1,
                name: "Syltherine",
                price: 2500000,
                category: "dining",
                description: "Stylish cafe chair",
                image: "assite/Shop-Products-images/product30.png"
            },

            {
                id: 2,
                name: "Leviosa",
                price: 2500000,
                category: "dining",
                description: "Stylish cafe chair",
                image: "assite/Shop-Products-images/product14.png"
            },

            {
                id: 3,
                name: "Lolito",
                price: 7000000,
                category: "living",
                description: "Luxury big sofa",
                image: "assite/Shop-Products-images/produc7.png"
            },

            {
                id: 4,
                name: "Respira",
                price: 500000,
                category: "living",
                description: "Outdoor bar table",
                image: "assite/Shop-Products-images/product29.png"
            },

            {
                id: 5,
                name: "Grifo",
                price: 1500000,
                category: "bedroom",
                description: "Night lamp",
                image: "assite/Shop-Products-images/product15.png"
            },

            {
                id: 6,
                name: "Muggo",
                price: 150000,
                category: "dining",
                description: "Small mug",
                image: "assite/Shop-Products-images/product.5.png"
            },

            {
                id: 7,
                name: "Pingky",
                price: 7000000,
                category: "bedroom",
                description: "Cute bed set",
                image: "assite/Shop-Products-images/product4.png"
            },

            {
                id: 8,
                name: "Potty",
                price: 500000,
                category: "living",
                description: "Minimalist flower pot",
                image: "assite/Shop-Products-images/product6.png"
            },

            {
                id: 9,
                name: "Maya",
                price: 3500000,
                category: "living",
                description: "Modern sofa",
                image: "assite/Shop-Products-images/product2.png"
            },

            {
                id: 10,
                name: "Arlo",
                price: 2000000,
                category: "living",
                description: "Comfort chair",
                image: "assite/Shop-Products-images/product.5.png"
            },

            {
                id: 11,
                name: "Luna",
                price: 4000000,
                category: "dining",
                description: "Dining table",
                image: "assite/Shop-Products-images/product17.png"
            },

            {
                id: 12,
                name: "Nova",
                price: 900000,
                category: "bedroom",
                description: "Luxury lamp",
                image: "assite/Shop-Products-images/product30.png"
            },

            {
                id: 13,
                name: "Oslo",
                price: 2800000,
                category: "dining",
                description: "Modern table",
                image: "assite/Shop-Products-images/product15.png"
            },

            {
                id: 14,
                name: "Riva",
                price: 3000000,
                category: "living",
                description: "Comfort sofa",
                image: "assite/Shop-Products-images/product4.png"
            },

            {
                id: 15,
                name: "Elio",
                price: 1800000,
                category: "dining",
                description: "Wooden chair",
                image: "assite/Shop-Products-images/product8.png"
            },

            {
                id: 16,
                name: "Siena",
                price: 5000000,
                category: "bedroom",
                description: "Elegant bed",
                image: "assite/Shop-Products-images/product12.png"
            },

            {
                id: 17,
                name: "Aurelia",
                price: 3200000,
                category: "living",
                description: "Modern living chair",
                image: "assite/Shop-Products-images/product17.png"
            },

            {
                id: 18,
                name: "Elara",
                price: 2800000,
                category: "dining",
                description: "Elegant dining chair",
                image: "assite/Shop-Products-images/product13.png"
            },

            {
                id: 19,
                name: "Velora",
                price: 4500000,
                category: "bedroom",
                description: "Comfortable bedroom set",
                image: "assite/Shop-Products-images/product19.png"
            },

            {
                id: 20,
                name: "Novella",
                price: 1800000,
                category: "living",
                description: "Stylish lounge table",
                image: "assite/Shop-Products-images/product20.png"
            },

            {
                id: 21,
                name: "Lavina",
                price: 2600000,
                category: "dining",
                description: "Elegant dining table",
                image: "assite/Shop-Products-images/product21.png"
            },

            {
                id: 22,
                name: "Orion",
                price: 4200000,
                category: "living",
                description: "Premium comfort sofa",
                image: "assite/Shop-Products-images/product22.png"
            },

            {
                id: 23,
                name: "Selene",
                price: 1200000,
                category: "bedroom",
                description: "Modern bedside lamp",
                image: "assite/Shop-Products-images/product23.png"
            },

            {
                id: 24,
                name: "Arden",
                price: 3400000,
                category: "living",
                description: "Contemporary lounge sofa",
                image: "assite/Shop-Products-images/product24.png"
            },

            {
                id: 25,
                name: "Serena",
                price: 2100000,
                category: "dining",
                description: "Classic wooden chair",
                image: "assite/Shop-Products-images/product25.png"
            },

            {
                id: 26,
                name: "Vera",
                price: 650000,
                category: "bedroom",
                description: "Decorative flower pot",
                image: "assite/Shop-Products-images/product26.png"
            },

            {
                id: 27,
                name: "Calista",
                price: 3900000,
                category: "living",
                description: "Soft modern sofa",
                image: "assite/Shop-Products-images/product12.png"
            },

            {
                id: 28,
                name: "Marcela",
                price: 1750000,
                category: "dining",
                description: "Elegant dining table",
                image: "assite/Shop-Products-images/product28.png"
            },

            {
                id: 29,
                name: "Eliora",
                price: 4800000,
                category: "bedroom",
                description: "Elegant bedroom furniture",
                image: "assite/Shop-Products-images/product29.png"
            },

            {
                id: 30,
                name: "Auren",
                price: 950000,
                category: "living",
                description: "Compact outdoor table",
                image: "assite/Shop-Products-images/product30.png"
            },

            {
                id: 31,
                name: "Lorena",
                price: 2700000,
                category: "dining",
                description: "Natural wood dining chair",
                image: "assite/Shop-Products-images/product31.png"
            },

            {
                id: 32,
                name: "Evelyn",
                price: 3600000,
                category: "bedroom",
                description: "Comfortable modern bed",
                image: "assite/Shop-Products-images/product32.png"
            }

        ];



        /* =====================================================
           ELEMENTS
        ===================================================== */

        const searchIcon =
            document.getElementById("searchIcon");

        const searchBox =
            document.getElementById("searchBox");

        const searchInput =
            document.getElementById("searchInput");

        const searchButton =
            document.getElementById("searchButton");

        const pageSearchInput =
            document.getElementById("pageSearchInput");

        const pageSearchButton =
            document.getElementById("pageSearchButton");

        const searchProducts =
            document.getElementById("searchProducts");

        const searchEmpty =
            document.getElementById("searchEmpty");

        const searchResultText =
            document.getElementById("searchResultText");



        /* =====================================================
           CREATE PRODUCT CARDS
        ===================================================== */

        function createProducts() {

            if (!searchProducts) {
                return;
            }


            searchProducts.innerHTML = "";


            products.forEach(function (product) {

                const article =
                    document.createElement("article");


                article.className =
                    "product-card";


                article.dataset.id =
                    product.id;


                article.dataset.name =
                    product.name;


                article.dataset.price =
                    product.price;


                article.dataset.category =
                    product.category;


                article.innerHTML = `

                    <div class="product-image">

                        <a href="Single-Product.html?id=${product.id}">

                            <img
                                src="${product.image}"
                                alt="${product.name}">

                        </a>


                        <div class="product-actions">

                            <button
                                class="add-cart"
                                data-id="${product.id}"
                                type="button">

                                Add to Cart

                            </button>


                            <div class="product-buttons">

                                <button
                                    class="share-product"
                                    data-id="${product.id}"
                                    data-name="${product.name}"
                                    title="Share"
                                    type="button">

                                    <i class="fa fa-share-alt"></i>

                                </button>


                                <button
                                    class="compare-product"
                                    data-id="${product.id}"
                                    data-name="${product.name}"
                                    title="Compare"
                                    type="button">

                                    <i class="fa fa-code-compare"></i>

                                </button>


                                <button
                                    class="like-product"
                                    data-id="${product.id}"
                                    data-name="${product.name}"
                                    title="Add to Wishlist"
                                    type="button">

                                    <i class="far fa-heart"></i>

                                </button>

                            </div>

                        </div>

                    </div>


                    <h3>
                        ${product.name}
                    </h3>


                    <p>
                        ${product.description}
                    </p>


                    <strong>
                        ${product.price.toLocaleString()} AFN
                    </strong>

                `;


                searchProducts.appendChild(article);

            });

        }



        /* =====================================================
           FILTER PRODUCTS
        ===================================================== */

        function filterProducts(value) {

            const query =
                value
                    .trim()
                    .toLowerCase();


            const cards =
                document.querySelectorAll(
                    "#searchProducts .product-card"
                );


            let found =
                0;


            cards.forEach(function (card) {

                const name =
                    card.dataset.name
                        .toLowerCase();


                const category =
                    card.dataset.category
                        .toLowerCase();


                const description =
                    card.querySelector("p")
                        ?.textContent
                        .toLowerCase() || "";


                const matches =
                    query === "" ||
                    name.includes(query) ||
                    category.includes(query) ||
                    description.includes(query);


                if (matches) {

                    card.style.display =
                        "";

                    found++;

                } else {

                    card.style.display =
                        "none";

                }

            });


            if (searchResultText) {

                if (query === "") {

                    searchResultText.textContent =
                        `Showing all ${found} products`;

                } else {

                    searchResultText.textContent =
                        `${found} product${found !== 1 ? "s" : ""} found for "${value}"`;

                }

            }


            if (searchEmpty) {

                if (found === 0) {

                    searchEmpty.style.display =
                        "block";

                } else {

                    searchEmpty.style.display =
                        "none";

                }

            }

        }



        /* =====================================================
           URL SEARCH
        ===================================================== */

        const params =
            new URLSearchParams(
                window.location.search
            );


        const urlSearch =
            params.get("search");


        /* =====================================================
           INITIALIZE
        ===================================================== */

        createProducts();


        if (urlSearch) {

            if (searchInput) {

                searchInput.value =
                    urlSearch;

            }


            if (pageSearchInput) {

                pageSearchInput.value =
                    urlSearch;

            }


            filterProducts(urlSearch);

        } else {

            filterProducts("");

        }



        /* =====================================================
           HEADER SEARCH OPEN / CLOSE
        ===================================================== */

        if (
            searchIcon &&
            searchBox &&
            searchInput
        ) {

            searchIcon.addEventListener(
                "click",
                function () {

                    searchBox.classList.toggle(
                        "active"
                    );


                    if (
                        searchBox.classList.contains(
                            "active"
                        )
                    ) {

                        searchInput.focus();

                    }

                }
            );

        }



        /* =====================================================
           GO TO SEARCH PAGE
        ===================================================== */

        function goToSearchPage(value) {

            const query =
                value
                    .trim();


            if (query === "") {
                return;
            }


            window.location.href =
                "Search.html?search=" +
                encodeURIComponent(query);

        }



        /* =====================================================
           HEADER SEARCH BUTTON
        ===================================================== */

        if (searchButton) {

            searchButton.addEventListener(
                "click",
                function () {

                    goToSearchPage(
                        searchInput.value
                    );

                }
            );

        }



        /* =====================================================
           HEADER ENTER
        ===================================================== */

        if (searchInput) {

            searchInput.addEventListener(
                "keydown",
                function (event) {

                    if (event.key === "Enter") {

                        goToSearchPage(
                            searchInput.value
                        );

                    }

                }
            );

        }



        /* =====================================================
           SEARCH PAGE BUTTON
        ===================================================== */

        if (
            pageSearchButton &&
            pageSearchInput
        ) {

            pageSearchButton.addEventListener(
                "click",
                function () {

                    filterProducts(
                        pageSearchInput.value
                    );

                }
            );


            pageSearchInput.addEventListener(
                "input",
                function () {

                    filterProducts(
                        pageSearchInput.value
                    );

                }
            );


            pageSearchInput.addEventListener(
                "keydown",
                function (event) {

                    if (event.key === "Enter") {

                        filterProducts(
                            pageSearchInput.value
                        );

                    }

                }
            );

        }

    }
);
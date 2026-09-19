/* 
   SINGLE PRODUCT PAGE
 */

document.addEventListener(
    "DOMContentLoaded",
    function () {





/* 
   PRODUCT DATABASE
 */

const products = {

    1: {
        id: "1",
        name: "Syltherine",
        price: 2500000,
        oldPrice: 3500000,
        category: "Dining",

        description:
            "Stylish cafe chair made from high quality materials. Perfect for modern and comfortable spaces.",

        image:
            "assite/Shop-Products-images/product13.png",

        mainImage:
            "assite/Single Product.images/Single Product5.png",

        gallery: [
            "assite/Single Product.images/Single Product1.png",
            "assite/Single Product.images/Single Product2.png",
            "assite/Single Product.images/Single Product3.png",
            "assite/Single Product.images/Single Product4.png"
        ]
    },


    2: {
        id: "2",
        name: "Leviosa",
        price: 2500000,
        oldPrice: null,
        category: "Dining",

        description:
            "Stylish cafe chair with a clean and comfortable design for modern spaces.",

        image:
            "assite/Shop-Products-images/product14.png",

        mainImage:
            "assite/Shop-Products-images/product14.png",

        gallery: [
            "assite/Shop-Products-images/product14.png"
        ]
    },


    3: {
        id: "3",
        name: "Lolito",
        price: 7000000,
        oldPrice: 14000000,
        category: "Living",

        description:
            "Luxury big sofa designed for elegant and comfortable living spaces.",

        image:
            "assite/Shop-Products-images/produc7.png",

        mainImage:
            "assite/Shop-Products-images/produc7.png",

        gallery: [
            "assite/Shop-Products-images/produc7.png"
        ]
    },


    4: {
        id: "4",
        name: "Respira",
        price: 500000,
        oldPrice: null,
        category: "Living",

        description:
            "Outdoor bar table with a simple and practical design.",

        image:
            "assite/Shop-Products-images/product-10.jpg",

        mainImage:
            "assite/Shop-Products-images/product-10.jpg",

        gallery: [
            "assite/Shop-Products-images/product-10.jpg"
        ]
    },


    5: {
        id: "5",
        name: "Grifo",
        price: 1500000,
        oldPrice: null,
        category: "Bedroom",

        description:
            "Elegant night lamp with a modern design.",

        image:
            "assite/Shop-Products-images/product15.png",

        mainImage:
            "assite/Shop-Products-images/product15.png",

        gallery: [
            "assite/Shop-Products-images/product15.png"
        ]
    },


    6: {
        id: "6",
        name: "Muggo",
        price: 150000,
        oldPrice: null,
        category: "Dining",

        description:
            "Small mug with a simple and minimal style.",

        image:
            "assite/Shop-Products-images/product.5.png",

        mainImage:
            "assite/Shop-Products-images/product.5.png",

        gallery: [
            "assite/Shop-Products-images/product.5.png"
        ]
    },


    7: {
        id: "7",
        name: "Pingky",
        price: 7000000,
        oldPrice: 14000000,
        category: "Bedroom",

        description:
            "Cute and comfortable bed set for a modern bedroom.",

        image:
            "assite/Shop-Products-images/product4.png",

        mainImage:
            "assite/Shop-Products-images/product4.png",

        gallery: [
            "assite/Shop-Products-images/product4.png"
        ]
    },


    8: {
        id: "8",
        name: "Potty",
        price: 500000,
        oldPrice: null,
        category: "Living",

        description:
            "Minimalist flower pot for stylish interior spaces.",

        image:
            "assite/Shop-Products-images/product6.png",

        mainImage:
            "assite/Shop-Products-images/product6.png",

        gallery: [
            "assite/Shop-Products-images/product6.png"
        ]
    },


    9: {
        id: "9",
        name: "Maya",
        price: 3500000,
        oldPrice: null,
        category: "Living",

        description:
            "Modern sofa designed to add comfort and style to your living room.",

        image:
            "assite/Shop-Products-images/product2.png",

        mainImage:
            "assite/Shop-Products-images/product2.png",

        gallery: [
            "assite/Shop-Products-images/product2.png"
        ]
    },


    10: {
        id: "10",
        name: "Arlo",
        price: 2000000,
        oldPrice: null,
        category: "Living",

        description:
            "Comfortable chair with a modern and elegant appearance.",

        image:
            "assite/Shop-Products-images/product.5.png",

        mainImage:
            "assite/Shop-Products-images/product.5.png",

        gallery: [
            "assite/Shop-Products-images/product.5.png"
        ]
    },


    11: {
        id: "11",
        name: "Luna",
        price: 4000000,
        oldPrice: 5000000,
        category: "Dining",

        description:
            "Elegant dining table designed for comfortable family meals.",

        image:
            "assite/Shop-Products-images/product17.png",

        mainImage:
            "assite/Shop-Products-images/product17.png",

        gallery: [
            "assite/Shop-Products-images/product17.png"
        ]
    },


    12: {
        id: "12",
        name: "Nova",
        price: 900000,
        oldPrice: null,
        category: "Bedroom",

        description:
            "Luxury lamp with a clean and modern design.",

        image:
            "assite/Shop-Products-images/product3.png",

        mainImage:
            "assite/Shop-Products-images/product3.png",

        gallery: [
            "assite/Shop-Products-images/product3.png"
        ]
    },


    13: {
        id: "13",
        name: "Oslo",
        price: 2800000,
        oldPrice: null,
        category: "Dining",

        description:
            "Modern table designed for elegant dining spaces.",

        image:
            "assite/Shop-Products-images/product15.png",

        mainImage:
            "assite/Shop-Products-images/product15.png",

        gallery: [
            "assite/Shop-Products-images/product15.png"
        ]
    },


    14: {
        id: "14",
        name: "Riva",
        price: 3000000,
        oldPrice: 4000000,
        category: "Living",

        description:
            "Comfortable sofa with a modern and elegant appearance.",

        image:
            "assite/Shop-Products-images/product4.png",

        mainImage:
            "assite/Shop-Products-images/product4.png",

        gallery: [
            "assite/Shop-Products-images/product4.png"
        ]
    },


    15: {
        id: "15",
        name: "Elio",
        price: 1800000,
        oldPrice: null,
        category: "Dining",

        description:
            "Wooden chair with a simple and elegant design.",

        image:
            "assite/Shop-Products-images/product8.png",

        mainImage:
            "assite/Shop-Products-images/product8.png",

        gallery: [
            "assite/Shop-Products-images/product8.png"
        ]
    },


    16: {
        id: "16",
        name: "Siena",
        price: 5000000,
        oldPrice: null,
        category: "Bedroom",

        description:
            "Elegant bed designed for a comfortable and stylish bedroom.",

        image:
            "assite/Shop-Products-images/product12.png",

        mainImage:
            "assite/Shop-Products-images/product12.png",

        gallery: [
            "assite/Shop-Products-images/product12.png"
        ]
    }

};








        /* 
           GET PRODUCT ID FROM URL
        */

        const urlParams =
            new URLSearchParams(
                window.location.search
            );

        const productId =
            urlParams.get("id");

        const product =
            products[productId];


        /* 
           CHECK PRODUCT
         */

        if (!product) {

            window.location.href =
                "Shop.html";

            return;
        }


        /* 
           FORMAT PRICE
         */

        function formatPrice(price) {

            return (
                "Rp " +
                Number(price).toLocaleString("id-ID")
            );

        }


        /* 
           PRODUCT ELEMENTS
         */

        const productTitle =
            document.querySelector("#productTitle");

        const productPrice =
            document.querySelector("#productPrice");

        const productOldPrice =
            document.querySelector("#productOldPrice");

        const productDescription =
            document.querySelector(
                "#productShortDescription"
            );

        const productMainImage =
            document.querySelector(
                "#mainProductImage"
            );

        const breadcrumbProduct =
            document.querySelector(
                "#breadcrumbProduct"
            );

        const productSku =
            document.querySelector(
                "#productSku"
            );

        const productCategory =
            document.querySelector(
                "#productCategory"
            );

        const longDescription =
            document.querySelector(
                "#longDescription"
            );

        const infoProductName =
            document.querySelector(
                "#infoProductName"
            );

        const infoCategory =
            document.querySelector(
                "#infoCategory"
            );


        /* 
           UPDATE PRODUCT INFORMATION
         */

        if (productTitle) {

            productTitle.textContent =
                product.name;
        }


        if (productPrice) {

            productPrice.textContent =
                formatPrice(product.price);
        }


        if (productOldPrice) {

            if (product.oldPrice) {

                productOldPrice.textContent =
                    formatPrice(product.oldPrice);

                productOldPrice.style.display =
                    "inline-block";

            } else {

                productOldPrice.textContent =
                    "";

                productOldPrice.style.display =
                    "none";
            }
        }


        if (productDescription) {

            productDescription.textContent =
                product.description;
        }


        if (productMainImage) {

            productMainImage.src =
                product.image;

            productMainImage.alt =
                product.name;
        }


        if (breadcrumbProduct) {

            breadcrumbProduct.textContent =
                product.name;
        }


        if (productSku) {

            productSku.textContent =
                "FUR-" +
                product.id.padStart(3, "0");
        }


        if (productCategory) {

            productCategory.textContent =
                product.category;
        }


        if (longDescription) {

            longDescription.textContent =
                product.description +
                " Designed with attention to detail, this product brings comfort, functionality and a modern look to your space.";
        }


        if (infoProductName) {

            infoProductName.textContent =
                product.name;
        }


        if (infoCategory) {

            infoCategory.textContent =
                product.category;
        }



        /* 
           PRODUCT GALLERY
         */

        const thumbnailButtons =
            document.querySelectorAll(
                ".thumbnail-button"
            );

        const thumbnailImages =
            document.querySelectorAll(
                ".thumbnail-images img"
            );


        thumbnailButtons.forEach(
            function (button, index) {

                button.addEventListener(
                    "click",
                    function () {

                        if (!productMainImage) {
                            return;
                        }


                        const image =
                            button.querySelector("img");

                        if (!image) {
                            return;
                        }


                        productMainImage.src =
                            image.src;

                        productMainImage.alt =
                            image.alt;


                        thumbnailButtons.forEach(
                            function (item) {

                                item.classList.remove(
                                    "active"
                                );

                            }
                        );


                        button.classList.add(
                            "active"
                        );

                    }
                );

            }
        );


        /*
         * Fallback:
         * If there are images but no
         * thumbnail buttons, clicking
         * the image still changes main image.
         */

        if (
            thumbnailButtons.length === 0 &&
            thumbnailImages.length > 0
        ) {

            thumbnailImages.forEach(
                function (thumbnail) {

                    thumbnail.addEventListener(
                        "click",
                        function () {

                            if (!productMainImage) {
                                return;
                            }

                            productMainImage.src =
                                thumbnail.src;

                            productMainImage.alt =
                                thumbnail.alt;

                        }
                    );

                }
            );

        }



        /* 
           PRODUCT QUANTITY
         */

        const quantityValue =
            document.querySelector(
                "#quantityValue"
            );

        const quantityMinus =
            document.querySelector(
                "#quantityMinus"
            );

        const quantityPlus =
            document.querySelector(
                "#quantityPlus"
            );


        let quantity = 1;


        function updateQuantity() {

            if (quantityValue) {

                quantityValue.textContent =
                    quantity;
            }

        }


        if (quantityMinus) {

            quantityMinus.addEventListener(
                "click",
                function () {

                    if (quantity > 1) {

                        quantity--;

                        updateQuantity();
                    }

                }
            );

        }


        if (quantityPlus) {

            quantityPlus.addEventListener(
                "click",
                function () {

                    quantity++;

                    updateQuantity();

                }
            );

        }



        /* 
           SIZE SELECTION
         */

        const sizeButtons =
            document.querySelectorAll(
                ".size-button"
            );


        sizeButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        sizeButtons.forEach(
                            function (item) {

                                item.classList.remove(
                                    "active"
                                );

                            }
                        );


                        button.classList.add(
                            "active"
                        );

                    }
                );

            }
        );



        /* 
           COLOR SELECTION
         */

        const colorButtons =
            document.querySelectorAll(
                ".color-button"
            );


        colorButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        colorButtons.forEach(
                            function (item) {

                                item.classList.remove(
                                    "active"
                                );

                            }
                        );


                        button.classList.add(
                            "active"
                        );

                    }
                );

            }
        );



        /* 
           CART DATA
        */

        let cart =
            JSON.parse(
                localStorage.getItem("cart")
            ) || [];


        function saveCart() {

            localStorage.setItem(
                "cart",
                JSON.stringify(cart)
            );

        }



        /* ==================================================
           CART SIDEBAR ELEMENTS
        ================================================== */

        const cartOverlay =
            document.querySelector(
                "#cartOverlay"
            );

        const cartSidebar =
            document.querySelector(
                "#cartSidebar"
            );

        const cartClose =
            document.querySelector(
                "#cartClose"
            );

        const cartItems =
            document.querySelector(
                "#cartItems"
            );

        const cartSubtotal =
            document.querySelector(
                "#cartSubtotal"
            );



        /* ==================================================
           OPEN CART
        ================================================== */

        function openCartSidebar() {

            if (!cartSidebar) {
                return;
            }


            cartSidebar.classList.add(
                "active"
            );


            if (cartOverlay) {

                cartOverlay.classList.add(
                    "active"
                );

            }


            document.body.style.overflow =
                "hidden";

        }



        /* ==================================================
           CLOSE CART
        ================================================== */

        function closeCartSidebar() {

            if (!cartSidebar) {
                return;
            }


            cartSidebar.classList.remove(
                "active"
            );


            if (cartOverlay) {

                cartOverlay.classList.remove(
                    "active"
                );

            }


            document.body.style.overflow =
                "";

        }



        /* ==================================================
           ADD PRODUCT TO CART
        ================================================== */

        function addProductToCart(
            selectedProduct,
            selectedQuantity
        ) {

            const existingProduct =
                cart.find(
                    function (item) {

                        return (
                            item.id ===
                            selectedProduct.id
                        );

                    }
                );


            if (existingProduct) {

                existingProduct.quantity +=
                    selectedQuantity;

            } else {

                cart.push({

                    id:
                        selectedProduct.id,

                    name:
                        selectedProduct.name,

                    price:
                        selectedProduct.price,

                    image:
                        selectedProduct.image,

                    quantity:
                        selectedQuantity

                });

            }


            saveCart();

            renderCartSidebar();

        }



        /* ==================================================
           MAIN ADD TO CART
        ================================================== */

        const addCartButton =
            document.querySelector(
                "#singleAddCart"
            );


        if (addCartButton) {

            addCartButton.type =
                "button";


            addCartButton.addEventListener(
                "click",
                function () {

                    addProductToCart(
                        product,
                        quantity
                    );

                    openCartSidebar();

                }
            );

        }



        /* ==================================================
           RENDER CART SIDEBAR
        ================================================== */

        function renderCartSidebar() {

            if (!cartItems) {
                return;
            }


            cartItems.innerHTML =
                "";


            if (cart.length === 0) {

                cartItems.innerHTML = `

                    <div class="empty-cart">

                        <i class="fa-solid fa-cart-shopping"></i>

                        <h3>
                            Your Cart is Empty
                        </h3>

                        <p>
                            Add products to your shopping cart.
                        </p>

                    </div>

                `;


                if (cartSubtotal) {

                    cartSubtotal.textContent =
                        formatPrice(0);

                }


                return;
            }


            let subtotal = 0;


            cart.forEach(
                function (item) {

                    subtotal +=
                        item.price *
                        item.quantity;


                    const cartItem =
                        document.createElement("div");


                    cartItem.className =
                        "cart-item";


                    cartItem.innerHTML = `

                        <div class="cart-item-image">

                            <img
                                src="${item.image}"
                                alt="${item.name}"
                            >

                        </div>


                        <div class="cart-item-details">

                            <h3>
                                ${item.name}
                            </h3>


                            <p class="cart-item-category">
                                Furniture
                            </p>


                            <p class="cart-item-price">

                                ${item.quantity}
                                ×

                                <strong>
                                    ${formatPrice(item.price)}
                                </strong>

                            </p>

                        </div>


                        <button
                            class="cart-remove"
                            data-id="${item.id}"
                            type="button"
                            aria-label="Remove product"
                        >

                            <i class="fa-solid fa-xmark"></i>

                        </button>

                    `;


                    cartItems.appendChild(
                        cartItem
                    );

                }
            );


            if (cartSubtotal) {

                cartSubtotal.textContent =
                    formatPrice(subtotal);

            }

        }



        /* ==================================================
           REMOVE FROM CART
        ================================================== */

        if (cartItems) {

            cartItems.addEventListener(
                "click",
                function (event) {

                    const button =
                        event.target.closest(
                            ".cart-remove"
                        );


                    if (!button) {
                        return;
                    }


                    const itemId =
                        button.dataset.id;


                    cart =
                        cart.filter(
                            function (item) {

                                return (
                                    item.id !==
                                    itemId
                                );

                            }
                        );


                    saveCart();

                    renderCartSidebar();

                }
            );

        }



        /* ==================================================
           CART HEADER ICON
        ================================================== */

        const headerCartLink =
            document.querySelector(
                '#headerCartLink'
            );


        if (headerCartLink) {

            headerCartLink.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    openCartSidebar();

                }
            );

        }



        /* ==================================================
           CART CLOSE BUTTON
        ================================================== */

        if (cartClose) {

            cartClose.addEventListener(
                "click",
                function () {

                    closeCartSidebar();

                }
            );

        }



        /* ==================================================
           CART OVERLAY
        ================================================== */

        if (cartOverlay) {

            cartOverlay.addEventListener(
                "click",
                function () {

                    closeCartSidebar();

                }
            );

        }



        /* ==================================================
           ESCAPE FOR CART
        ================================================== */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape"
                ) {

                    closeCartSidebar();

                }

            }
        );



        /* ==================================================
           SINGLE PRODUCT COMPARE
        ================================================== */

        const singleCompareButton =
            document.querySelector(
                "#singleCompare"
            );


        function getComparison() {

            return (
                JSON.parse(
                    localStorage.getItem(
                        "comparison"
                    )
                ) || []
            );

        }


        function saveComparison(
            comparison
        ) {

            localStorage.setItem(
                "comparison",
                JSON.stringify(
                    comparison
                )
            );

        }


        function addToComparison(
            selectedProduct
        ) {

            let comparison =
                getComparison();


            const alreadyExists =
                comparison.some(
                    function (item) {

                        return (
                            item.id ===
                            selectedProduct.id
                        );

                    }
                );


            if (alreadyExists) {

                alert(
                    "This product is already in comparison."
                );

                return false;

            }


            if (comparison.length >= 2) {

                alert(
                    "You can compare only two products."
                );

                return false;

            }


            comparison.push({

                id:
                    selectedProduct.id,

                name:
                    selectedProduct.name,

                price:
                    selectedProduct.price,

                image:
                    selectedProduct.image

            });


            saveComparison(
                comparison
            );


            alert(
                selectedProduct.name +
                " added to comparison!"
            );


            return true;

        }


        if (singleCompareButton) {

            singleCompareButton.type =
                "button";


            singleCompareButton.addEventListener(
                "click",
                function () {

                    const added =
                        addToComparison(product);


                    if (added) {

                        window.location.href =
                            "Product-Comparison.html";

                    }

                }
            );

        }



        /* ==================================================
           DESCRIPTION TABS
        ================================================== */

        const descriptionTabs =
            document.querySelectorAll(
                ".description-tab"
            );

        const tabContents =
            document.querySelectorAll(
                ".tab-content"
            );


        descriptionTabs.forEach(
            function (tab) {

                tab.addEventListener(
                    "click",
                    function () {

                        const target =
                            tab.dataset.tab;


                        descriptionTabs.forEach(
                            function (item) {

                                item.classList.remove(
                                    "active"
                                );

                            }
                        );


                        tabContents.forEach(
                            function (content) {

                                content.classList.remove(
                                    "active"
                                );

                            }
                        );


                        tab.classList.add(
                            "active"
                        );


                        const targetContent =
                            document.querySelector(
                                "#" + target
                            );


                        if (targetContent) {

                            targetContent.classList.add(
                                "active"
                            );

                        }

                    }
                );

            }
        );



        /* ==================================================
           RELATED PRODUCTS
        ================================================== */

        const relatedGrid =
            document.querySelector(
                "#relatedProductsGrid"
            );

        const relatedShowMore =
            document.querySelector(
                "#relatedShowMore"
            );


        let relatedProducts = [];


        if (relatedGrid) {

            const allProducts =
                Object.values(products)
                    .filter(
                        function (item) {

                            return (
                                item.id !==
                                product.id
                            );

                        }
                    );


            /*
             * Products from the same category
             * come first.
             */

            const sameCategoryProducts =
                allProducts.filter(
                    function (item) {

                        return (
                            item.category ===
                            product.category
                        );

                    }
                );


            const otherCategoryProducts =
                allProducts.filter(
                    function (item) {

                        return (
                            item.category !==
                            product.category
                        );

                    }
                );


            relatedProducts = [
                ...sameCategoryProducts,
                ...otherCategoryProducts
            ];


            relatedGrid.innerHTML =
                "";

        }


        let relatedVisibleCount = 4;


        function createRelatedProduct(
            item,
            index
        ) {

            const article =
                document.createElement(
                    "article"
                );


            article.className =
                "product-card";


            article.dataset.id =
                item.id;


            article.dataset.name =
                item.name;


            article.dataset.price =
                item.price;


            article.dataset.index =
                index;


            article.innerHTML = `

                <div class="product-image">

                    <a
                        href="Single-Product.html?id=${item.id}"
                    >

                        <img
                            src="${item.image}"
                            alt="${item.name}"
                        >

                    </a>


                    <div class="product-actions">

                        <button
                            class="related-add-cart"
                            data-id="${item.id}"
                            type="button"
                        >
                            Add to Cart
                        </button>


                        <div class="product-buttons">

                            <button
                                type="button"
                                class="related-share"
                                data-id="${item.id}"
                                title="Share"
                            >

                                <i class="fa-solid fa-share-nodes"></i>

                                <span>
                                    Share
                                </span>

                            </button>


                            <button
                                type="button"
                                class="related-compare"
                                data-id="${item.id}"
                                title="Compare"
                            >

                                <i class="fa-solid fa-code-compare"></i>

                                <span>
                                    Compare
                                </span>

                            </button>


                            <button
                                type="button"
                                class="related-like"
                                data-id="${item.id}"
                                title="Add to Wishlist"
                            >

                                <i class="fa-regular fa-heart"></i>

                                <span>
                                    Like
                                </span>

                            </button>

                        </div>

                    </div>

                </div>


                <h3>
                    ${item.name}
                </h3>


                <p>
                    ${item.description}
                </p>


                <strong>
                    ${formatPrice(item.price)}
                </strong>

            `;


            if (index >= relatedVisibleCount) {

                article.style.display =
                    "none";

            }


            return article;

        }


        if (
            relatedGrid &&
            relatedProducts.length > 0
        ) {

            relatedProducts.forEach(
                function (item, index) {

                    const card =
                        createRelatedProduct(
                            item,
                            index
                        );


                    relatedGrid.appendChild(
                        card
                    );

                }
            );

        }



        /* ==================================================
           RELATED SHOW MORE
        ================================================== */

        function updateRelatedVisibility() {

            if (!relatedGrid) {
                return;
            }


            const cards =
                relatedGrid.querySelectorAll(
                    ".product-card"
                );


            cards.forEach(
                function (card, index) {

                    if (
                        index <
                        relatedVisibleCount
                    ) {

                        card.style.display =
                            "";

                    } else {

                        card.style.display =
                            "none";

                    }

                }
            );


            if (!relatedShowMore) {
                return;
            }


            if (
                relatedVisibleCount >=
                cards.length
            ) {

                relatedShowMore.style.display =
                    "none";

            } else {

                relatedShowMore.style.display =
                    "inline-block";

            }

        }


        updateRelatedVisibility();


        if (relatedShowMore) {

            relatedShowMore.addEventListener(
                "click",
                function () {

                    relatedVisibleCount +=
                        4;

                    updateRelatedVisibility();

                }
            );

        }



        /* ==================================================
           RELATED PRODUCT ACTIONS
        ================================================== */

        if (relatedGrid) {

            relatedGrid.addEventListener(
                "click",
                function (event) {


                    /* ==========================
                       GET RELATED PRODUCT
                    ========================== */

                    const card =
                        event.target.closest(
                            ".product-card"
                        );


                    if (!card) {
                        return;
                    }


                    const relatedId =
                        card.dataset.id;


                    const relatedProduct =
                        products[relatedId];


                    if (!relatedProduct) {
                        return;
                    }



                    /* ==========================
                       ADD TO CART
                    ========================== */

                    const addButton =
                        event.target.closest(
                            ".related-add-cart"
                        );


                    if (addButton) {

                        event.preventDefault();

                        addProductToCart(
                            relatedProduct,
                            1
                        );

                        openCartSidebar();

                        return;

                    }



                    /* ==========================
                       COMPARE
                    ========================== */

                    const compareButton =
                        event.target.closest(
                            ".related-compare"
                        );


                    if (compareButton) {

                        event.preventDefault();


                        const added =
                            addToComparison(
                                relatedProduct
                            );


                        if (added) {

                            window.location.href =
                                "Product-Comparison.html";

                        }


                        return;

                    }



                    /* ==========================
                       LIKE / WISHLIST
                    ========================== */

                    const likeButton =
                        event.target.closest(
                            ".related-like"
                        );


                    if (likeButton) {

                        event.preventDefault();


                        let wishlist =
                            JSON.parse(
                                localStorage.getItem(
                                    "wishlist"
                                )
                            ) || [];


                        const exists =
                            wishlist.some(
                                function (item) {

                                    return (
                                        item.id ===
                                        relatedProduct.id
                                    );

                                }
                            );


                        if (exists) {

                            alert(
                                relatedProduct.name +
                                " is already in your wishlist."
                            );


                            return;

                        }


                        wishlist.push({

                            id:
                                relatedProduct.id,

                            name:
                                relatedProduct.name,

                            price:
                                relatedProduct.price,

                            image:
                                relatedProduct.image

                        });


                        localStorage.setItem(
                            "wishlist",
                            JSON.stringify(
                                wishlist
                            )
                        );


                        likeButton.classList.add(
                            "active"
                        );


                        const icon =
                            likeButton.querySelector(
                                "i"
                            );


                        if (icon) {

                            icon.classList.remove(
                                "fa-regular"
                            );

                            icon.classList.add(
                                "fa-solid"
                            );

                        }


                        alert(
                            relatedProduct.name +
                            " added to wishlist!"
                        );


                        return;

                    }



                    /* ==========================
                       SHARE
                    ========================== */

                    const shareButton =
                        event.target.closest(
                            ".related-share"
                        );


                    if (shareButton) {

                        event.preventDefault();


                        shareProduct(
                            relatedProduct
                        );


                        return;

                    }

                }
            );

        }



        /* ==================================================
           SHARE PRODUCT
        ================================================== */

        function shareProduct(
            selectedProduct
        ) {

            const productUrl =
                window.location.origin +
                window.location.pathname +
                "?id=" +
                selectedProduct.id;


            const shareText =
                selectedProduct.name +
                " - " +
                formatPrice(
                    selectedProduct.price
                );


            if (
                navigator.share
            ) {

                navigator.share({

                    title:
                        selectedProduct.name,

                    text:
                        shareText,

                    url:
                        productUrl

                }).catch(
                    function () {
                        return;
                    }
                );


                return;
            }


            copyText(
                productUrl
            );


            alert(
                "Product link copied!"
            );

        }



        /* ==================================================
           COPY TEXT
        ================================================== */

        function copyText(
            text
        ) {

            if (
                navigator.clipboard &&
                window.isSecureContext
            ) {

                navigator.clipboard.writeText(
                    text
                );

                return;
            }


            const textarea =
                document.createElement(
                    "textarea"
                );


            textarea.value =
                text;


            textarea.style.position =
                "fixed";

            textarea.style.left =
                "-9999px";


            document.body.appendChild(
                textarea
            );


            textarea.select();


            try {

                document.execCommand(
                    "copy"
                );

            } catch (error) {

                console.log(
                    "Copy failed."
                );

            }


            document.body.removeChild(
                textarea
            );

        }



        /* ==================================================
           PRODUCT META SOCIAL SHARE
        ================================================== */

        const metaShareLinks =
            document.querySelectorAll(
                ".product-meta a"
            );


        metaShareLinks.forEach(
            function (link) {

                const icon =
                    link.querySelector("i");


                if (!icon) {
                    return;
                }


                const currentUrl =
                    window.location.href;


                const encodedUrl =
                    encodeURIComponent(
                        currentUrl
                    );


                if (
                    icon.classList.contains(
                        "fa-facebook"
                    )
                ) {

                    link.href =
                        "https://www.facebook.com/sharer/sharer.php?u=" +
                        encodedUrl;

                }


                else if (
                    icon.classList.contains(
                        "fa-linkedin"
                    )
                ) {

                    link.href =
                        "https://www.linkedin.com/sharing/share-offsite/?url=" +
                        encodedUrl;

                }


                else if (
                    icon.classList.contains(
                        "fa-x-twitter"
                    )
                ) {

                    link.href =
                        "https://twitter.com/intent/tweet?url=" +
                        encodedUrl +
                        "&text=" +
                        encodeURIComponent(
                            product.name
                        );

                }


                link.target =
                    "_blank";

                link.rel =
                    "noopener noreferrer";

            }
        );



        /* ==================================================
           DESCRIPTION IMAGE LIGHTBOX
        ================================================== */

        const descriptionImages =
            document.querySelectorAll(
                ".description-image, .description-images img"
            );


        let descriptionLightbox =
            document.querySelector(
                "#descriptionLightbox"
            );


        let descriptionLightboxImage =
            document.querySelector(
                "#descriptionLightboxImage"
            );


        let descriptionLightboxClose =
            document.querySelector(
                "#descriptionLightboxClose"
            );


        /*
         * Create lightbox automatically
         * if it is not already in HTML.
         */

        if (
            descriptionImages.length > 0 &&
            !descriptionLightbox
        ) {

            descriptionLightbox =
                document.createElement("div");


            descriptionLightbox.className =
                "description-lightbox";


            descriptionLightbox.id =
                "descriptionLightbox";


            descriptionLightbox.innerHTML = `

                <button
                    class="description-lightbox-close"
                    id="descriptionLightboxClose"
                    type="button"
                    aria-label="Close image"
                >

                    <i class="fa-solid fa-xmark"></i>

                </button>


                <div class="description-lightbox-content">

                    <img
                        id="descriptionLightboxImage"
                        src=""
                        alt="Product preview"
                    >

                </div>

            `;


            document.body.appendChild(
                descriptionLightbox
            );


            descriptionLightboxImage =
                document.querySelector(
                    "#descriptionLightboxImage"
                );


            descriptionLightboxClose =
                document.querySelector(
                    "#descriptionLightboxClose"
                );

        }


        if (
            descriptionImages.length > 0 &&
            descriptionLightbox &&
            descriptionLightboxImage &&
            descriptionLightboxClose
        ) {


            /* ==========================
               OPEN
            ========================== */

            descriptionImages.forEach(
                function (image) {

                    image.addEventListener(
                        "click",
                        function () {

                            descriptionLightboxImage.src =
                                image.src;

                            descriptionLightboxImage.alt =
                                image.alt;


                            descriptionLightbox.classList.add(
                                "active"
                            );


                            document.body.style.overflow =
                                "hidden";

                        }
                    );

                }
            );


            /* ==========================
               CLOSE FUNCTION
            ========================== */

            function closeDescriptionLightbox() {

                descriptionLightbox.classList.remove(
                    "active"
                );


                descriptionLightboxImage.src =
                    "";


                document.body.style.overflow =
                    "";

            }


            /* ==========================
               CLOSE BUTTON
            ========================== */

            descriptionLightboxClose.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    event.stopPropagation();

                    closeDescriptionLightbox();

                }
            );


            /* ==========================
               CLICK OUTSIDE
            ========================== */

            descriptionLightbox.addEventListener(
                "click",
                function (event) {

                    if (
                        event.target ===
                        descriptionLightbox
                    ) {

                        closeDescriptionLightbox();

                    }

                }
            );


            /* ==========================
               ESCAPE
            ========================== */

            document.addEventListener(
                "keydown",
                function (event) {

                    if (
                        event.key === "Escape" &&
                        descriptionLightbox.classList.contains(
                            "active"
                        )
                    ) {

                        closeDescriptionLightbox();

                    }

                }
            );

        }



        /* ==================================================
           FOOTER NEWSLETTER
        ================================================== */

        const footerNewsletterForm =
            document.querySelector(
                "#footerNewsletterForm"
            );


        const footerNewsletterEmail =
            document.querySelector(
                "#footerNewsletterEmail"
            );


        if (footerNewsletterForm) {

            footerNewsletterForm.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    const email =
                        footerNewsletterEmail
                            ?
                            footerNewsletterEmail.value.trim()
                            :
                            "";


                    if (email === "") {

                        alert(
                            "Please enter your email."
                        );

                        return;

                    }


                    alert(
                        "Thank you for subscribing!"
                    );


                    footerNewsletterForm.reset();

                }
            );

        }



        /* ==================================================
           INITIAL CART
        ================================================== */

        renderCartSidebar();


    }
);
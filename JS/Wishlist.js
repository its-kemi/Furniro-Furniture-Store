
/* =========================================================
   WISHLIST
========================================================= */

let wishlist =
    JSON.parse(localStorage.getItem("wishlist")) || [];


/* =========================================================
   SAVE WISHLIST
========================================================= */

function saveWishlist() {
    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );
}


/* =========================================================
   GET PRODUCT DATA
========================================================= */

function getProductData(button) {

    const productCard =
        button.closest(".product-card");

    let productId =
        button.dataset.id ||
        productCard?.dataset.id;

    let productName =
        button.dataset.name ||
        productCard?.dataset.name;

    let productPrice =
        button.dataset.price ||
        productCard?.dataset.price;

    let productImage = null;

    if (productCard) {

        const image =
            productCard.querySelector(
                ".product-image img"
            );

        if (image) {
            productImage =
                image.getAttribute("src");
        }
    }

    /*
       اگر محصول داخل Product Card نباشد،
       اطلاعات را از خود صفحه Single Product می‌گیریم.
    */

    if (!productImage) {

        const image =
            document.querySelector(
                ".product-gallery img"
            ) ||
            document.querySelector(
                ".main-product-image img"
            ) ||
            document.querySelector(
                ".product-main-image img"
            );

        if (image) {
            productImage =
                image.getAttribute("src");
        }
    }

    return {
        id: productId,
        name: productName,
        price: Number(productPrice) || 0,
        image: productImage
    };
}


/* =========================================================
   UPDATE HEART STATE
========================================================= */

function updateWishlistButtons() {

    const likeButtons =
        document.querySelectorAll(
            ".like-product"
        );

    likeButtons.forEach(function(button) {

        const productId =
            button.dataset.id ||
            button.closest(".product-card")?.dataset.id;

        if (!productId) return;

        const isLiked =
            wishlist.some(function(item) {
                return String(item.id) ===
                    String(productId);
            });

        if (isLiked) {
            button.classList.add("liked");
        } else {
            button.classList.remove("liked");
        }
    });
}


/* =========================================================
   LIKE / UNLIKE
========================================================= */

document.addEventListener(
    "click",
    function(event) {

        const button =
            event.target.closest(
                ".like-product"
            );

        if (!button) return;


        const product =
            getProductData(button);

        if (!product.id) return;


        const existingIndex =
            wishlist.findIndex(function(item) {

                return String(item.id) ===
                    String(product.id);

            });


        /* =========================================
           ALREADY IN WISHLIST → REMOVE
        ========================================= */

        if (existingIndex !== -1) {

            wishlist.splice(
                existingIndex,
                1
            );

            button.classList.remove(
                "liked"
            );

        }


        /* =========================================
           NOT IN WISHLIST → ADD
        ========================================= */

        else {

            wishlist.push(product);

            button.classList.add(
                "liked"
            );

        }


        saveWishlist();

        updateWishlistButtons();

    }
);


/* =========================================================
   WISHLIST PAGE
========================================================= */

const wishlistGrid =
    document.querySelector(
        "#wishlistGrid"
    );

const emptyWishlist =
    document.querySelector(
        "#emptyWishlist"
    );


/* =========================================================
   FORMAT PRICE
========================================================= */

function formatWishlistPrice(price) {

    return new Intl.NumberFormat(
        "id-ID"
    ).format(price);
}


/* =========================================================
   RENDER WISHLIST
========================================================= */

function renderWishlist() {

    if (!wishlistGrid) return;


    wishlistGrid.innerHTML = "";


    if (wishlist.length === 0) {

        updateEmptyWishlist();

        return;
    }


    wishlist.forEach(function(product) {

        const card =
            document.createElement(
                "div"
            );

        card.className =
            "product-card";


        card.dataset.id =
            product.id;

        card.dataset.name =
            product.name;

        card.dataset.price =
            product.price;


        card.innerHTML = `

            <div class="product-image">

                <a href="Single-Product.html?id=${product.id}">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >

                </a>

            </div>


            <div class="product-info">

                <h3>
                    ${product.name}
                </h3>

                <p class="product-price">
                    Rp ${formatWishlistPrice(product.price)}
                </p>


                <div class="product-buttons">

                    <button
                        class="add-cart"
                        type="button"
                    >
                        Add to Cart
                    </button>

                    <button
                        class="remove-wishlist"
                        type="button"
                    >
                        Remove
                    </button>

                </div>

            </div>
        `;


        wishlistGrid.appendChild(card);

    });


    updateEmptyWishlist();

    addWishlistCartEvents();

    addWishlistProductClickEvents();

}


/* =========================================================
   EMPTY WISHLIST
========================================================= */

function updateEmptyWishlist() {

    if (!wishlistGrid || !emptyWishlist) {
        return;
    }


    if (wishlist.length === 0) {

        wishlistGrid.style.display =
            "none";

        emptyWishlist.style.display =
            "block";

    } else {

        wishlistGrid.style.display =
            "grid";

        emptyWishlist.style.display =
            "none";
    }
}


/* =========================================================
   REMOVE FROM WISHLIST
========================================================= */

document.addEventListener(
    "click",
    function(event) {

        const button =
            event.target.closest(
                ".remove-wishlist"
            );

        if (!button) return;


        const card =
            button.closest(
                ".product-card"
            );

        if (!card) return;


        const productId =
            card.dataset.id;


        wishlist =
            wishlist.filter(
                function(item) {

                    return String(item.id) !==
                        String(productId);

                }
            );


        saveWishlist();

        renderWishlist();

        updateWishlistButtons();

    }
);


/* =========================================================
   ADD WISHLIST PRODUCT TO CART
========================================================= */

function addWishlistCartEvents() {

    const buttons =
        document.querySelectorAll(
            "#wishlistGrid .add-cart"
        );


    buttons.forEach(function(button) {

        button.addEventListener(
            "click",
            function() {

                const card =
                    button.closest(
                        ".product-card"
                    );

                if (!card) return;


                const productId =
                    card.dataset.id;

                const productName =
                    card.dataset.name;

                const productPrice =
                    Number(
                        card.dataset.price
                    );


                const image =
                    card.querySelector(
                        ".product-image img"
                    );


                if (!image) return;


                let cart =
                    JSON.parse(
                        localStorage.getItem(
                            "cart"
                        )
                    ) || [];


                const existingProduct =
                    cart.find(
                        function(item) {

                            return String(item.id) ===
                                String(productId);

                        }
                    );


                if (existingProduct) {

                    existingProduct.quantity++;

                } else {

                    cart.push({

                        id: productId,

                        name: productName,

                        price: productPrice,

                        image:
                            image.getAttribute(
                                "src"
                            ),

                        quantity: 1

                    });

                }


                localStorage.setItem(
                    "cart",
                    JSON.stringify(cart)
                );

            }
        );

    });

}


/* =========================================================
   CLICK PRODUCT FROM WISHLIST
========================================================= */

function addWishlistProductClickEvents() {

    const cards =
        document.querySelectorAll(
            "#wishlistGrid .product-card"
        );


    cards.forEach(function(card) {

        const link =
            card.querySelector(
                ".product-image a"
            );

        if (!link) return;


        link.addEventListener(
            "click",
            function() {

                const productId =
                    card.dataset.id;

                if (!productId) return;


                /*
                   Product ID را نگه می‌داریم
                   تا Single Product بتواند
                   همان محصول را باز کند.
                */

                localStorage.setItem(
                    "selectedProductId",
                    productId
                );

            }
        );

    });

}


/* =========================================================
   INITIAL LOAD
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateWishlistButtons();

        renderWishlist();

    }
);
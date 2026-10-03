/* 
   ==========================================
   GET WISHLIST
   ==========================================
*/

let wishlist =
    JSON.parse(
        localStorage.getItem("wishlist")
    ) || [];



/* 
   ==========================================
   SAVE WISHLIST
   ==========================================
*/

function saveWishlist() {

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

}



/* 
   ==========================================
   LIKE PRODUCT
   ==========================================
*/

const likeButtons =
    document.querySelectorAll(
        ".like-product"
    );


likeButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const productCard =
                button.closest(
                    ".product-card"
                );


            if (!productCard) {

                return;

            }


            const productId =
                productCard.dataset.id;


            const productName =
                productCard.dataset.name;


            const productPrice =
                Number(
                    productCard.dataset.price
                );


            const productImage =
                productCard.querySelector(
                    ".product-image img"
                );


            if (!productImage) {

                return;

            }


            const existingProduct =
                wishlist.find(
                    function (item) {

                        return item.id === productId;

                    }
                );



            /* 
               REMOVE FROM WISHLIST
            */

            if (existingProduct) {

                wishlist =
                    wishlist.filter(
                        function (item) {

                            return item.id !== productId;

                        }
                    );


                button.classList.remove(
                    "liked"
                );


                alert(
                    productName +
                    " removed from wishlist."
                );

            }



            /* 
               ADD TO WISHLIST
            */

            else {

                wishlist.push({

                    id: productId,

                    name: productName,

                    price: productPrice,

                    image:
                        productImage.getAttribute(
                            "src"
                        )

                });


                button.classList.add(
                    "liked"
                );


                alert(
                    productName +
                    " added to wishlist."
                );

            }


            saveWishlist();

        }
    );

});



/* 
   ==========================================
   WISHLIST PAGE
   ==========================================
*/

const wishlistGrid =
    document.querySelector(
        "#wishlistGrid"
    );


const emptyWishlist =
    document.querySelector(
        "#emptyWishlist"
    );


if (wishlistGrid) {

    renderWishlist();

}



/* 
   ==========================================
   RENDER WISHLIST
   ==========================================
*/

function renderWishlist() {

    const oldItems =
        wishlistGrid.querySelectorAll(
            ".dynamic-wishlist-item"
        );


    oldItems.forEach(
        function (item) {

            item.remove();

        }
    );



    wishlist.forEach(
        function (product) {

            const item =
                document.createElement(
                    "article"
                );


            item.className =
                "wishlist-item dynamic-wishlist-item";



            item.innerHTML = `

                <div class="wishlist-image">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >

                </div>


                <div class="wishlist-info">

                    <h3>
                        ${product.name}
                    </h3>


                    <strong>
                        ${formatWishlistPrice(
                            product.price
                        )}
                    </strong>


                    <button
                        type="button"
                        class="add-cart wishlist-add-cart"
                        data-id="${product.id}"
                    >

                        <i class="fa-solid fa-cart-shopping"></i>

                        Add to Cart

                    </button>

                </div>


                <button
                    type="button"
                    class="remove-wishlist"
                    data-id="${product.id}"
                    aria-label="Remove from wishlist"
                >

                    <i class="fa-solid fa-trash-can"></i>

                </button>

            `;


            wishlistGrid.appendChild(
                item
            );

        }
    );



    addWishlistRemoveEvents();

    addWishlistCartEvents();

    addWishlistProductClickEvents();

    updateEmptyWishlist();

}



/* 
   ==========================================
   REMOVE FROM WISHLIST
   ==========================================
*/

function addWishlistRemoveEvents() {

    const removeButtons =
        document.querySelectorAll(
            ".dynamic-wishlist-item .remove-wishlist"
        );


    removeButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const productId =
                        button.dataset.id;


                    wishlist =
                        wishlist.filter(
                            function (item) {

                                return item.id !== productId;

                            }
                        );


                    saveWishlist();

                    renderWishlist();

                }
            );

        }
    );

}



/* 
   ==========================================
   ADD TO CART
   ==========================================
*/

function addWishlistCartEvents() {

    const cartButtons =
        document.querySelectorAll(
            ".wishlist-add-cart"
        );


    cartButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function (event) {

                    /*
                       جلوگیری از اجرای
                       کلیک روی خود محصول
                    */

                    event.stopPropagation();


                    const productId =
                        button.dataset.id;


                    const product =
                        wishlist.find(
                            function (item) {

                                return item.id === productId;

                            }
                        );


                    if (!product) {

                        return;

                    }



                    /*
                       GET CART
                    */

                    let cart =
                        JSON.parse(
                            localStorage.getItem(
                                "cart"
                            )
                        ) || [];



                    /*
                       CHECK EXISTING PRODUCT
                    */

                    const existingProduct =
                        cart.find(
                            function (item) {

                                return item.id === product.id;

                            }
                        );



                    /*
                       PRODUCT ALREADY EXISTS
                    */

                    if (existingProduct) {

                        existingProduct.quantity =
                            Number(
                                existingProduct.quantity || 1
                            ) + 1;

                    }



                    /*
                       NEW PRODUCT
                    */

                    else {

                        cart.push({

                            id: product.id,

                            name: product.name,

                            price: Number(
                                product.price
                            ),

                            image: product.image,

                            quantity: 1

                        });

                    }



                    /*
                       SAVE CART
                    */

                    localStorage.setItem(
                        "cart",
                        JSON.stringify(cart)
                    );



                    /*
                       GO TO CART
                    */

                    window.location.href =
                        "Cart.html";

                }
            );

        }
    );

}



/* 
   ==========================================
   CLICK PRODUCT
   GO TO CART
   ==========================================
*/

function addWishlistProductClickEvents() {

    const wishlistItems =
        document.querySelectorAll(
            ".dynamic-wishlist-item"
        );


    wishlistItems.forEach(
        function (item) {

            item.addEventListener(
                "click",
                function (event) {

                    /*
                       اگر روی Remove یا Add to Cart
                       کلیک شده باشد، این قسمت اجرا نشود
                    */

                    if (
                        event.target.closest(
                            ".remove-wishlist"
                        ) ||
                        event.target.closest(
                            ".wishlist-add-cart"
                        )
                    ) {

                        return;

                    }


                    const productId =
                        item
                            .querySelector(
                                ".remove-wishlist"
                            )
                            .dataset.id;


                    const product =
                        wishlist.find(
                            function (item) {

                                return item.id === productId;

                            }
                        );


                    if (!product) {

                        return;

                    }



                    /*
                       GET CART
                    */

                    let cart =
                        JSON.parse(
                            localStorage.getItem(
                                "cart"
                            )
                        ) || [];



                    /*
                       CHECK PRODUCT
                    */

                    const existingProduct =
                        cart.find(
                            function (cartItem) {

                                return (
                                    cartItem.id ===
                                    product.id
                                );

                            }
                        );



                    /*
                       IF EXISTS
                    */

                    if (existingProduct) {

                        existingProduct.quantity =
                            Number(
                                existingProduct.quantity || 1
                            ) + 1;

                    }



                    /*
                       IF NEW
                    */

                    else {

                        cart.push({

                            id: product.id,

                            name: product.name,

                            price: Number(
                                product.price
                            ),

                            image: product.image,

                            quantity: 1

                        });

                    }



                    /*
                       SAVE
                    */

                    localStorage.setItem(
                        "cart",
                        JSON.stringify(cart)
                    );



                    /*
                       GO TO CART
                    */

                    window.location.href =
                        "Cart.html";

                }
            );

        }
    );

}



/* 
   ==========================================
   EMPTY WISHLIST
   ==========================================
*/

function updateEmptyWishlist() {

    if (
        !wishlistGrid ||
        !emptyWishlist
    ) {

        return;

    }


    if (wishlist.length === 0) {

        wishlistGrid.style.display =
            "none";


        emptyWishlist.style.display =
            "block";

    }

    else {

        wishlistGrid.style.display =
            "grid";


        emptyWishlist.style.display =
            "none";

    }

}



/* 
   ==========================================
   FORMAT PRICE
   ==========================================
*/

function formatWishlistPrice(price) {

    return (
        "Rp " +
        Number(price).toLocaleString(
            "id-ID"
        )
    );

}
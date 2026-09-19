


/* 
   GET WISHLIST
 */

let wishlist =
    JSON.parse(
        localStorage.getItem("wishlist")
    ) || [];



/* 
   SAVE WISHLIST
 */

function saveWishlist() {

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

}



/* 
   LIKE PRODUCT
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


            const existingProduct =
                wishlist.find(
                    function (item) {

                        return item.id === productId;

                    }
                );


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

            } else {

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
   WISHLIST PAGE
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
   RENDER WISHLIST
 */

function renderWishlist() {

    const oldItems =
        wishlistGrid.querySelectorAll(
            ".dynamic-wishlist-item"
        );


    oldItems.forEach(function (item) {

        item.remove();

    });


    wishlist.forEach(function (product) {

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

            </div>


            <button
                class="remove-wishlist"
                data-id="${product.id}"
            >

                <i class="fa-solid fa-trash-can"></i>

            </button>

        `;


        wishlistGrid.appendChild(item);

    });


    addWishlistRemoveEvents();

    updateEmptyWishlist();

}



/* 
   REMOVE
 */

function addWishlistRemoveEvents() {

    const removeButtons =
        document.querySelectorAll(
            ".dynamic-wishlist-item .remove-wishlist"
        );


    removeButtons.forEach(function (button) {

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

    });

}



/* 
   EMPTY WISHLIST
 */

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



/* 
   FORMAT PRICE
 */

function formatWishlistPrice(price) {

    return (
        "Rp " +
        Number(price).toLocaleString(
            "id-ID"
        )
    );

}
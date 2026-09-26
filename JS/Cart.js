/* 
   CART SYSTEM
*/


/* 
   GET CART
*/

let cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || [];



/* 
   SAVE CART
*/

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}



/* 
   ADD TO CART
*/

const addCartButtons =
    document.querySelectorAll(
        ".add-cart"
    );


addCartButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {


            /* 
               GET PRODUCT CARD
            */

            const productCard =
                button.closest(
                    ".product-card"
                );


            if (!productCard) {

                return;

            }



            /* 
               GET PRODUCT INFORMATION
            */

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



            /* 
               CHECK EXISTING PRODUCT
            */

            const existingProduct =
                cart.find(function (item) {

                    return (
                        item.id ===
                        productId
                    );

                });



            /* 
               INCREASE QUANTITY
            */

            if (existingProduct) {

                existingProduct.quantity++;

            }



            /* 
               ADD NEW PRODUCT
            */

            else {

                cart.push({

                    id:
                        productId,

                    name:
                        productName,

                    price:
                        productPrice,

                    image:
                        productImage.getAttribute(
                            "src"
                        ),

                    quantity:
                        1

                });

            }



            /* 
               SAVE CART
            */

            saveCart();



            /* 
               MESSAGE
            */

            alert(
                productName +
                " added to cart!"
            );

        }
    );

});



/* 
   CART PAGE
*/

const cartProducts =
    document.querySelector(
        "#cartProducts"
    );


if (cartProducts) {

    renderCart();

}



/* 
   RENDER CART
*/

function renderCart() {


    /* 
       CHECK CART CONTAINER
    */

    if (!cartProducts) {

        return;

    }



    /* 
       REMOVE OLD DYNAMIC PRODUCTS
    */

    const oldProducts =
        cartProducts.querySelectorAll(
            ".dynamic-cart-product"
        );


    oldProducts.forEach(function (item) {

        item.remove();

    });



    /* 
       CREATE CART PRODUCTS
    */

    cart.forEach(function (product) {


        const cartProduct =
            document.createElement(
                "div"
            );


        cartProduct.className =
            "cart-product dynamic-cart-product";


        cartProduct.innerHTML = `

            <!-- PRODUCT INFO -->

            <div class="cart-product-info">

                <div class="cart-product-image">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >

                </div>


                <div class="cart-product-name">

                    <h3>
                        ${product.name}
                    </h3>

                    <span>
                        Furniture
                    </span>

                </div>

            </div>



            <!-- PRICE -->

            <div class="cart-price">

                ${formatPrice(
                    product.price
                )}

            </div>



            <!-- QUANTITY -->

            <div class="cart-quantity">

                <button
                    type="button"
                    class="quantity-minus"
                    data-id="${product.id}"
                >
                    −
                </button>


                <span>
                    ${product.quantity}
                </span>


                <button
                    type="button"
                    class="quantity-plus"
                    data-id="${product.id}"
                >
                    +
                </button>

            </div>



            <!-- SUBTOTAL -->

            <div class="cart-subtotal">

                ${formatPrice(
                    product.price *
                    product.quantity
                )}

            </div>



            <!-- REMOVE -->

            <button
                type="button"
                class="cart-remove"
                data-id="${product.id}"
                aria-label="Remove ${product.name}"
            >

                <i class="fa-solid fa-trash-can"></i>

            </button>

        `;


        cartProducts.appendChild(
            cartProduct
        );

    });



    /* 
       ADD EVENTS
    */

    addQuantityEvents();

    addRemoveEvents();



    /* 
       UPDATE TOTAL
    */

    updateCartTotals();

}



/* 
   FORMAT PRICE
*/

function formatPrice(price) {

    return (
        "Rp " +
        Number(price).toLocaleString(
            "id-ID"
        )
    );

}



/* 
   PLUS / MINUS
*/

function addQuantityEvents() {


    /* 
       MINUS BUTTONS
    */

    const minusButtons =
        document.querySelectorAll(
            ".quantity-minus"
        );


    /* 
       PLUS BUTTONS
    */

    const plusButtons =
        document.querySelectorAll(
            ".quantity-plus"
        );



    /* 
       MINUS
    */

    minusButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {


                const productId =
                    button.dataset.id;


                const product =
                    cart.find(function (item) {

                        return (
                            item.id ===
                            productId
                        );

                    });


                if (!product) {

                    return;

                }



                /* 
                   DECREASE ONLY IF
                   QUANTITY IS GREATER THAN 1
                */

                if (product.quantity > 1) {

                    product.quantity--;

                }



                /* 
                   SAVE
                */

                saveCart();



                /* 
                   RENDER AGAIN
                */

                renderCart();

            }
        );

    });



    /* 
       PLUS
    */

    plusButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {


                const productId =
                    button.dataset.id;


                const product =
                    cart.find(function (item) {

                        return (
                            item.id ===
                            productId
                        );

                    });


                if (!product) {

                    return;

                }



                /* 
                   INCREASE
                */

                product.quantity++;



                /* 
                   SAVE
                */

                saveCart();



                /* 
                   RENDER AGAIN
                */

                renderCart();

            }
        );

    });

}



/* 
   REMOVE PRODUCT
*/

function addRemoveEvents() {


    const removeButtons =
        document.querySelectorAll(
            ".dynamic-cart-product .cart-remove"
        );


    removeButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {


                const productId =
                    button.dataset.id;



                /* 
                   REMOVE PRODUCT
                */

                cart =
                    cart.filter(
                        function (item) {

                            return (
                                item.id !==
                                productId
                            );

                        }
                    );



                /* 
                   SAVE
                */

                saveCart();



                /* 
                   RENDER AGAIN
                */

                renderCart();

            }
        );

    });

}



/* 
   UPDATE TOTAL
*/

function updateCartTotals() {


    const totalRows =
        document.querySelectorAll(
            ".cart-total-row"
        );


    if (totalRows.length < 2) {

        return;

    }



    const subtotalElement =
        totalRows[0].querySelector(
            "strong"
        );


    const totalElement =
        totalRows[1].querySelector(
            "strong"
        );


    if (
        !subtotalElement ||
        !totalElement
    ) {

        return;

    }



    /* 
       CALCULATE TOTAL
    */

    let total = 0;


    cart.forEach(function (product) {

        total +=
            product.price *
            product.quantity;

    });



    /* 
       SHOW SUBTOTAL
    */

    subtotalElement.textContent =
        formatPrice(total);



    /* 
       SHOW TOTAL
    */

    totalElement.textContent =
        formatPrice(total);

}



/* 
   CHECKOUT BUTTON
*/

const checkoutButton =
    document.getElementById(
        "checkoutButton"
    );


if (checkoutButton) {

    checkoutButton.addEventListener(
        "click",
        function () {


            /* 
               CHECK EMPTY CART
            */

            if (cart.length === 0) {

                alert(
                    "Your cart is empty."
                );

                return;

            }



            /* 
               GO TO CHECKOUT
            */

            window.location.href =
                "Checkout.html";

        }
    );

}
/* 
   CHECKOUT SYSTEM
*/


/* 
   GET CART
*/

const checkoutCart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || [];



/* 
   GET CHECKOUT ELEMENTS
*/

const checkoutProducts =
    document.getElementById(
        "checkoutProducts"
    );


const checkoutSubtotal =
    document.getElementById(
        "checkoutSubtotal"
    );


const checkoutTotal =
    document.getElementById(
        "checkoutTotal"
    );


const checkoutForm =
    document.getElementById(
        "checkoutForm"
    );



/* 
   FORMAT PRICE
*/

function formatCheckoutPrice(price) {

    return (
        "Rp " +
        Number(price).toLocaleString(
            "id-ID"
        )
    );

}



/* 
   RENDER CHECKOUT PRODUCTS
*/

function renderCheckoutProducts() {


    if (!checkoutProducts) {

        return;

    }


    checkoutProducts.innerHTML = "";



    /* 
       CHECK EMPTY CART
    */

    if (checkoutCart.length === 0) {

        checkoutProducts.innerHTML = `

            <div class="checkout-empty">

                <i class="fa-solid fa-cart-shopping"></i>

                <h3>
                    Your cart is empty
                </h3>

                <a href="Shop.html">
                    Continue Shopping
                </a>

            </div>

        `;

        return;

    }



    /* 
       CREATE PRODUCTS
    */

    checkoutCart.forEach(
        function (product) {


            const checkoutProduct =
                document.createElement(
                    "div"
                );


            checkoutProduct.className =
                "checkout-product";


            checkoutProduct.innerHTML = `

                <div class="checkout-product-image">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >

                </div>


                <div class="checkout-product-info">

                    <h3>
                        ${product.name}
                    </h3>

                    <p>
                        Quantity:
                        ${product.quantity}
                    </p>

                </div>


                <div class="checkout-product-price">

                    ${formatCheckoutPrice(
                        product.price *
                        product.quantity
                    )}

                </div>

            `;


            checkoutProducts.appendChild(
                checkoutProduct
            );

        }
    );

}



/* 
   CALCULATE TOTAL
*/

function calculateCheckoutTotal() {


    let total = 0;


    checkoutCart.forEach(
        function (product) {

            total +=
                product.price *
                product.quantity;

        }
    );


    return total;

}



/* 
   UPDATE TOTAL
*/

function updateCheckoutTotal() {


    const total =
        calculateCheckoutTotal();


    if (checkoutSubtotal) {

        checkoutSubtotal.textContent =
            formatCheckoutPrice(total);

    }


    if (checkoutTotal) {

        checkoutTotal.textContent =
            formatCheckoutPrice(total);

    }

}



/* 
   LOAD CURRENT USER
*/

function loadCheckoutUser() {


    const currentUser =
        JSON.parse(
            localStorage.getItem(
                "furniroCurrentUser"
            )
        );


    if (!currentUser) {

        return;

    }



    const nameInput =
        document.getElementById(
            "checkout-name"
        );


    const emailInput =
        document.getElementById(
            "checkout-email"
        );


    if (nameInput) {

        nameInput.value =
            currentUser.name || "";

    }


    if (emailInput) {

        emailInput.value =
            currentUser.email || "";

    }

}



/* 
   PLACE ORDER
*/

if (checkoutForm) {

    checkoutForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();



            /* 
               CHECK CART
            */

            if (checkoutCart.length === 0) {

                alert(
                    "Your cart is empty."
                );

                return;

            }



            /* 
               GET FORM VALUES
            */

            const name =
                document
                    .getElementById(
                        "checkout-name"
                    )
                    .value
                    .trim();


            const email =
                document
                    .getElementById(
                        "checkout-email"
                    )
                    .value
                    .trim();


            const phone =
                document
                    .getElementById(
                        "checkout-phone"
                    )
                    .value
                    .trim();


            const address =
                document
                    .getElementById(
                        "checkout-address"
                    )
                    .value
                    .trim();


            const city =
                document
                    .getElementById(
                        "checkout-city"
                    )
                    .value
                    .trim();


            const payment =
                document
                    .getElementById(
                        "checkout-payment"
                    )
                    .value;



            /* 
               CHECK INFORMATION
            */

            if (
                !name ||
                !email ||
                !phone ||
                !address ||
                !city ||
                !payment
            ) {

                alert(
                    "Please complete all required fields."
                );

                return;

            }



            /* 
               CALCULATE TOTAL
            */

            const total =
                calculateCheckoutTotal();



            /* 
               GET EXISTING ORDERS
            */

            const orders =
                JSON.parse(
                    localStorage.getItem(
                        "furniroOrders"
                    )
                ) || [];



            /* 
               CREATE ORDER ID
            */

            const orderId =
                "ORD-" +
                Date.now();



            /* 
               CREATE ORDER
            */

            const newOrder = {

                id:
                    orderId,

                date:
                    new Date().toISOString(),

                customer: {

                    name:
                        name,

                    email:
                        email,

                    phone:
                        phone,

                    address:
                        address,

                    city:
                        city

                },

                payment:
                    payment,

                items:
                    checkoutCart.map(
                        function (product) {

                            return {

                                id:
                                    product.id,

                                name:
                                    product.name,

                                price:
                                    product.price,

                                image:
                                    product.image,

                                quantity:
                                    product.quantity

                            };

                        }
                    ),

                total:
                    total,

                status:
                    "Processing"

            };



            /* 
               SAVE ORDER
            */

            orders.push(
                newOrder
            );


            localStorage.setItem(
                "furniroOrders",
                JSON.stringify(orders)
            );



            /* 
               CLEAR CART
            */

            localStorage.removeItem(
                "cart"
            );



            /* 
               MESSAGE
            */

            alert(
                "Your order has been placed successfully!"
            );



            /* 
               GO TO ORDERS
            */

            window.location.href =
                "Orders.html";

        }
    );

}



/* 
   LOAD CHECKOUT
*/

renderCheckoutProducts();

updateCheckoutTotal();

loadCheckoutUser();
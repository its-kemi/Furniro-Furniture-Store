/*
   ORDERS SYSTEM
*/


/*
   GET ORDERS
*/

const orders =
    JSON.parse(
        localStorage.getItem(
            "furniroOrders"
        )
    ) || [];


/*
   GET ELEMENTS
*/

const ordersList =
    document.getElementById(
        "ordersList"
    );

const emptyOrders =
    document.getElementById(
        "emptyOrders"
    );


/*
   FORMAT PRICE
*/

function formatOrderPrice(price) {

    return (
        "Rp " +
        Number(price).toLocaleString(
            "id-ID"
        )
    );

}


/*
   FORMAT DATE
*/

function formatOrderDate(date) {

    const orderDate =
        new Date(date);

    return orderDate.toLocaleDateString(
        "en-US",
        {
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    );

}


/*
   RENDER ORDERS
*/

function renderOrders() {

    if (!ordersList) {
        return;
    }


    /*
       CLEAR OLD ORDERS
    */

    ordersList.innerHTML = "";


    /*
       CHECK EMPTY ORDERS
    */

    if (orders.length === 0) {

        if (emptyOrders) {
            emptyOrders.style.display =
                "block";
        }

        return;
    }


    /*
       HIDE EMPTY MESSAGE
    */

    if (emptyOrders) {
        emptyOrders.style.display =
            "none";
    }


    /*
       CREATE ORDER CARDS
    */

    orders.forEach(
        function (order) {

            const orderCard =
                document.createElement(
                    "div"
                );

            orderCard.className =
                "order-card";


            /*
               CREATE ITEMS HTML
            */

            let itemsHTML = "";


            order.items.forEach(
                function (item) {

                    itemsHTML += `

                        <div class="order-item">

                            <div class="order-item-image">

                                <img
                                    src="${item.image}"
                                    alt="${item.name}"
                                >

                            </div>

                            <div class="order-item-info">

                                <h3>
                                    ${item.name}
                                </h3>

                                <p>
                                    Quantity:
                                    ${item.quantity}
                                </p>

                                <span>
                                    ${formatOrderPrice(item.price)}
                                </span>

                            </div>

                        </div>

                    `;

                }
            );


            /*
               CREATE ORDER CARD
            */

            orderCard.innerHTML = `

                <div class="order-header">

                    <div>

                        <h2>
                            Order #${order.id}
                        </h2>

                        <p>
                            ${formatOrderDate(order.date)}
                        </p>

                    </div>

                    <span class="order-status">
                        ${order.status}
                    </span>

                </div>


                <div class="order-customer">

                    <h3>
                        Customer Information
                    </h3>

                    <p>
                        <strong>Name:</strong>
                        ${order.customer.name}
                    </p>

                    <p>
                        <strong>Email:</strong>
                        ${order.customer.email}
                    </p>

                    <p>
                        <strong>Phone:</strong>
                        ${order.customer.phone}
                    </p>

                    <p>
                        <strong>Address:</strong>
                        ${order.customer.address},
                        ${order.customer.city}
                    </p>

                    <p>
                        <strong>Payment:</strong>
                        ${order.payment}
                    </p>

                </div>


                <div class="order-items">

                    <h3>
                        Ordered Products
                    </h3>

                    ${itemsHTML}

                </div>


                <div class="order-footer">

                    <div>

                        <span>
                            Total
                        </span>

                        <strong>
                            ${formatOrderPrice(order.total)}
                        </strong>

                    </div>

                </div>

            `;


            ordersList.appendChild(
                orderCard
            );

        }
    );

}


/*
   LOAD ORDERS
*/

renderOrders();
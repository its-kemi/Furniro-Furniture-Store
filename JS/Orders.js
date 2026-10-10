
/* =========================================================
   FURNIRO FURNITURE STORE
   ORDERS PAGE
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       1. SELECT HTML ELEMENTS
    ===================================================== */

    const ordersList = document.getElementById("ordersList");
    const emptyOrders = document.getElementById("emptyOrders");


    /* =====================================================
       2. GET ORDERS FROM LOCAL STORAGE
    ===================================================== */

    let orders = [];

    try {
        orders = JSON.parse(
            localStorage.getItem("furniroOrders")
        ) || [];
    } catch (error) {
        console.error("Unable to read orders:", error);
        orders = [];
    }


    /* =====================================================
       3. FORMAT PRICE
    ===================================================== */

    function formatOrderPrice(order, price) {

        const currency = order.currency || "IDR";

        const amount = Number(price) || 0;

        try {
            return new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: currency,
                maximumFractionDigits: 2
            }).format(amount);

        } catch (error) {
            return currency + " " + amount.toLocaleString("en-US");
        }
    }


    /* =====================================================
       4. FORMAT DATE
    ===================================================== */

    function formatOrderDate(date) {

        if (!date) {
            return "Date unavailable";
        }

        const orderDate = new Date(date);

        if (Number.isNaN(orderDate.getTime())) {
            return "Date unavailable";
        }

        return orderDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    }


    /* =====================================================
       5. CREATE SAFE HTML TEXT
    ===================================================== */

    function escapeHTML(value) {

        return String(value ?? "").replace(
            /[&<>"']/g,
            function (character) {

                const entities = {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#39;"
                };

                return entities[character];
            }
        );
    }


    /* =====================================================
       6. GET ORDER STATUS CLASS
    ===================================================== */

    function getStatusClass(status) {

        const normalizedStatus = String(
            status || "Processing"
        ).toLowerCase();

        if (
            normalizedStatus.includes("approved") ||
            normalizedStatus.includes("completed") ||
            normalizedStatus.includes("delivered")
        ) {
            return "status-success";
        }

        if (
            normalizedStatus.includes("rejected") ||
            normalizedStatus.includes("cancelled")
        ) {
            return "status-danger";
        }

        if (
            normalizedStatus.includes("pending") ||
            normalizedStatus.includes("awaiting")
        ) {
            return "status-pending";
        }

        return "status-processing";
    }


    /* =====================================================
       7. GET PAYMENT STATUS
    ===================================================== */

    function getPaymentStatus(order) {

        if (order.paymentStatus) {
            return order.paymentStatus;
        }

        if (
            String(order.payment || "").toLowerCase()
                .includes("bank")
        ) {
            return "Awaiting Bank Transfer Review";
        }

        return "Pay on Delivery";
    }


    /* =====================================================
       8. RENDER ORDER PRODUCTS
    ===================================================== */

    function renderOrderItems(order) {

        if (
            !Array.isArray(order.items) ||
            order.items.length === 0
        ) {
            return `
                <p class="orders-no-items">
                    No product details available.
                </p>
            `;
        }

        return order.items.map(function (item) {

            const name = escapeHTML(
                item.name || item.title || "Furniture Product"
            );

            const image = escapeHTML(
                item.image || "assite/Header-images/logo.png"
            );

            const quantity = Math.max(
                1,
                Number(item.quantity) || 1
            );

            const price = Number(item.price) || 0;

            return `
                <div class="order-item">

                    <div class="order-item-image">
                        <img
                            src="${image}"
                            alt="${name}"
                            loading="lazy"
                            onerror="this.style.display='none'"
                        >
                    </div>

                    <div class="order-item-info">

                        <h4>${name}</h4>

                        <p>
                            Quantity: ${quantity}
                        </p>

                        <span>
                            ${formatOrderPrice(order, price)}
                        </span>

                    </div>

                </div>
            `;

        }).join("");
    }


    /* =====================================================
       9. RENDER ONE ORDER
    ===================================================== */

    function renderOrder(order) {

        const orderId = escapeHTML(
            order.id || "N/A"
        );

        const orderDate = formatOrderDate(order.date);

        const status = escapeHTML(
            order.status || "Processing"
        );

        const customer = order.customer || {};

        const customerName = escapeHTML(
            customer.name || "Not provided"
        );

        const customerEmail = escapeHTML(
            customer.email || "Not provided"
        );

        const customerPhone = escapeHTML(
            customer.phone || "Not provided"
        );

        const customerAddress = escapeHTML(
            customer.address || "Not provided"
        );

        const customerCity = escapeHTML(
            customer.city || "Not provided"
        );

        const customerCountry = escapeHTML(
            customer.country || "Not provided"
        );

        const payment = escapeHTML(
            order.payment || "Not specified"
        );

        const paymentStatus = escapeHTML(
            getPaymentStatus(order)
        );

        const shipping = order.shipping || {};

        const shippingMethod = escapeHTML(
            typeof shipping === "object"
                ? shipping.method || "standard"
                : shipping || "standard"
        );

        const currency = escapeHTML(
            order.currency || "IDR"
        );

        const subtotal = Number(order.subtotal) || 0;

        const shippingCost = Number(
            typeof shipping === "object"
                ? shipping.cost
                : order.shippingCost
        ) || 0;

        const total = Number(
            order.total
        ) || 0;

        const orderCard = document.createElement("article");

        orderCard.className = "order-card";

        orderCard.innerHTML = `

            <!-- ORDER HEADER -->

            <div class="order-header">

                <div>
                    <h2>Order #${orderId}</h2>

                    <p>
                        ${orderDate}
                    </p>
                </div>

                <span class="order-status ${getStatusClass(status)}">
                    ${status}
                </span>

            </div>


            <!-- CUSTOMER INFORMATION -->

            <section class="order-customer">

                <h3>
                    <i class="fa-solid fa-user"></i>
                    Customer Information
                </h3>

                <p>
                    <strong>Name:</strong>
                    ${customerName}
                </p>

                <p>
                    <strong>Email:</strong>
                    ${customerEmail}
                </p>

                <p>
                    <strong>Phone:</strong>
                    ${customerPhone}
                </p>

                <p>
                    <strong>Address:</strong>
                    ${customerAddress}
                </p>

                <p>
                    <strong>City:</strong>
                    ${customerCity}
                </p>

                <p>
                    <strong>Country:</strong>
                    ${customerCountry}
                </p>

            </section>


            <!-- SHIPPING INFORMATION -->

            <section class="order-shipping">

                <h3>
                    <i class="fa-solid fa-truck"></i>
                    Shipping Information
                </h3>

                <p>
                    <strong>Method:</strong>
                    ${shippingMethod}
                </p>

                <p>
                    <strong>Shipping Cost:</strong>
                    ${formatOrderPrice(order, shippingCost)}
                </p>

            </section>


            <!-- PAYMENT INFORMATION -->

            <section class="order-payment">

                <h3>
                    <i class="fa-solid fa-credit-card"></i>
                    Payment Information
                </h3>

                <p>
                    <strong>Payment Method:</strong>
                    ${payment}
                </p>

                <p>
                    <strong>Payment Status:</strong>
                    <span class="payment-status">
                        ${paymentStatus}
                    </span>
                </p>

            </section>


            <!-- ORDERED PRODUCTS -->

            <section class="order-items">

                <h3>
                    <i class="fa-solid fa-couch"></i>
                    Ordered Products
                </h3>

                ${renderOrderItems(order)}

            </section>


            <!-- ORDER TOTALS -->

            <div class="order-footer">

                <div class="order-total-row">
                    <span>Subtotal</span>

                    <strong>
                        ${formatOrderPrice(order, subtotal)}
                    </strong>
                </div>

                <div class="order-total-row">
                    <span>Shipping</span>

                    <strong>
                        ${formatOrderPrice(order, shippingCost)}
                    </strong>
                </div>

                <div class="order-total-row order-grand-total">
                    <span>Total</span>

                    <strong>
                        ${formatOrderPrice(order, total)}
                    </strong>
                </div>

                <p class="order-currency-note">
                    Currency: ${currency}
                </p>

            </div>

        `;

        return orderCard;
    }


    /* =====================================================
       10. RENDER ALL ORDERS
    ===================================================== */

    function renderOrders() {

        if (!ordersList) {
            console.error(
                'Element "#ordersList" was not found.'
            );

            return;
        }

        ordersList.innerHTML = "";

        if (orders.length === 0) {

            if (emptyOrders) {
                emptyOrders.style.display = "block";
            }

            return;
        }

        if (emptyOrders) {
            emptyOrders.style.display = "none";
        }

        orders.forEach(function (order) {

            const orderCard = renderOrder(order);

            ordersList.appendChild(orderCard);

        });

    }


    /* =====================================================
       11. INITIALIZE ORDERS PAGE
    ===================================================== */

    renderOrders();

});

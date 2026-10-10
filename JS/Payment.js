
/*
=========================================================
 FURNIRO DEMO PAYMENT
 Finalizes pending demo orders
 No real payment processing
=========================================================
*/

document.addEventListener("DOMContentLoaded", function () {

    const params = new URLSearchParams(window.location.search);
    const method = params.get("method");

    const title = document.getElementById("paymentTitle");
    const description = document.getElementById("paymentDescription");
    const icon = document.getElementById("paymentIcon");
    const orderIdElement = document.getElementById("paymentOrderId");
    const totalElement = document.getElementById("paymentTotal");

    const cardPanel = document.getElementById("cardDemo");
    const bankPanel = document.getElementById("bankDemo");

    const cardButton = document.getElementById("confirmCardPayment");
    const bankButton = document.getElementById("confirmBankPayment");

    let pendingOrder = null;

    try {
        pendingOrder = JSON.parse(
            localStorage.getItem("furniroPendingOrder")
        );
    } catch (error) {
        pendingOrder = null;
    }

    function showAlert(options) {
        if (typeof Swal !== "undefined") {
            return Swal.fire(options);
        }

        alert(options.text || options.title || "");
        return Promise.resolve({ isConfirmed: true });
    }

    function formatTotal(order) {
        const displayTotal = order.displayTotals?.total;

        if (typeof displayTotal === "number") {
            try {
                return new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: order.currency || "IDR",
                    maximumFractionDigits: 2
                }).format(displayTotal);
            } catch (error) {
                // Fall back to the stored order amount.
            }
        }

        return (order.currency || "IDR") + " " +
            (Number(order.total) || 0).toLocaleString("en-US");
    }

    if (
        !pendingOrder ||
        !Array.isArray(pendingOrder.items) ||
        pendingOrder.items.length === 0 ||
        !["card", "bank"].includes(method) ||
        pendingOrder.payment !== method
    ) {
        showAlert({
            icon: "warning",
            title: "No Pending Payment",
            text: "Please start checkout again to create a valid demo order."
        }).then(function () {
            window.location.href = "Checkout.html";
        });

        return;
    }

    orderIdElement.textContent = pendingOrder.id;
    totalElement.textContent = formatTotal(pendingOrder);

    if (method === "card") {
        title.textContent = "Demo Online Payment";
        description.textContent =
            "Simulate an online payment for your university project. No money will be transferred.";
        icon.className = "fa-solid fa-credit-card";
        cardPanel.hidden = false;
    } else {
        title.textContent = "Bank Transfer Demo";
        description.textContent =
            "This simulates a bank transfer submission. No bank account or real transfer is involved.";
        icon.className = "fa-solid fa-building-columns";
        bankPanel.hidden = false;
    }

    function finalizeOrder(paymentStatus) {
        const button = method === "card" ? cardButton : bankButton;

        if (button) {
            button.disabled = true;
            button.textContent = "Finalizing Demo Order...";
        }

        try {
            let orders = [];

            try {
                orders = JSON.parse(
                    localStorage.getItem("furniroOrders")
                ) || [];
            } catch (error) {
                orders = [];
            }

            /*
             Prevent accidental duplicate submission after a refresh.
            */
            const alreadySaved = orders.some(function (order) {
                return order.id === pendingOrder.id;
            });

            if (!alreadySaved) {
                pendingOrder.paymentStatus = paymentStatus;
                pendingOrder.status = "Processing";
                pendingOrder.paymentCompletedAt =
                    new Date().toISOString();

                orders.push(pendingOrder);

                localStorage.setItem(
                    "furniroOrders",
                    JSON.stringify(orders)
                );
            }

            localStorage.removeItem("furniroPendingOrder");
            localStorage.removeItem("cart");

            showAlert({
                icon: "success",
                title: method === "card"
                    ? "Demo Payment Successful!"
                    : "Demo Transfer Submitted!",
                text: method === "card"
                    ? "Your simulated payment was successful. No real money was charged."
                    : "Your simulated bank transfer was recorded. No real money was transferred.",
                confirmButtonText: "View My Orders"
            }).then(function () {
                window.location.href = "Orders.html";
            });

        } catch (error) {
            console.error("Unable to finalize demo order:", error);

            showAlert({
                icon: "error",
                title: "Unable to Save Order",
                text: "Please try again. Your pending demo order has not been intentionally cleared."
            });

            if (button) {
                button.disabled = false;
            }
        }
    }

    cardButton?.addEventListener("click", function () {
        finalizeOrder("Demo Payment Successful");
    });

    bankButton?.addEventListener("click", function () {
        finalizeOrder("Demo Transfer Submitted - Pending Review");
    });

});

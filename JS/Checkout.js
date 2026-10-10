/*
=========================================================
 FURNIRO CHECKOUT SYSTEM
 Currency Conversion
 Shipping Methods
 Payment Methods
 Order Creation
=========================================================
*/

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       1. GET HTML ELEMENTS
    ===================================================== */

    const checkoutForm = document.getElementById("checkoutForm");

    const productsContainer =
        document.getElementById("checkoutProducts");

    const subtotalElement =
        document.getElementById("checkoutSubtotal");

    const totalElement =
        document.getElementById("checkoutTotal");

    const shippingElement =
        document.getElementById("checkoutShipping");

    const countrySelect =
        document.getElementById("checkout-country");

    const shippingSelect =
        document.getElementById("checkout-shipping");

    const paymentSelect =
        document.getElementById("checkout-payment");

    const currencyElement =
        document.getElementById("checkoutCurrency");

    const paymentNote =
        document.getElementById("paymentNote");

    const submitButton =
        checkoutForm
            ? checkoutForm.querySelector('[type="submit"]')
            : null;


    /* =====================================================
       2. GET CART
    ===================================================== */

    let cart = [];

    try {
        cart = JSON.parse(localStorage.getItem("cart")) || [];
    } catch (error) {
        cart = [];
    }


    /* =====================================================
       3. GET CURRENT USER
    ===================================================== */

    let currentUser = null;

    try {
        currentUser = JSON.parse(
            localStorage.getItem("furniroCurrentUser")
        );
    } catch (error) {
        currentUser = null;
    }


    /* =====================================================
       4. CURRENCY SETTINGS
       Product prices are assumed to be in IDR.
    ===================================================== */

    const countryCurrencies = {
        AF: { currency: "AFN", name: "Afghanistan" },
        US: { currency: "USD", name: "United States" },
        GB: { currency: "GBP", name: "United Kingdom" },
        DE: { currency: "EUR", name: "Germany" },
        FR: { currency: "EUR", name: "France" },
        IT: { currency: "EUR", name: "Italy" },
        ES: { currency: "EUR", name: "Spain" },
        NL: { currency: "EUR", name: "Netherlands" },
        PK: { currency: "PKR", name: "Pakistan" },
        CA: { currency: "CAD", name: "Canada" },
        AU: { currency: "AUD", name: "Australia" },
        SA: { currency: "SAR", name: "Saudi Arabia" },
        AE: { currency: "AED", name: "United Arab Emirates" },
        TR: { currency: "TRY", name: "Turkey" },
        IN: { currency: "INR", name: "India" },
        ID: { currency: "IDR", name: "Indonesia" },
        JP: { currency: "JPY", name: "Japan" },
        CN: { currency: "CNY", name: "China" }
    };

    let selectedCurrency = "IDR";
    let exchangeRates = { IDR: 1 };
    let ratesLoaded = false;


    /* =====================================================
       5. SHIPPING METHODS
       These are example prices in IDR.
       Change them to your actual delivery fees.
    ===================================================== */

    const shippingMethods = {
        standard: {
            name: "Standard Shipping",
            price: 50000
        },

        express: {
            name: "Express Shipping",
            price: 100000
        },

        pickup: {
            name: "Store Pickup",
            price: 0
        }
    };


    /* =====================================================
       6. GET SHIPPING COST
    ===================================================== */

    function getShippingCost() {

        if (!shippingSelect) {
            return 0;
        }

        const method = shippingSelect.value;

        if (shippingMethods[method]) {
            return shippingMethods[method].price;
        }

        return 0;
    }


    /* =====================================================
       7. FORMAT CURRENCY
    ===================================================== */

    function formatPrice(price) {

        const amount = Number(price) || 0;

        try {
            return new Intl.NumberFormat("en", {
                style: "currency",
                currency: selectedCurrency,
                maximumFractionDigits:
                    ["IDR", "JPY", "AFN"].includes(selectedCurrency)
                        ? 0
                        : 2
            }).format(amount);
        } catch (error) {
            return selectedCurrency + " " + amount.toFixed(2);
        }
    }


    /* =====================================================
       8. CONVERT IDR TO SELECTED CURRENCY
    ===================================================== */

    function convertPrice(idrAmount) {

        const rate = exchangeRates[selectedCurrency];

        if (typeof rate !== "number" || !Number.isFinite(rate)) {
            return null;
        }

        return Number(idrAmount) * rate;
    }


    /* =====================================================
       9. LOAD LIVE EXCHANGE RATES
    ===================================================== */

    async function loadExchangeRates() {

        try {

            if (currencyElement) {
                currencyElement.textContent =
                    "Loading exchange rates...";
            }

            const response = await fetch(
                "https://open.er-api.com/v6/latest/IDR"
            );

            if (!response.ok) {
                throw new Error("Exchange rate request failed.");
            }

            const data = await response.json();

            if (
                data.result !== "success" ||
                !data.rates ||
                typeof data.rates.IDR !== "number"
            ) {
                throw new Error("Invalid exchange rate data.");
            }

            exchangeRates = data.rates;
            ratesLoaded = true;

            if (currencyElement) {
                currencyElement.textContent =
                    "Currency: " + selectedCurrency;
            }

            renderCheckout();

        } catch (error) {

            console.error(
                "Unable to load exchange rates:",
                error
            );

            ratesLoaded = false;

            if (currencyElement) {
                currencyElement.textContent =
                    "Exchange rates unavailable. Please try again.";
            }

            renderCheckout();
        }
    }


    /* =====================================================
       10. CALCULATE CART SUBTOTAL IN IDR
    ===================================================== */

    function calculateSubtotal() {

        return cart.reduce(function (total, item) {

            const price = Number(item.price) || 0;

            const quantity = Math.max(
                1,
                Number(item.quantity) || 1
            );

            return total + price * quantity;

        }, 0);
    }


    /* =====================================================
       11. RENDER CHECKOUT PRODUCTS
    ===================================================== */

    function renderProducts() {

        if (!productsContainer) {
            return;
        }

        productsContainer.innerHTML = "";

        if (cart.length === 0) {

            productsContainer.innerHTML = `
                <p class="checkout-empty">
                    Your cart is empty.
                    <a href="Shop.html">Continue shopping</a>
                </p>
            `;

            return;
        }

        cart.forEach(function (item) {

            const quantity = Math.max(
                1,
                Number(item.quantity) || 1
            );

            const idrPrice =
                (Number(item.price) || 0) * quantity;

            const convertedPrice = convertPrice(idrPrice);

            const priceText =
                convertedPrice === null
                    ? "Exchange rate unavailable"
                    : formatPrice(convertedPrice);

            const product = document.createElement("div");

            product.className = "checkout-product";

            const image = document.createElement("img");

            image.src = item.image || "assite/Header-images/logo.png";
            image.alt = item.name || "Furniture product";
            image.className = "checkout-product-image";

            const info = document.createElement("div");

            info.className = "checkout-product-info";

            const name = document.createElement("h3");

            name.textContent = item.name || "Furniture Product";

            const quantityText = document.createElement("p");

            quantityText.textContent =
                "Quantity: " + quantity;

            const priceTextElement = document.createElement("strong");

            priceTextElement.textContent = priceText;

            info.appendChild(name);
            info.appendChild(quantityText);
            info.appendChild(priceTextElement);

            product.appendChild(image);
            product.appendChild(info);

            productsContainer.appendChild(product);
        });
    }


    /* =====================================================
       12. RENDER CHECKOUT TOTALS
    ===================================================== */

    function renderCheckout() {

        const subtotalIDR = calculateSubtotal();

        const shippingIDR = getShippingCost();

        const totalIDR = subtotalIDR + shippingIDR;

        const subtotal = convertPrice(subtotalIDR);

        const shipping = convertPrice(shippingIDR);

        const total = convertPrice(totalIDR);

        if (subtotalElement) {
            subtotalElement.textContent =
                subtotal === null
                    ? "Unavailable"
                    : formatPrice(subtotal);
        }

        if (shippingElement) {
            shippingElement.textContent =
                shipping === null
                    ? "Unavailable"
                    : formatPrice(shipping);
        }

        if (totalElement) {
            totalElement.textContent =
                total === null
                    ? "Unavailable"
                    : formatPrice(total);
        }

        if (currencyElement && ratesLoaded) {
            currencyElement.textContent =
                "Currency: " + selectedCurrency;
        }

        renderProducts();
    }


    /* =====================================================
       13. UPDATE CURRENCY FROM COUNTRY
    ===================================================== */

    function updateCurrency() {

        if (!countrySelect) {
            return;
        }

        const countryCode = countrySelect.value;

        const country = countryCurrencies[countryCode];

        if (!country) {
            selectedCurrency = "IDR";
        } else {
            selectedCurrency = country.currency;
        }

        renderCheckout();
    }


    /* =====================================================
       14. UPDATE PAYMENT INFORMATION
    ===================================================== */

    function updatePaymentNote() {

        if (!paymentSelect || !paymentNote) {
            return;
        }

        const paymentMethod = paymentSelect.value;

        if (paymentMethod === "cash") {

            paymentNote.textContent =
                "Cash on Delivery: pay the delivery person when your order arrives.";

        } else if (paymentMethod === "bank") {

            paymentNote.textContent =
                "Bank Transfer: this demo records your selected method only. " +
                "It does not process or verify a real bank transfer.";

        } else {

            paymentNote.textContent =
                "Choose a payment method to see its information.";
        }
    }


    /* =====================================================
       15. FILL CUSTOMER INFORMATION
    ===================================================== */

    if (currentUser) {

        const nameInput =
            document.getElementById("checkout-name");

        const emailInput =
            document.getElementById("checkout-email");

        if (nameInput && currentUser.name) {
            nameInput.value = currentUser.name;
        }

        if (emailInput && currentUser.email) {
            emailInput.value = currentUser.email;
        }
    }


    /* =====================================================
       16. CREATE ORDER
    ===================================================== */

    function createOrder(formData) {

        const subtotalIDR = calculateSubtotal();

        const shippingIDR = getShippingCost();

        const totalIDR = subtotalIDR + shippingIDR;

        const convertedSubtotal = convertPrice(subtotalIDR);

        const convertedShipping = convertPrice(shippingIDR);

        const convertedTotal = convertPrice(totalIDR);

        const shippingMethod =
            shippingMethods[
                shippingSelect ? shippingSelect.value : "standard"
            ] || shippingMethods.standard;

        const paymentMethod =
            paymentSelect ? paymentSelect.value : "cash";

        const orderId = "ORD-" + Date.now();

        const order = {

            id: orderId,

            date: new Date().toISOString(),

            customer: {
                name: formData.get("name"),
                email: formData.get("email"),
                phone: formData.get("phone"),
                address: formData.get("address"),
                city: formData.get("city"),
                country: countrySelect
                    ? countrySelect.value
                    : "ID"
            },

            items: cart.map(function (item) {

                return {
                    id: item.id,
                    name: item.name,
                    image: item.image,
                    price: Number(item.price) || 0,
                    quantity: Math.max(
                        1,
                        Number(item.quantity) || 1
                    )
                };
            }),

            subtotal: subtotalIDR,

            shipping: {
                method: shippingSelect
                    ? shippingSelect.value
                    : "standard",
                name: shippingMethod.name,
                cost: shippingIDR
            },

            total: totalIDR,

            currency: selectedCurrency,

            displayTotals: {
                subtotal: convertedSubtotal,
                shipping: convertedShipping,
                total: convertedTotal
            },

            payment: paymentMethod,

            status: "Processing",

            paymentStatus:
                paymentMethod === "cash"
                    ? "Pay on Delivery"
                    : "Awaiting Bank Transfer Review"
        };

        return order;
    }


    /* =====================================================
       17. SAVE ORDER AND PAYMENT NOTIFICATION
    ===================================================== */

    function saveOrder(order) {

        let orders = [];

        try {
            orders = JSON.parse(
                localStorage.getItem("furniroOrders")
            ) || [];
        } catch (error) {
            orders = [];
        }

        orders.push(order);

        localStorage.setItem(
            "furniroOrders",
            JSON.stringify(orders)
        );

        /*
        Demo notification only.
        This is not a secure admin notification.
        */

        if (order.payment === "bank") {

            let notifications = [];

            try {
                notifications = JSON.parse(
                    localStorage.getItem("furniroPaymentNotifications")
                ) || [];
            } catch (error) {
                notifications = [];
            }

            notifications.push({
                id: "PAY-" + Date.now(),
                orderId: order.id,
                customerName: order.customer.name,
                customerEmail: order.customer.email,
                amount: order.total,
                currency: order.currency,
                status: "Pending Review",
                date: order.date
            });

            localStorage.setItem(
                "furniroPaymentNotifications",
                JSON.stringify(notifications)
            );
        }
    }


    /* =====================================================
       18. HANDLE FORM SUBMISSION
    ===================================================== */

    if (checkoutForm) {

        checkoutForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();

                if (cart.length === 0) {

                    if (typeof Swal !== "undefined") {

                        await Swal.fire({
                            icon: "warning",
                            title: "Your cart is empty",
                            text: "Please add products before checkout."
                        });

                    } else {
                        alert("Your cart is empty.");
                    }

                    return;
                }

                if (!checkoutForm.checkValidity()) {

                    checkoutForm.reportValidity();

                    return;
                }

                if (!ratesLoaded) {

                    if (typeof Swal !== "undefined") {

                        await Swal.fire({
                            icon: "warning",
                            title: "Exchange rates unavailable",
                            text:
                                "Please check your internet connection " +
                                "and try again before placing your order."
                        });

                    } else {
                        alert("Exchange rates unavailable. Try again.");
                    }

                    return;
                }

                if (submitButton) {
                    submitButton.disabled = true;
                    submitButton.textContent = "Processing...";
                }

                try {

                    const formData = new FormData(checkoutForm);

                    const order = createOrder(formData);

                    saveOrder(order);

                    localStorage.removeItem("cart");

                    if (typeof Swal !== "undefined") {

                        await Swal.fire({
                            icon: "success",
                            title: "Order Placed Successfully!",
                            html:
                                "<p>Your order number is:</p>" +
                                "<strong>" + order.id + "</strong>" +
                                "<p>Payment status: " +
                                order.paymentStatus +
                                "</p>",
                            confirmButtonText: "View My Orders"
                        });

                    } else {

                        alert(
                            "Order placed successfully! Order: " +
                            order.id
                        );
                    }

                    window.location.href = "Orders.html";

                } catch (error) {

                    console.error("Checkout error:", error);

                    if (typeof Swal !== "undefined") {

                        await Swal.fire({
                            icon: "error",
                            title: "Something went wrong",
                            text:
                                "Your order could not be saved. " +
                                "Please try again."
                        });

                    } else {
                        alert("Unable to save your order.");
                    }

                    if (submitButton) {
                        submitButton.disabled = false;
                        submitButton.textContent = "Place Order";
                    }
                }
            }
        );
    }


    /* =====================================================
       19. LISTEN FOR COUNTRY, SHIPPING AND PAYMENT CHANGES
    ===================================================== */

    if (countrySelect) {
        countrySelect.addEventListener(
            "change",
            updateCurrency
        );
    }

    if (shippingSelect) {
        shippingSelect.addEventListener(
            "change",
            renderCheckout
        );
    }

    if (paymentSelect) {
        paymentSelect.addEventListener(
            "change",
            updatePaymentNote
        );
    }


    /* =====================================================
       20. INITIALIZE CHECKOUT
    ===================================================== */

    updatePaymentNote();

    renderCheckout();

    loadExchangeRates();

});
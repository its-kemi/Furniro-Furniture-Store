
/*
=========================================================
 FURNIRO CHECKOUT SYSTEM

 Currency Conversion
 Shipping Methods
 Cash on Delivery
 Demo Online Payment
 Bank Transfer Demo
 Order Creation
=========================================================
*/

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       1. GET HTML ELEMENTS
    ===================================================== */

    const checkoutForm =
        document.getElementById("checkoutForm");

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

    const submitButton = checkoutForm
        ? checkoutForm.querySelector('[type="submit"]')
        : null;


    /* =====================================================
       2. CHECK REQUIRED HTML ELEMENTS
    ===================================================== */

    if (!checkoutForm) {
        console.error('Checkout form "#checkoutForm" not found.');
        return;
    }


    /* =====================================================
       3. GET CART FROM LOCAL STORAGE
    ===================================================== */

    let cart = [];

    try {

        cart = JSON.parse(
            localStorage.getItem("cart")
        ) || [];

        if (!Array.isArray(cart)) {
            cart = [];
        }

    } catch (error) {

        console.error("Unable to read cart:", error);
        cart = [];

    }


    /* =====================================================
       4. GET CURRENT USER
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
       5. COUNTRY AND CURRENCY SETTINGS
       Original product prices are assumed to be IDR.
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

    let exchangeRates = {
        IDR: 1
    };

    let ratesLoaded = false;

    let isSubmitting = false;


    /* =====================================================
       6. SHIPPING METHODS
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
       7. GET SHIPPING COST
    ===================================================== */

    function getShippingCost() {

        const method = shippingSelect
            ? shippingSelect.value
            : "standard";

        return shippingMethods[method]
            ? shippingMethods[method].price
            : shippingMethods.standard.price;

    }


    /* =====================================================
       8. FORMAT CURRENCY
    ===================================================== */

    function formatPrice(price) {

        const amount = Number(price) || 0;

        try {

            return new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: selectedCurrency,
                maximumFractionDigits:
                    ["IDR", "JPY", "AFN"].includes(
                        selectedCurrency
                    ) ? 0 : 2
            }).format(amount);

        } catch (error) {

            return selectedCurrency + " " +
                amount.toLocaleString("en-US");

        }

    }


    /* =====================================================
       9. CONVERT IDR TO SELECTED CURRENCY
    ===================================================== */

    function convertPrice(idrAmount) {

        const rate = exchangeRates[selectedCurrency];

        if (
            typeof rate !== "number" ||
            !Number.isFinite(rate)
        ) {
            return null;
        }

        const amount = Number(idrAmount);

        if (!Number.isFinite(amount)) {
            return null;
        }

        return amount * rate;

    }


    /* =====================================================
       10. LOAD LIVE EXCHANGE RATES
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
                throw new Error(
                    "Exchange rate request failed."
                );
            }

            const data = await response.json();

            if (
                data.result !== "success" ||
                !data.rates ||
                typeof data.rates.IDR !== "number"
            ) {
                throw new Error(
                    "Invalid exchange rate response."
                );
            }

            exchangeRates = data.rates;
            ratesLoaded = true;

            renderCheckout();

        } catch (error) {

            console.error(
                "Unable to load exchange rates:",
                error
            );

            ratesLoaded = false;

            if (currencyElement) {
                currencyElement.textContent =
                    "Exchange rates unavailable. Check your connection.";
            }

            renderCheckout();

        }

    }


    /* =====================================================
       11. CALCULATE SUBTOTAL IN IDR
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
       12. RENDER CHECKOUT PRODUCTS
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

            const unitPrice = Number(item.price) || 0;

            const linePrice = unitPrice * quantity;

            const convertedPrice =
                convertPrice(linePrice);

            const priceText =
                convertedPrice === null
                    ? "Exchange rate unavailable"
                    : formatPrice(convertedPrice);

            const product =
                document.createElement("div");

            product.className = "checkout-product";

            const image =
                document.createElement("img");

            image.src =
                item.image ||
                "assite/Header-images/logo.png";

            image.alt =
                item.name || "Furniture product";

            image.className =
                "checkout-product-image";

            image.onerror = function () {
                this.onerror = null;
                this.src = "assite/Header-images/logo.png";
            };

            const info =
                document.createElement("div");

            info.className = "checkout-product-info";

            const name =
                document.createElement("h3");

            name.textContent =
                item.name || "Furniture Product";

            const quantityText =
                document.createElement("p");

            quantityText.textContent =
                "Quantity: " + quantity;

            const priceElement =
                document.createElement("strong");

            priceElement.textContent = priceText;

            info.appendChild(name);
            info.appendChild(quantityText);
            info.appendChild(priceElement);

            product.appendChild(image);
            product.appendChild(info);

            productsContainer.appendChild(product);

        });

    }


    /* =====================================================
       13. RENDER CHECKOUT TOTALS
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
       14. UPDATE CURRENCY FROM COUNTRY
    ===================================================== */

    function updateCurrency() {

        if (!countrySelect) {
            return;
        }

        const countryCode = countrySelect.value;

        const country =
            countryCurrencies[countryCode];

        selectedCurrency = country
            ? country.currency
            : "IDR";

        renderCheckout();

    }


    /* =====================================================
       15. UPDATE PAYMENT INFORMATION
    ===================================================== */

    function updatePaymentNote() {

        if (!paymentSelect || !paymentNote) {
            return;
        }

        const method = paymentSelect.value;

        if (method === "cash") {

            paymentNote.textContent =
                "Cash on Delivery: pay when your order arrives.";

        } else if (method === "card") {

            paymentNote.textContent =
                "Demo Online Payment: continue to the payment page " +
                "to complete the simulated payment.";

        } else if (method === "bank") {

            paymentNote.textContent =
                "Bank Transfer Demo: continue to the payment page " +
                "to view the demonstration bank details.";

        } else {

            paymentNote.textContent =
                "Please select a payment method.";

        }

    }


    /* =====================================================
       16. FILL CUSTOMER INFORMATION
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
       17. CREATE ORDER
    ===================================================== */

    function createOrder(formData) {

        const subtotalIDR = calculateSubtotal();

        const shippingIDR = getShippingCost();

        const totalIDR = subtotalIDR + shippingIDR;

        const convertedSubtotal =
            convertPrice(subtotalIDR);

        const convertedShipping =
            convertPrice(shippingIDR);

        const convertedTotal =
            convertPrice(totalIDR);

        if (
            convertedSubtotal === null ||
            convertedShipping === null ||
            convertedTotal === null
        ) {
            throw new Error(
                "Unable to convert order prices."
            );
        }

        const shippingMethodValue = shippingSelect
            ? shippingSelect.value
            : "standard";

        const shippingMethod =
            shippingMethods[shippingMethodValue] ||
            shippingMethods.standard;

        const paymentMethod = paymentSelect
            ? paymentSelect.value
            : "cash";

        const validPaymentMethods = [
            "cash",
            "card",
            "bank"
        ];

        if (!validPaymentMethods.includes(paymentMethod)) {
            throw new Error("Invalid payment method.");
        }

        const orderId =
            "ORD-" + Date.now() + "-" +
            Math.random().toString(36).slice(2, 7).toUpperCase();

        const order = {

            id: orderId,

            date: new Date().toISOString(),

            customer: {
                name: formData.get("name") || "",
                email: formData.get("email") || "",
                phone: formData.get("phone") || "",
                address: formData.get("address") || "",
                city: formData.get("city") || "",
                country: countrySelect
                    ? countrySelect.value
                    : "ID"
            },

            items: cart.map(function (item) {

                const originalPrice =
                    Number(item.price) || 0;

                const displayPrice =
                    convertPrice(originalPrice);

                if (displayPrice === null) {
                    throw new Error(
                        "Unable to convert a product price."
                    );
                }

                return {

                    id: item.id,

                    name: item.name || "Furniture Product",

                    image: item.image ||
                        "assite/Header-images/logo.png",

                    price: originalPrice,

                    displayPrice: displayPrice,

                    quantity: Math.max(
                        1,
                        Number(item.quantity) || 1
                    )

                };

            }),

            /*
               Original amounts are stored in IDR.
            */

            subtotal: subtotalIDR,

            shipping: {
                method: shippingMethodValue,
                name: shippingMethod.name,
                cost: shippingIDR
            },

            total: totalIDR,

            /*
               Converted amounts are stored separately.
            */

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
                    : paymentMethod === "card"
                        ? "Awaiting Demo Payment"
                        : "Awaiting Bank Transfer Review"

        };

        return order;

    }


    /* =====================================================
       18. SAVE ORDER SAFELY
    ===================================================== */

    function getStoredOrders() {

        try {

            const stored = JSON.parse(
                localStorage.getItem("furniroOrders")
            ) || [];

            return Array.isArray(stored) ? stored : [];

        } catch (error) {

            return [];

        }

    }


    function saveOrder(order) {

        const orders = getStoredOrders();

        /*
           Avoid saving the same order ID twice.
        */

        const alreadyExists = orders.some(function (existing) {
            return existing.id === order.id;
        });

        if (alreadyExists) {
            throw new Error("This order has already been saved.");
        }

        orders.push(order);

        localStorage.setItem(
            "furniroOrders",
            JSON.stringify(orders)
        );

    }


    /* =====================================================
       19. SAVE TEMPORARY ORDER FOR PAYMENT PAGE
    ===================================================== */

    function savePendingOrder(order) {

        /*
           Store one pending order for this demonstration.
           Payment.js must finalize and save it after confirmation.
        */

        localStorage.setItem(
            "furniroPendingOrder",
            JSON.stringify(order)
        );

    }


    /* =====================================================
       20. SHOW MESSAGE
    ===================================================== */

    async function showMessage(options) {

        if (typeof Swal !== "undefined") {

            return await Swal.fire(options);

        }

        alert(
            (options.title || "") + "\n" +
            (options.text || "")
        );

        return {
            isConfirmed: true
        };

    }


    /* =====================================================
       21. HANDLE CHECKOUT SUBMISSION
    ===================================================== */

    checkoutForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            if (isSubmitting) {
                return;
            }

            if (cart.length === 0) {

                await showMessage({
                    icon: "warning",
                    title: "Your cart is empty",
                    text: "Please add products before checkout."
                });

                return;

            }

            if (!checkoutForm.checkValidity()) {

                checkoutForm.reportValidity();

                return;

            }

            if (!ratesLoaded) {

                await showMessage({
                    icon: "warning",
                    title: "Exchange Rates Unavailable",
                    text:
                        "Please check your internet connection " +
                        "and try again."
                });

                return;

            }

            const paymentMethod = paymentSelect
                ? paymentSelect.value
                : "cash";

            if (
                !["cash", "card", "bank"].includes(paymentMethod)
            ) {

                await showMessage({
                    icon: "warning",
                    title: "Select a Payment Method",
                    text: "Please select a valid payment method."
                });

                return;

            }

            isSubmitting = true;

            if (submitButton) {

                submitButton.disabled = true;

                submitButton.textContent =
                    paymentMethod === "cash"
                        ? "Placing Order..."
                        : "Continuing to Payment...";

            }

            try {

                const formData =
                    new FormData(checkoutForm);

                const order = createOrder(formData);

                if (paymentMethod === "cash") {

                    /*
                       Cash on Delivery:
                       save the order immediately and go to Orders.
                    */

                    saveOrder(order);

                    localStorage.removeItem("furniroPendingOrder");

                    localStorage.removeItem("cart");

                    await showMessage({

                        icon: "success",

                        title: "Order Placed Successfully!",

                        html:
                            "<p>Your order number is:</p>" +
                            "<strong>" + order.id + "</strong>" +
                            "<p>You can pay when your order arrives.</p>",

                        confirmButtonText: "View My Orders"

                    });

                    window.location.href = "Orders.html";

                    return;

                }

                /*
                   Card and Bank:
                   save only a temporary order, then go to Payment.html.
                   Payment.js is responsible for finalizing the order.
                */

                savePendingOrder(order);

                window.location.href =
                    "Payment.html?method=" +
                    encodeURIComponent(paymentMethod);

            } catch (error) {

                console.error("Checkout error:", error);

                await showMessage({

                    icon: "error",

                    title: "Checkout Error",

                    text:
                        "The order could not be processed. " +
                        "Please check the information and try again."

                });

                isSubmitting = false;

                if (submitButton) {

                    submitButton.disabled = false;

                    submitButton.textContent =
                        "Continue to Payment / Place Order";

                }

            }

        }
    );


    /* =====================================================
       22. LISTEN FOR FORM CHANGES
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
       23. INITIALIZE CHECKOUT
    ===================================================== */

    updateCurrency();

    updatePaymentNote();

    renderCheckout();

    loadExchangeRates();

});

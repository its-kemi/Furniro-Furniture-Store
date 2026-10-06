/*   
   PRODUCT DATA
*/

const products = [

    {
        id: "1",
        name: "Syltherine",
        price: 2500000,
        image: "assite/Shop-Products-images/product30.png"
    },

    {
        id: "2",
        name: "Leviosa",
        price: 2500000,
        image: "assite/Shop-Products-images/product14.png"
    },

    {
        id: "3",
        name: "Lolito",
        price: 7000000,
        image: "assite/Shop-Products-images/produc7.png"
    },

    {
        id: "4",
        name: "Respira",
        price: 500000,
        image: "assite/Shop-Products-images/product29.png"
    },

    {
        id: "5",
        name: "Grifo",
        price: 1500000,
        image: "assite/Shop-Products-images/product15.png"
    },

    {
        id: "6",
        name: "Muggo",
        price: 150000,
        image: "assite/Shop-Products-images/product.5.png"
    },

    {
        id: "7",
        name: "Pingky",
        price: 7000000,
        image: "assite/Shop-Products-images/product4.png"
    },

    {
        id: "8",
        name: "Potty",
        price: 500000,
        image: "assite/Shop-Products-images/product6.png"
    },

    {
        id: "9",
        name: "Maya",
        price: 3500000,
        image: "assite/Shop-Products-images/product2.png"
    },

    {
        id: "10",
        name: "Arlo",
        price: 2000000,
        image: "assite/Shop-Products-images/product.5.png"
    },

    {
        id: "11",
        name: "Luna",
        price: 4000000,
        image: "assite/Shop-Products-images/product17.png"
    },

    {
        id: "12",
        name: "Nova",
        price: 900000,
        image: "assite/Shop-Products-images/product30.png"
    },

    {
        id: "13",
        name: "Oslo",
        price: 2800000,
        image: "assite/Shop-Products-images/product15.png"
    },

    {
        id: "14",
        name: "Riva",
        price: 3000000,
        image: "assite/Shop-Products-images/product4.png"
    },

    {
        id: "15",
        name: "Elio",
        price: 1800000,
        image: "assite/Shop-Products-images/product8.png"
    },

    {
        id: "16",
        name: "Siena",
        price: 5000000,
        image: "assite/Shop-Products-images/product12.png"
    },

    {
        id: "17",
        name: "Aurelia",
        price: 3200000,
        image: "assite/Shop-Products-images/product17.png"
    },

    {
        id: "18",
        name: "Elara",
        price: 2800000,
        image: "assite/Shop-Products-images/product13.png"
    },

    {
        id: "19",
        name: "Velora",
        price: 4500000,
        image: "assite/Shop-Products-images/product19.png"
    },

    {
        id: "20",
        name: "Novella",
        price: 1800000,
        image: "assite/Shop-Products-images/product20.png"
    },

    {
        id: "21",
        name: "Lavina",
        price: 2600000,
        image: "assite/Shop-Products-images/product21.png"
    },

    {
        id: "22",
        name: "Orion",
        price: 4200000,
        image: "assite/Shop-Products-images/product22.png"
    },

    {
        id: "23",
        name: "Selene",
        price: 1200000,
        image: "assite/Shop-Products-images/product23.png"
    },

    {
        id: "24",
        name: "Arden",
        price: 3400000,
        image: "assite/Shop-Products-images/product24.png"
    },

    {
        id: "25",
        name: "Serena",
        price: 2100000,
        image: "assite/Shop-Products-images/product25.png"
    },

    {
        id: "26",
        name: "Vera",
        price: 650000,
        image: "assite/Shop-Products-images/product26.png"
    },

    {
        id: "27",
        name: "Calista",
        price: 3900000,
        image: "assite/Shop-Products-images/product12.png"
    },

    {
        id: "28",
        name: "Marcela",
        price: 1750000,
        image: "assite/Shop-Products-images/product28.png"
    },

    {
        id: "29",
        name: "Eliora",
        price: 4800000,
        image: "assite/Shop-Products-images/product29.png"
    },

    {
        id: "30",
        name: "Auren",
        price: 950000,
        image: "assite/Shop-Products-images/product30.png"
    },

    {
        id: "31",
        name: "Lorena",
        price: 2700000,
        image: "assite/Shop-Products-images/product31.png"
    },

    {
        id: "32",
        name: "Evelyn",
        price: 3600000,
        image: "assite/Shop-Products-images/product32.png"
    }

];


/*   
   GET COMPARISON PRODUCTS
*/

let comparisonProducts =
    JSON.parse(
        localStorage.getItem("comparison")
    ) || [];


/*   
   FIX OLD COMPARISON DATA
*/

comparisonProducts =
    comparisonProducts.map(
        function (product) {

            const correctProduct =
                products.find(
                    function (item) {

                        return (
                            item.id ===
                            String(product.id)
                        );

                    }
                );


            if (correctProduct) {

                return {
                    ...correctProduct
                };

            }


            return product;

        }
    );


/*   
   SAVE FIXED DATA
*/

localStorage.setItem(
    "comparison",
    JSON.stringify(
        comparisonProducts
    )
);


/*   
   PRODUCT ELEMENTS
*/

const comparisonProductTitles =
    document.querySelectorAll(
        ".comparison-product-title h2"
    );


const comparisonProductsIntro =
    document.querySelectorAll(
        ".comparison-intro .comparison-product"
    );


const comparisonProductImages =
    document.querySelectorAll(
        ".comparison-intro .comparison-product-image img"
    );


const comparisonProductNames =
    document.querySelectorAll(
        ".comparison-intro .comparison-product h3"
    );


const comparisonProductPrices =
    document.querySelectorAll(
        ".comparison-intro .comparison-product strong"
    );


/*   
   PRODUCT SELECT
*/

const comparisonSelect =
    document.querySelector(
        ".comparison-select"
    );


/*   
   SAVE COMPARISON
*/

function saveComparison() {

    localStorage.setItem(
        "comparison",
        JSON.stringify(
            comparisonProducts
        )
    );

}


/*   
   GET IMAGE PATH
*/

function getProductImage(image) {

    if (!image) {

        return "";

    }


    return image;

}


/*   
   TABLE PRODUCT TITLES
*/

function updateTableTitles() {

    comparisonProductTitles.forEach(
        function (title, index) {

            if (comparisonProducts[index]) {

                title.textContent =
                    comparisonProducts[index].name;

            } else {

                title.textContent =
                    "Add Product";

            }

        }
    );

}


/*   
   UPDATE PRODUCT INTRO
*/

function updateProductIntro() {

    comparisonProductsIntro.forEach(
        function (productElement, index) {

            const product =
                comparisonProducts[index];


            const image =
                productElement.querySelector(
                    ".comparison-product-image img"
                );


            const name =
                productElement.querySelector(
                    "h3"
                );


            const price =
                productElement.querySelector(
                    "strong"
                );


            /*
               PRODUCT EXISTS
            */

            if (product) {

                const productImage =
                    getProductImage(
                        product.image
                    );


                if (image) {

                    if (productImage) {

                        image.setAttribute(
                            "src",
                            productImage
                        );

                        image.setAttribute(
                            "alt",
                            product.name
                        );

                        image.style.display =
                            "block";

                    }

                }


                if (name) {

                    name.textContent =
                        product.name;

                }


                if (price) {

                    price.textContent =
                        formatPrice(
                            product.price
                        );

                }

            }


            /*
               PRODUCT DOES NOT EXIST
            */

            else {

                if (image) {

                    image.removeAttribute(
                        "src"
                    );

                    image.alt =
                        "No product";

                    image.style.display =
                        "none";

                }


                if (name) {

                    name.textContent =
                        "No Product";

                }


                if (price) {

                    price.textContent =
                        "";

                }

            }

        }
    );

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
   EMPTY PRODUCT CELLS
*/

function updateEmptyColumns() {

    const emptyCells =
        document.querySelectorAll(
            ".comparison-empty"
        );


    emptyCells.forEach(
        function (cell) {

            cell.innerHTML =
                "";

        }
    );

}


/*   
   ADD PRODUCT TO COMPARISON
*/

function addProductToComparison(
    productName
) {

    if (
        !productName ||
        productName === "Choose a Product"
    ) {

        return;

    }


    /*
       FIND SELECTED PRODUCT
    */

    const selectedProduct =
        products.find(
            function (product) {

                return (
                    product.name ===
                    productName
                );

            }
        );


    /*
       PRODUCT NOT FOUND
    */

    if (!selectedProduct) {

        console.log(
            "Product not found:",
            productName
        );

        return;

    }


    /*
       CHECK DUPLICATE
    */

    const alreadyExists =
        comparisonProducts.some(
            function (product) {

                return (
                    String(product.id) ===
                    String(selectedProduct.id)
                );

            }
        );


    if (alreadyExists) {

        Swal.fire({
            icon: "warning",
            title: "Already Added",
            text: "This product is already in comparison.",
            confirmButtonText: "OK",
            position: "top",
            customClass: {
                container: "furniro-swal-container"
            }
        });

        return;

    }


    /*
       MAXIMUM TWO PRODUCTS
    */

    if (comparisonProducts.length >= 2) {

        Swal.fire({
            icon: "warning",
            title: "Comparison Limit",
            text: "You can compare only two products.",
            confirmButtonText: "OK",
            position: "top",
            customClass: {
                container: "furniro-swal-container"
            }
        });

        return;

    }


    /*
       ADD PRODUCT
    */

    comparisonProducts.push({
        ...selectedProduct
    });


    /*
       SAVE
    */

    saveComparison();


    /*
       UPDATE PAGE
    */

    updateTableTitles();

    updateProductIntro();

    updateEmptyColumns();

    createRemoveButtons();

    setupCartButtons();

}


/*   
   SELECT PRODUCT
*/

if (comparisonSelect) {

    comparisonSelect.addEventListener(
        "change",
        function () {

            const selectedProduct =
                this.value;


            addProductToComparison(
                selectedProduct
            );


            /*
               RESET SELECT
            */

            this.value =
                "";

        }
    );

}


/*   
   ADD TO CART
*/

function setupCartButtons() {

    const comparisonCartButtons =
        document.querySelectorAll(
            ".comparison-cart-button"
        );


    comparisonCartButtons.forEach(
        function (button, index) {

            button.onclick =
                function (event) {

                    event.preventDefault();


                    const product =
                        comparisonProducts[index];


                    if (!product) {

                        return;

                    }


                    let cart =
                        JSON.parse(
                            localStorage.getItem("cart")
                        ) || [];


                    const existingProduct =
                        cart.find(
                            function (item) {

                                return (
                                    String(item.id) ===
                                    String(product.id)
                                );

                            }
                        );


                    if (existingProduct) {

                        existingProduct.quantity += 1;

                    } else {

                        cart.push({

                            ...product,

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

                };

        }
    );

}


/*   
   REMOVE PRODUCT FROM COMPARISON
*/

function removeProductFromComparison(index) {

    if (!comparisonProducts[index]) {

        return;

    }


    /*
       REMOVE PRODUCT
    */

    comparisonProducts.splice(
        index,
        1
    );


    /*
       SAVE UPDATED COMPARISON
    */

    saveComparison();


    /*
       UPDATE PAGE
    */

    updateTableTitles();

    updateProductIntro();

    updateEmptyColumns();

    createRemoveButtons();

    setupCartButtons();

}


/*   
   CREATE REMOVE BUTTONS
*/

function createRemoveButtons() {

    comparisonProductsIntro.forEach(
        function (productElement, index) {

            let removeButton =
                productElement.querySelector(
                    ".comparison-remove-button"
                );


            /*
               CREATE BUTTON
            */

            if (!removeButton) {

                removeButton =
                    document.createElement(
                        "button"
                    );


                removeButton.className =
                    "comparison-remove-button";


                removeButton.textContent =
                    "Remove";


                removeButton.type =
                    "button";


                productElement.appendChild(
                    removeButton
                );

            }


            /*
               REMOVE PRODUCT
            */

            removeButton.onclick =
                function () {

                    removeProductFromComparison(
                        index
                    );

                };


            /*
               SHOW OR HIDE BUTTON
            */

            if (comparisonProducts[index]) {

                removeButton.style.display =
                    "inline-flex";

            } else {

                removeButton.style.display =
                    "none";

            }

        }
    );

}


/*   
   RUN
*/

updateTableTitles();

updateProductIntro();

updateEmptyColumns();

createRemoveButtons();

setupCartButtons();
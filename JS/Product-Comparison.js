/*  
   GET COMPARISON PRODUCTS 
 */

let comparisonProducts =
    JSON.parse(
        localStorage.getItem("comparison")
    ) || [];



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


            /*  
               PRODUCT EXISTS
             */

            if (product) {

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


                if (image) {

                    image.src =
                        product.image;

                    image.alt =
                        product.name;

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


                if (image) {

                    image.removeAttribute(
                        "src"
                    );

                    image.alt =
                        "No product";

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


    const products =
        JSON.parse(
            localStorage.getItem("products")
        ) || [];


    const selectedProduct =
        products.find(
            function (product) {

                return (
                    product.name ===
                    productName
                );

            }
        );


    if (!selectedProduct) {

        console.log(
            "Product not found:",
            productName
        );

        return;

    }


    if (comparisonProducts.length >= 2) {

        comparisonProducts[1] =
            selectedProduct;

    } else {

        comparisonProducts.push(
            selectedProduct
        );

    }


    localStorage.setItem(
        "comparison",
        JSON.stringify(
            comparisonProducts
        )
    );


    updateTableTitles();

    updateProductIntro();

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

        }
    );

}



/*  
   ADD TO CART
 */

const comparisonCartButtons =
    document.querySelectorAll(
        ".comparison-cart-button"
    );


comparisonCartButtons.forEach(
    function (button, index) {

        button.addEventListener(
            "click",
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
                                item.id ===
                                product.id
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


                localStorage.setItem(
                    "cart",
                    JSON.stringify(cart)
                );


                window.location.href =
                    "Cart.html";

            }
        );

    }
);



/*  
   RUN
 */

updateTableTitles();

updateProductIntro();

updateEmptyColumns();
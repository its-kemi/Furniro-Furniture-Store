


/* 
   GET COMPARISON PRODUCTS
 */

const comparisonProducts =
    JSON.parse(
        localStorage.getItem("comparison")
    ) || [];


/* 
   PRODUCT ELEMENTS */

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
   EMPTY PRODUCT CELLS */

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
   RUN
 */

updateTableTitles();

updateProductIntro();

updateEmptyColumns();
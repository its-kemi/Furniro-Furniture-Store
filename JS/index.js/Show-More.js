


/* 
   GET SHOW MORE BUTTON
 */

const showMoreButton =
    document.querySelector(
        ".show-more"
    );


/* 
   GET ALL HOME PRODUCTS
 */

const homeProducts =
    document.querySelectorAll(
        ".products .product-card"
    );


/* 
   CHECK ELEMENTS
 */

if (
    showMoreButton &&
    homeProducts.length > 8
) {


    /* 
       HIDE PRODUCTS 9 TO 16
     */

    homeProducts.forEach(
        function (product, index) {

            if (index >= 8) {

                product.style.display =
                    "none";

            }

        }
    );


    /* 
       SHOW MORE BUTTON
     */

    showMoreButton.addEventListener(
        "click",
        function () {


            /* 
               SHOW PRODUCTS 9 TO 16
             */

            homeProducts.forEach(
                function (product, index) {

                    if (index >= 8) {

                        product.style.display =
                            "";

                    }

                }
            );


            /* 
               HIDE SHOW MORE BUTTON
             */

            showMoreButton.style.display =
                "none";

        }
    );

}
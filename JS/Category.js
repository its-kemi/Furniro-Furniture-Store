


/* 
   GET CATEGORY FROM URL
 */

const urlParams =
    new URLSearchParams(
        window.location.search
    );


const selectedCategory =
    urlParams.get("category");


/* 
   GET PRODUCTS
 */

const shopProducts =
    document.querySelectorAll(
        ".product-card"
    );


/* 
   FILTER PRODUCTS
 */

if (selectedCategory) {

    shopProducts.forEach(
        function (product) {

            const productCategory =
                product.dataset.category;


            if (
                productCategory ===
                selectedCategory
            ) {

                product.style.display =
                    "";

            } else {

                product.style.display =
                    "none";

            }

        }
    );

}
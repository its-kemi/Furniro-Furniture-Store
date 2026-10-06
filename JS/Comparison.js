
/* 
   GET COMPARISON
 */

let comparison =
    JSON.parse(
        localStorage.getItem("comparison")
    ) || [];


/* 
   SAVE COMPARISON
 */

function saveComparison() {

    localStorage.setItem(
        "comparison",
        JSON.stringify(comparison)
    );

}


/* 
   ADD PRODUCT TO COMPARISON
 */

const compareButtons =
    document.querySelectorAll(
        ".compare-product"
    );


compareButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {


            /* 
               GET PRODUCT CARD
             */

            const productCard =
                button.closest(
                    ".product-card"
                );


            if (!productCard) {

                return;

            }


            /* 
               GET PRODUCT INFORMATION
             */

            const productId =
                productCard.dataset.id;


            const productName =
                productCard.dataset.name;


            const productPrice =
                Number(
                    productCard.dataset.price
                );


            const productImage =
                productCard.querySelector(
                    ".product-image img"
                );


            if (!productImage) {

                return;

            }


            /* 
               CHECK DUPLICATE
         */

            const alreadyExists =
                comparison.some(
                    function (item) {

                        return (
                            item.id === productId
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
                        container:
                            "furniro-swal-container"
                    }
                });

                return;

            }


            /* 
               MAXIMUM TWO PRODUCTS
             */

            if (comparison.length >= 2) {

                Swal.fire({
                    icon: "warning",
                    title: "Comparison Limit",
                    text: "You can compare only two products.",
                    confirmButtonText: "OK",
                    position: "top",
                    customClass: {
                        container:
                            "furniro-swal-container"
                    }
                });

                return;

            }


            /* 
               ADD PRODUCT
             */

            comparison.push({

                id: productId,

                name: productName,

                price: productPrice,

                image:
                    productImage.getAttribute(
                        "src"
                    )

            });


            /* 
               SAVE
             */

            saveComparison();


            /* 
               SUCCESS MESSAGE
             */

            Swal.fire({
                icon: "success",
                title: "Added to Comparison!",
                text:
                    productName +
                    " added to comparison!",
                confirmButtonText: "OK",
                position: "top",
                customClass: {
                    container:
                        "furniro-swal-container"
                }
            }).then(function () {


                /* 
                   GO TO COMPARISON PAGE
                 */

                window.location.href =
                    "Product-Comparison.html";

            });

        }
    );

});
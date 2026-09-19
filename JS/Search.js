

const searchInput = document.querySelector("#searchInput");

const searchButton = document.querySelector("#searchButton");

const products = document.querySelectorAll(".search-product");

const searchResults = document.querySelector("#searchResults");

const noResult = document.querySelector("#noResult");


function searchProducts() {

    const searchValue = searchInput.value.toLowerCase().trim();

    let foundProducts = 0;


    products.forEach(function (product) {

        const productName =
            product.dataset.name.toLowerCase();


        if (productName.includes(searchValue)) {

            product.style.display = "flex";

            foundProducts++;

        } else {

            product.style.display = "none";

        }

    });


    if (foundProducts === 0) {

        searchResults.style.display = "none";

        noResult.style.display = "block";

    } else {

        searchResults.style.display = "grid";

        noResult.style.display = "none";

    }

}


/*  BUTTON  */

searchButton.addEventListener("click", function () {

    searchProducts();

});


/*  ENTER KEY  */

searchInput.addEventListener("keyup", function (event) {

    if (event.key === "Enter") {

        searchProducts();

    }

});
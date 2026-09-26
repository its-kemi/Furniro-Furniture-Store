/* SEARCH */

document.addEventListener("DOMContentLoaded", function () {

    const searchIcon =
        document.getElementById("searchIcon");

    const searchBox =
        document.getElementById("searchBox");

    const searchInput =
        document.getElementById("searchInput");

    const searchButton =
        document.getElementById("searchButton");

    const searchResults =
        document.getElementById("searchResults");

    const products =
        document.querySelectorAll(".product-card");


    if (
        !searchIcon ||
        !searchBox ||
        !searchInput
    ) {
        return;
    }


    /* OPEN / CLOSE SEARCH */

    searchIcon.addEventListener("click", function () {

        searchBox.classList.toggle("active");

        if (searchBox.classList.contains("active")) {

            searchInput.focus();

        } else {

            searchInput.value = "";

            searchResults.innerHTML = "";

            products.forEach(function (product) {
                product.style.display = "";
            });

        }

    });


    /* SEARCH PRODUCTS */

    function searchProducts() {

        const value =
            searchInput.value
                .toLowerCase()
                .trim();


        searchResults.innerHTML = "";


        if (value === "") {

            products.forEach(function (product) {
                product.style.display = "";
            });

            return;
        }


        let foundProducts = 0;


        products.forEach(function (product) {

            const name =
                product.dataset.name
                ? product.dataset.name.toLowerCase()
                : "";

            const category =
                product.dataset.category
                ? product.dataset.category.toLowerCase()
                : "";

            const descriptionElement =
                product.querySelector("p");

            const description =
                descriptionElement
                ? descriptionElement.textContent.toLowerCase()
                : "";


            if (
                name.includes(value) ||
                category.includes(value) ||
                description.includes(value)
            ) {

                product.style.display = "";

                foundProducts++;


            } else {

                product.style.display = "none";

            }

        });


        if (foundProducts === 0) {

            const noResult =
                document.createElement("div");

            noResult.className =
                "search-no-result";

            noResult.textContent =
                "No products found.";

            searchResults.appendChild(noResult);

        }

    }


    /* SEARCH BUTTON */

    if (searchButton) {

        searchButton.addEventListener(
            "click",
            searchProducts
        );

    }


    /* ENTER */

    searchInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                searchProducts();

            }

        }
    );


    /* LIVE SEARCH */

    searchInput.addEventListener(
        "input",
        searchProducts
    );

});




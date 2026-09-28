const categories = document.querySelectorAll(".blog-categories li");

categories.forEach(function (category) {

    category.addEventListener("click", function () {

        categories.forEach(function (item) {
            item.classList.remove("active");
        });

        category.classList.add("active");

    });

});
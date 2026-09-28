const recentPosts = document.querySelectorAll(".recent-post");

recentPosts.forEach(function (post) {

    post.addEventListener("click", function () {

        recentPosts.forEach(function (item) {
            item.classList.remove("active");
        });

        post.classList.add("active");

    });

});
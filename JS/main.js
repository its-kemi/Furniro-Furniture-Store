

const sliderImages=document.querySelectorAll(".aside-slider  img")

const dots = document.querySelectorAll(".aside-slider span");
const nextButton = document.querySelector(".aside-slider button");

let currentIndex = 0;

function showSlide(index) {

    sliderImages.forEach(function (image) {
        image.style.display = "none";
    });

    dots.forEach(function (dot) {
        dot.style.opacity = "0.4";
    });

    sliderImages[index].style.display = "block";
    dots[index].style.opacity = "1";
}

nextButton.addEventListener("click", function () {

    currentIndex++;

    if (currentIndex >= sliderImages.length) {
        currentIndex = 0;
    }

    showSlide(currentIndex);
});

showSlide(currentIndex);










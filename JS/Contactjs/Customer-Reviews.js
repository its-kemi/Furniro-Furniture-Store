// ==================================================
// CUSTOMER REVIEWS
// ==================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {


        const reviewsGrid =
            document.querySelector(
                "#customerReviewsGrid"
            );


        const reviewCount =
            document.querySelector(
                "#reviewCount"
            );


        if (!reviewsGrid) {
            return;
        }



        // ==================================================
        // GET SAVED FEEDBACKS
        // ==================================================

        const feedbacks =
            JSON.parse(
                localStorage.getItem(
                    "furniroFeedbacks"
                )
            ) || [];



        // ==================================================
        // UPDATE REVIEW COUNT
        // ==================================================

        if (reviewCount) {

            reviewCount.textContent =
                feedbacks.length + 3;

        }



        // ==================================================
        // ADD SAVED FEEDBACKS
        // ==================================================

        feedbacks.forEach(
            function (feedback) {


                const card =
                    document.createElement(
                        "article"
                    );


                card.className =
                    "customer-review-card";



                card.innerHTML = `

                    <div class="customer-info">

                        <img
                            src="assite/Contact.images/customer-5.png"
                            alt="Customer"
                            class="customer-photo"
                        >

                        <div>

                            <h3>
                                Furniro Customer
                            </h3>

                            <p>

                                <i
                                    class="fa-solid fa-location-dot">
                                </i>

                                Customer

                            </p>

                        </div>

                    </div>



                    <div class="review-rating">

                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>

                        <span>
                            5.0
                        </span>

                    </div>



                    <p class="review-text">

                        ${feedback.answer}

                    </p>



                    <div class="purchased-product">

                        <img
                            src="assite/Contact.images/6.png"
                            alt="Furniro Product"
                        >

                        <div>

                            <span>
                                Customer Feedback
                            </span>

                            <h4>
                                Furniro Product
                            </h4>

                        </div>

                    </div>



                    <div class="review-footer">

                        <span class="verified">

                            <i
                                class="fa-solid fa-circle-check">
                            </i>

                            Customer Feedback

                        </span>


                        <span class="review-date">

                            ${feedback.date}

                        </span>

                    </div>

                `;


                reviewsGrid.appendChild(
                    card
                );

            }
        );

    }
);
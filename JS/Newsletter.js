/* 
   NEWSLETTER
 */

const newsletterForm =
    document.querySelector(
        "#newsletterForm"
    );


if (newsletterForm) {

    newsletterForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const newsletterEmail =
                document.querySelector(
                    "#newsletterEmail"
                ).value.trim();


            if (newsletterEmail === "") {

                alert(
                    "Please enter your email."
                );

                return;

            }


            alert(
                "Thank you for subscribing!"
            );


            newsletterForm.reset();

        }
    );

}
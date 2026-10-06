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

                Swal.fire({
                    icon: "warning",
                    title: "Email Required",
                    text: "Please enter your email.",
                    confirmButtonText: "OK",
                    position: "top",
                    customClass: {
                        container:
                            "furniro-swal-container"
                    }
                });

                return;

            }


            Swal.fire({
                icon: "success",
                title: "Subscribed Successfully!",
                text: "Thank you for subscribing!",
                confirmButtonText: "OK",
                position: "top",
                customClass: {
                    container:
                        "furniro-swal-container"
                }
            });


            newsletterForm.reset();

        }
    );

}
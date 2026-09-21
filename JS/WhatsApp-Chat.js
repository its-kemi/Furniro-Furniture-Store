document.addEventListener("DOMContentLoaded", function () {

    const openButton =
        document.getElementById("openWhatsappChat");

    const closeButton =
        document.getElementById("closeWhatsappChat");

    const chatBox =
        document.getElementById("whatsappChatBox");

    const messageInput =
        document.getElementById("whatsappMessage");

    const sendButton =
        document.getElementById("sendWhatsappMessage");

    const messagesBox =
        document.getElementById("whatsappChatMessages");


    /* Check elements */

    if (
        !openButton ||
        !closeButton ||
        !chatBox ||
        !messageInput ||
        !sendButton ||
        !messagesBox
    ) {
        console.log("WhatsApp Chat elements not found.");
        return;
    }


    /* 
       OPEN CHAT
    */

    openButton.addEventListener("click", function () {

        chatBox.classList.add("active");

        messageInput.focus();

    });


    /* 
       CLOSE CHAT
     */

    closeButton.addEventListener("click", function () {

        chatBox.classList.remove("active");

    });


    /* 
       SEND MESSAGE
     */

    sendButton.addEventListener("click", function () {

        sendMessage();

    });


    /* 
       ENTER KEY
    */

    messageInput.addEventListener("keydown", function (event) {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            sendMessage();

        }

    });


    /* 
       SEND MESSAGE FUNCTION
     */

    function sendMessage() {

        const message =
            messageInput.value.trim();


        if (message === "") {

            messageInput.focus();

            return;

        }


        createUserMessage(message);

        messageInput.value = "";

        scrollToBottom();


        /* Automatic Furniro reply */

        setTimeout(function () {

            createFurniroReply();

            scrollToBottom();

        }, 700);

    }


    /* 
       USER MESSAGE
     */

    function createUserMessage(message) {

        const messageElement =
            document.createElement("div");

        messageElement.className =
            "whatsapp-message user-message";


        const textElement =
            document.createElement("p");

        textElement.textContent =
            message;


        const timeElement =
            document.createElement("span");

        timeElement.className =
            "message-time";

        timeElement.textContent =
            "Now";


        messageElement.appendChild(
            textElement
        );

        messageElement.appendChild(
            timeElement
        );


        messagesBox.appendChild(
            messageElement
        );

    }


    /* 
       FURNIRO REPLY
     */

    function createFurniroReply() {

        const replyElement =
            document.createElement("div");

        replyElement.className =
            "whatsapp-message furniro-reply";


        const textElement =
            document.createElement("p");

        textElement.textContent =
            "Thank you for your message! We will get back to you soon. 💚";


        const timeElement =
            document.createElement("span");

        timeElement.className =
            "message-time";

        timeElement.textContent =
            "Now";


        replyElement.appendChild(
            textElement
        );

        replyElement.appendChild(
            timeElement
        );


        messagesBox.appendChild(
            replyElement
        );

    }


    /* 
       SCROLL TO BOTTOM
     */

    function scrollToBottom() {

        messagesBox.scrollTop =
            messagesBox.scrollHeight;

    }


    /* 
       ESCAPE
     */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            chatBox.classList.remove("active");

        }

    });

});
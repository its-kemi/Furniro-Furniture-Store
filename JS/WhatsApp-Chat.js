
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


    /*
       CHECK ELEMENTS
    */

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
       LOCAL STORAGE
    */

    const storageKey = "furniroWhatsAppMessages";

    function getSavedMessages() {

        try {
            const messages = JSON.parse(
                localStorage.getItem(storageKey) || "[]"
            );

            return Array.isArray(messages) ? messages : [];

        } catch (error) {
            console.error("Unable to load saved messages:", error);
            return [];
        }
    }


    function saveMessage(sender, text) {

        const savedMessages = getSavedMessages();

        savedMessages.push({
            sender: sender,
            text: text,
            time: new Date().toISOString()
        });

        try {
            localStorage.setItem(
                storageKey,
                JSON.stringify(savedMessages)
            );

            return true;

        } catch (error) {
            console.error("Unable to save message:", error);
            return false;
        }
    }


    /*
       RESTORE SAVED MESSAGES
    */

    function restoreMessages() {

        const savedMessages = getSavedMessages();

        savedMessages.forEach(function (message) {

            if (message.sender === "user") {
                createUserMessage(message.text, message.time);
            }

            if (message.sender === "furniro") {
                createFurniroReply(message.text, message.time);
            }

        });

        scrollToBottom();
    }

    restoreMessages();


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


        // Save user message
        if (!saveMessage("user", message)) {

            alert("Message could not be saved. Please try again.");

            return;
        }

        createUserMessage(message);

        messageInput.value = "";

        scrollToBottom();


        /*
           AUTOMATIC FURNIRO REPLY
        */

        setTimeout(function () {

            const reply =
                "Thank you for your message! We will get back to you soon. 💚";

            // Save automatic reply
            if (saveMessage("furniro", reply)) {

                createFurniroReply(reply);

                scrollToBottom();

            }

        }, 700);

    }


    /*
       USER MESSAGE
    */

    function createUserMessage(message, savedTime) {

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
            savedTime
                ? new Date(savedTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                })
                : "Now";


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

    function createFurniroReply(message, savedTime) {

        const replyElement =
            document.createElement("div");

        replyElement.className =
            "whatsapp-message furniro-reply";


        const textElement =
            document.createElement("p");

        textElement.textContent =
            message ||
            "Thank you for your message! We will get back to you soon. 💚";


        const timeElement =
            document.createElement("span");

        timeElement.className =
            "message-time";

        timeElement.textContent =
            savedTime
                ? new Date(savedTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                })
                : "Now";


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

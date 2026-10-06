document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // LANGUAGE BUTTON
    // ==========================================

    const languageButton =
        document.getElementById("languageButton");

    const languageDropdown =
        document.getElementById("languageDropdown");

    const languageOptions =
        document.querySelectorAll(
            ".language-option"
        );


    if (
        !languageButton ||
        !languageDropdown
    ) {
        return;
    }


    // ==========================================
    // TRANSLATIONS
    // ==========================================

    const translations = {

        fa: {

            "Home":
                "خانه",

            "Shop":
                "فروشگاه",

            "About":
                "درباره ما",

            "Contact":
                "تماس با ما",

            "New Arrival":
                "تازه‌وارد",

            "Discover Our":
                "کشف کنید",

            "New Collection":
                "مجموعه جدید ما",

            "Beautiful furniture designed to make your home more comfortable and stylish.":
                "مبلمان زیبا که برای راحت‌تر و شیک‌تر کردن خانه شما طراحی شده است.",

            "BUY NOW":
                "اکنون خرید کنید",

            "Browse":
                "مرور کنید",

            "Dining":
                "غذاخوری",

            "Explore Dining":
                "مشاهده بخش غذاخوری",

            "Living":
                "نشیمن",

            "Explore Living":
                "مشاهده بخش نشیمن",

            "Bedroom":
                "اتاق خواب",

            "Explore Bedroom":
                "مشاهده اتاق خواب",

            "Products":
                "محصولات",

            "Add to Cart":
                "افزودن به سبد خرید",

            "Share":
                "اشتراک‌گذاری",

            "Compare":
                "مقایسه",

            "Like":
                "پسندیدن",

            "Stylish cafe chair":
                "صندلی شیک کافه‌ای",

            "Luxury big sofa":
                "مبل بزرگ لوکس",

            "Outdoor bar table":
                "میز بار فضای باز",

            "Night lamp":
                "چراغ خواب",

            "Small mug":
                "ماگ کوچک",

            "Cute bed set":
                "ست تخت زیبا",

            "Minimalist flower pot":
                "گلدان مینیمال",

            "Modern sofa":
                "مبل مدرن",

            "Comfort chair":
                "صندلی راحت",

            "Dining table":
                "میز غذاخوری",

            "Luxury lamp":
                "چراغ لوکس",

            "Modern table":
                "میز مدرن",

            "Comfort sofa":
                "مبل راحت",

            "Wooden chair":
                "صندلی چوبی",

            "Elegant bed":
                "تخت شیک",

            "SHOW MORE":
                "نمایش بیشتر",

            "50+ Beautiful Rooms":
                "بیش از ۵۰ اتاق زیبا",

            "Inspiration":
                "الهام‌بخش",

            "Our designer already made a lot of beautiful prototypes of rooms that inspire you.":
                "طراحان ما نمونه‌های زیبایی از اتاق‌ها ایجاد کرده‌اند که می‌توانند برای شما الهام‌بخش باشند.",

            "Explore More":
                "بیشتر ببینید",

            "01 — Bedroom":
                "۰۱ — اتاق خواب",

            "Inner Peace":
                "آرامش درونی",

            "Share your setup with":
                "چیدمان خود را با ما به اشتراک بگذارید",

            "Newsletter":
                "خبرنامه",

            "Enter your email":
                "ایمیل خود را وارد کنید",

            "SUBSCRIBE":
                "عضویت",

            "Links":
                "لینک‌ها",

            "Help":
                "راهنما",

            "Payment Options":
                "روش‌های پرداخت",

            "Returns":
                "مرجوعی",

            "Privacy Policies":
                "سیاست حفظ حریم خصوصی",

            "Blog":
                "وبلاگ",

            "Online":
                "آنلاین",

            "Today":
                "امروز",

            "Hello! 👋":
                "سلام! 👋",

            "Welcome to Furniro.":
                "به Furniro خوش آمدید.",

            "How can we help you?":
                "چگونه می‌توانیم به شما کمک کنیم؟",

            "Type a message...":
                "پیام خود را بنویسید...",

            "Share Product":
                "اشتراک‌گذاری محصول",

            "Share this product with your friends":
                "این محصول را با دوستان خود به اشتراک بگذارید",

            "Product":
                "محصول"

        }

    };


    // ==========================================
    // SAVE ORIGINAL TEXT
    // ==========================================

    const originalTexts = new WeakMap();


    function saveOriginalText(node) {

        if (
            !originalTexts.has(node)
        ) {

            originalTexts.set(
                node,
                node.nodeValue
            );

        }

    }


    // ==========================================
    // NORMALIZE TEXT
    // ==========================================

    function normalizeText(text) {

        return text
            .replace(/\s+/g, " ")
            .trim();

    }


    // ==========================================
    // TRANSLATE PAGE
    // ==========================================

    function translatePage(language) {

        const walker =
            document.createTreeWalker(
                document.body,
                NodeFilter.SHOW_TEXT,
                {
                    acceptNode:
                        function (node) {

                            const parent =
                                node.parentElement;

                            if (!parent) {
                                return NodeFilter.FILTER_REJECT;
                            }


                            const tagName =
                                parent.tagName;


                            if (
                                tagName === "SCRIPT" ||
                                tagName === "STYLE" ||
                                tagName === "NOSCRIPT"
                            ) {

                                return NodeFilter.FILTER_REJECT;

                            }


                            return NodeFilter.FILTER_ACCEPT;

                        }
                }
            );


        const textNodes = [];

        let node;


        while (
            (node = walker.nextNode())
        ) {

            textNodes.push(node);

        }


        textNodes.forEach(
            function (textNode) {

                saveOriginalText(
                    textNode
                );


                const originalText =
                    originalTexts.get(
                        textNode
                    );


                const cleanText =
                    normalizeText(
                        originalText
                    );


                // ==================================
                // ENGLISH
                // ==================================

                if (
                    language === "en"
                ) {

                    textNode.nodeValue =
                        originalText;

                    return;

                }


                // ==================================
                // DARI
                // ==================================

                if (
                    language === "fa" &&
                    translations.fa[
                        cleanText
                    ] !== undefined
                ) {

                    const leadingSpace =
                        originalText.match(
                            /^\s*/
                        )[0];


                    const trailingSpace =
                        originalText.match(
                            /\s*$/
                        )[0];


                    textNode.nodeValue =
                        leadingSpace +
                        translations.fa[
                            cleanText
                        ] +
                        trailingSpace;

                }

            }
        );


        // ==========================================
        // PLACEHOLDERS
        // ==========================================

        const inputs =
            document.querySelectorAll(
                "input, textarea"
            );


        inputs.forEach(
            function (input) {

                if (
                    !input.dataset.originalPlaceholder
                ) {

                    input.dataset.originalPlaceholder =
                        input.getAttribute(
                            "placeholder"
                        ) || "";

                }


                const originalPlaceholder =
                    input.dataset.originalPlaceholder;


                const cleanPlaceholder =
                    normalizeText(
                        originalPlaceholder
                    );


                // ENGLISH

                if (
                    language === "en"
                ) {

                    input.setAttribute(
                        "placeholder",
                        originalPlaceholder
                    );

                }


                // DARI

                else if (
                    language === "fa"
                ) {

                    if (
                        cleanPlaceholder ===
                        "Enter your email"
                    ) {

                        input.setAttribute(
                            "placeholder",
                            "ایمیل خود را وارد کنید"
                        );

                    }

                    else if (
                        cleanPlaceholder ===
                        "Search products..."
                    ) {

                        input.setAttribute(
                            "placeholder",
                            "جستجوی محصولات..."
                        );

                    }

                    else if (
                        cleanPlaceholder ===
                        "Type a message..."
                    ) {

                        input.setAttribute(
                            "placeholder",
                            "پیام خود را بنویسید..."
                        );

                    }

                }

            }
        );


        // ==========================================
        // PAGE DIRECTION
        // ==========================================
           if (
    language === "fa"
) {

    document.documentElement.lang =
        "fa";

    document.documentElement.dir =
        "rtl";

}

else {

    document.documentElement.lang =
        "en";

    document.documentElement.dir =
        "ltr";

}


        // ==========================================
        // SAVE LANGUAGE
        // ==========================================

        localStorage.setItem(
            "furniro-language",
            language
        );

    }


    // ==========================================
    // LANGUAGE BUTTON
    // ==========================================

    languageButton.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            languageDropdown.classList.toggle(
                "active"
            );

        }
    );


    // ==========================================
    // SELECT LANGUAGE
    // ==========================================

    languageOptions.forEach(
        function (option) {

            option.addEventListener(
                "click",
                function (event) {

                    event.stopPropagation();


                    const language =
                        option.dataset.language;


                    // Remove active

                    languageOptions.forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    // Add active

                    option.classList.add(
                        "active"
                    );


                    // Translate

                    translatePage(
                        language
                    );


                    // Close dropdown

                    languageDropdown.classList.remove(
                        "active"
                    );

                }
            );

        }
    );


    // ==========================================
    // LOAD SAVED LANGUAGE
    // ==========================================

    const savedLanguage =
        localStorage.getItem(
            "furniro-language"
        ) || "en";


    const savedOption =
        document.querySelector(
            '.language-option[data-language="' +
            savedLanguage +
            '"]'
        );


    if (savedOption) {

        languageOptions.forEach(
            function (item) {

                item.classList.remove(
                    "active"
                );

            }
        );


        savedOption.classList.add(
            "active"
        );

    }


    // ==========================================
    // APPLY LANGUAGE
    // ==========================================

    translatePage(
        savedLanguage
    );


    // ==========================================
    // CLOSE DROPDOWN
    // ==========================================

    document.addEventListener(
        "click",
        function () {

            languageDropdown.classList.remove(
                "active"
            );

        }
    );

});
// ==================================================
// SOZLAMALAR
// ==================================================

const TELEGRAM_USERNAME = "MKSh9o";


// ==================================================
// MATNLAR (JavaScript ichidagi xabarlar)
// ==================================================

const TEXTS = {

    uz: {
        locBtnIdle: "📍 Lokatsiyani aniqlash",
        locBtnLoading: "📍 Aniqlanmoqda...",
        locBtnDone: "📍 Google Mapsni ochish",

        noGeo: "Brauzeringiz geolokatsiyani qo‘llab-quvvatlamaydi.",
        needHttps: "Lokatsiya faqat HTTPS yoki localhost orqali ishlaydi. Saytni Live Server orqali oching.",

        geoErr1: "Lokatsiyaga ruxsat berilmadi. Brauzerda lokatsiyaga ruxsat bering.",
        geoErr2: "Lokatsiyani aniqlab bo‘lmadi. GPS va internetni tekshiring.",
        geoErr3: "Lokatsiyani aniqlash vaqti tugadi. Qayta urinib ko‘ring.",
        geoErrOther: "Lokatsiyani aniqlab bo‘lmadi.",

        needName: "Iltimos, ismingizni kiriting!",
        badPhone: "Telefon raqamini to‘liq kiriting!\nMasalan: 90 123 45 67",
        needSquare: "Iltimos, maydonni kiriting!",
        needLocation: "Iltimos, lokatsiyani aniqlang!",
        needProduct: "Iltimos, apparatni tanlang!",

        hello: "Assalomu alaykum!",
        newOrder: "Yangi buyurtma",
        name: "Ism",
        phone: "Telefon",
        square: "Maydon",
        location: "Lokatsiya",
        maps: "Google Maps",
        product: "Apparat",
        notSet: "Ko‘rsatilmagan"
    },

    ru: {
        locBtnIdle: "📍 Определить местоположение",
        locBtnLoading: "📍 Определение...",
        locBtnDone: "📍 Открыть Google Maps",

        noGeo: "Ваш браузер не поддерживает геолокацию.",
        needHttps: "Геолокация работает только через HTTPS или localhost. Откройте сайт через Live Server.",

        geoErr1: "Доступ к местоположению запрещён. Разрешите геолокацию в браузере.",
        geoErr2: "Не удалось определить местоположение. Проверьте GPS и интернет.",
        geoErr3: "Время определения местоположения истекло. Попробуйте ещё раз.",
        geoErrOther: "Не удалось определить местоположение.",

        needName: "Пожалуйста, введите ваше имя!",
        badPhone: "Введите полный номер телефона!\nПример: 90 123 45 67",
        needSquare: "Пожалуйста, введите площадь!",
        needLocation: "Пожалуйста, определите местоположение!",
        needProduct: "Пожалуйста, выберите оборудование!",

        hello: "Здравствуйте!",
        newOrder: "Новый заказ",
        name: "Имя",
        phone: "Телефон",
        square: "Площадь",
        location: "Местоположение",
        maps: "Google Maps",
        product: "Оборудование",
        notSet: "Не указано"
    }
};


// ==================================================
// ELEMENTLAR
// ==================================================

const orderForm = document.getElementById("orderForm");
const productSelect = document.getElementById("product");
const phoneInput = document.getElementById("phone");
const locationInput = document.getElementById("location");
const locationButton = document.getElementById("locationButton");
const langButtons = document.querySelectorAll(".lang-btn");


// ==================================================
// O'ZGARUVCHILAR
// ==================================================

let currentLanguage = "uz";
let googleMapsLink = "";
let locationState = "idle"; // idle | loading | done


function t() {
    return TEXTS[currentLanguage];
}


// ==================================================
// LOKATSIYA TUGMASI MATNI
// ==================================================

function updateLocationButton() {

    if (!locationButton) return;

    if (locationState === "loading") {
        locationButton.textContent = t().locBtnLoading;
    } else if (locationState === "done") {
        locationButton.textContent = t().locBtnDone;
    } else {
        locationButton.textContent = t().locBtnIdle;
    }
}


// ==================================================
// TIL ALMASHTIRISH
// ==================================================

function changeLanguage(language) {

    if (language !== "uz" && language !== "ru") {
        language = "uz";
    }

    currentLanguage = language;
    document.documentElement.lang = language;

    // Barcha data-uz / data-ru matnlar (option lar ham shu yerda)
    document.querySelectorAll("[data-uz][data-ru]").forEach(function (element) {

        // Lokatsiya tugmasi holatiga qarab alohida boshqariladi
        if (element === locationButton) return;

        const text = element.getAttribute("data-" + language);

        if (text !== null) {
            element.textContent = text;
        }
    });

    // Placeholder lar
    document.querySelectorAll("[data-placeholder-uz][data-placeholder-ru]").forEach(function (element) {

        const placeholder = element.getAttribute("data-placeholder-" + language);

        if (placeholder !== null) {
            element.placeholder = placeholder;
        }
    });

    // UZ / RU tugmalari
    langButtons.forEach(function (button) {
        button.classList.toggle("active", button.getAttribute("data-lang") === language);
    });

    updateLocationButton();

    // Tanlangan tilni eslab qolish
    try {
        localStorage.setItem("lang", language);
    } catch (error) {}
}


langButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        changeLanguage(button.getAttribute("data-lang"));
    });
});


// ==================================================
// TELEFON FORMAT: 90 123 45 67
// ==================================================

if (phoneInput) {

    phoneInput.addEventListener("input", function () {

        const d = this.value.replace(/\D/g, "").substring(0, 9);

        let result = d;

        if (d.length > 2) {
            result = d.substring(0, 2) + " " + d.substring(2);
        }

        if (d.length > 5) {
            result = d.substring(0, 2) + " " + d.substring(2, 5) + " " + d.substring(5);
        }

        if (d.length > 7) {
            result = d.substring(0, 2) + " " + d.substring(2, 5) + " " +
                     d.substring(5, 7) + " " + d.substring(7);
        }

        this.value = result;
    });
}


// ==================================================
// APPARAT TUGMALARI
// ==================================================

document.querySelectorAll(".product-btn").forEach(function (button) {

    button.addEventListener("click", function () {

        if (productSelect) {
            productSelect.value = button.getAttribute("data-product");
        }

        const orderSection = document.getElementById("order");

        if (orderSection) {
            orderSection.scrollIntoView({ behavior: "smooth" });
        }
    });
});


// ==================================================
// LOKATSIYA
// ==================================================

if (locationButton) {

    locationButton.addEventListener("click", function () {

        // Lokatsiya olingan bo'lsa, Google Maps ochiladi
        if (googleMapsLink) {
            window.open(googleMapsLink, "_blank");
            return;
        }

        if (locationState === "loading") return;

        if (!navigator.geolocation) {
            alert(t().noGeo);
            return;
        }

        const host = window.location.hostname;
        const isLocalhost = host === "localhost" || host === "127.0.0.1";

        if (!window.isSecureContext && !isLocalhost) {
            alert(t().needHttps);
            return;
        }

        locationState = "loading";
        locationButton.disabled = true;
        updateLocationButton();

        // Popup ni oldindan ochamiz (brauzer bloklamasligi uchun)
        let mapWindow = null;

        try {
            mapWindow = window.open("about:blank", "_blank");
        } catch (error) {
            mapWindow = null;
        }

        navigator.geolocation.getCurrentPosition(

            // ---------- MUVAFFAQIYAT ----------
            function (position) {

                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                googleMapsLink =
                    "https://www.google.com/maps/search/?api=1&query=" + lat + "," + lng;

                if (locationInput) {
                    locationInput.value = lat.toFixed(6) + ", " + lng.toFixed(6);
                }

                locationState = "done";
                locationButton.disabled = false;
                updateLocationButton();

                if (mapWindow && !mapWindow.closed) {
                    mapWindow.location.href = googleMapsLink;
                } else {
                    window.open(googleMapsLink, "_blank");
                }
            },

            // ---------- XATO ----------
            function (error) {

                if (mapWindow && !mapWindow.closed) {
                    mapWindow.close();
                }

                locationState = "idle";
                locationButton.disabled = false;
                updateLocationButton();

                let message = t().geoErrOther;

                if (error.code === 1) message = t().geoErr1;
                else if (error.code === 2) message = t().geoErr2;
                else if (error.code === 3) message = t().geoErr3;

                alert(message);
            },

            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 0
            }
        );
    });
}


// ==================================================
// BUYURTMA FORMASI
// ==================================================

if (orderForm) {

    orderForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const tx = t();

        const name = document.getElementById("name").value.trim();
        const phone = phoneInput.value.trim();
        const square = document.getElementById("square").value.trim();
        const locationText = locationInput.value.trim();
        const product = productSelect.value;

        // Apparat nomi tanlangan tilda
        let productText = product;

        if (productSelect.selectedIndex >= 0) {

            const option = productSelect.options[productSelect.selectedIndex];
            const translated = option.getAttribute("data-" + currentLanguage);

            if (translated) {
                productText = translated;
            }
        }

        // Tekshiruvlar
        if (!name) {
            alert(tx.needName);
            return;
        }

        if (phone.replace(/\D/g, "").length !== 9) {
            alert(tx.badPhone);
            phoneInput.focus();
            return;
        }

        if (!square) {
            alert(tx.needSquare);
            return;
        }

        if (!locationText) {
            alert(tx.needLocation);
            return;
        }

        if (!product) {
            alert(tx.needProduct);
            return;
        }

        // Telegram xabari
        const message =
            tx.hello + "\n\n" +
            "📌 " + tx.newOrder + "\n\n" +
            "👤 " + tx.name + ": " + name + "\n" +
            "📞 " + tx.phone + ": +998 " + phone + "\n" +
            "📐 " + tx.square + ": " + square + " m²\n" +
            "📍 " + tx.location + ": " + locationText + "\n" +
            "🗺 " + tx.maps + ": " + (googleMapsLink || tx.notSet) + "\n" +
            "⚙️ " + tx.product + ": " + productText;

        window.location.href =
            "https://t.me/" + TELEGRAM_USERNAME + "?text=" + encodeURIComponent(message);
    });
}


// ==================================================
// SAYT BOSHLANGANDA (saqlangan til yoki UZ)
// ==================================================

let startLanguage = "uz";

try {
    startLanguage = localStorage.getItem("lang") || "uz";
} catch (error) {}

changeLanguage(startLanguage);
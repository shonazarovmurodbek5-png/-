const TELEGRAM_USERNAME = "MKSh9o";

const orderForm = document.getElementById("orderForm");
const productSelect = document.getElementById("product");

const productButtons = document.querySelectorAll(".product-btn");

productButtons.forEach(function (button) {
    button.addEventListener("click", function () {

        const productName = button.getAttribute("data-product");

        productSelect.value = productName;

        document.getElementById("order").scrollIntoView({
            behavior: "smooth"
        });
    });
});


orderForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const square = document.getElementById("square").value.trim();
    const location = document.getElementById("location").value.trim();
    const product = productSelect.value;

    if (!name || !phone || !square || !location || !product) {
        alert("Iltimos, barcha maydonlarni to‘ldiring!");
        return;
    }

    const message =
        `Assalomu alaykum!\n\n` +
        `📌 Yangi buyurtma\n\n` +
        `👤 Ism: ${name}\n` +
        `📞 Telefon: ${phone}\n` +
        `📐 Maydon: ${square} m²\n` +
        `📍 Lokatsiya: ${location}\n` +
        `⚙️ Apparat: ${product}`;

    const telegramURL =
        `https://t.me/${TELEGRAM_USERNAME}?text=${encodeURIComponent(message)}`;

    window.location.href = telegramURL;
});
// ========================================
// TELEGRAM USERNAME
// Shu yerga sen menga beradigan username yoziladi.
// Masalan: "samopchi_uz"
// @ belgisini yozmasang ham bo'ladi.
// ========================================

const TELEGRAM_USERNAME = "YOUR_USERNAME";


// ========================================
// APPARAT TANLASH
// ========================================

function selectProduct(productName) {
    const productSelect = document.getElementById("product");

    if (productSelect) {
        productSelect.value = productName;
    }
}


// ========================================
// BUYURTMA FORMASI
// ========================================

const orderForm = document.getElementById("orderForm");

if (orderForm) {

    orderForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const square = document.getElementById("square").value.trim();
        const location = document.getElementById("location").value.trim();
        const product = document.getElementById("product").value;


        // Tekshirish

        if (!name || !phone || !square || !location || !product) {

            alert("Iltimos, barcha ma'lumotlarni to'ldiring.");

            return;
        }


        // Telegram username tekshirish

        if (
            TELEGRAM_USERNAME === "YOUR_USERNAME" ||
            TELEGRAM_USERNAME.trim() === ""
        ) {

            alert(
                "Avval script.js ichidagi TELEGRAM_USERNAME joyiga Telegram username'ingizni yozing."
            );

            return;
        }


        // Telegram uchun xabar

        const message =
`🔔 YANGI BUYURTMA

👤 Ism: ${name}
📞 Telefon: ${phone}
📐 Maydon: ${square} m²
📍 Lokatsiya: ${location}
⚙️ Apparat: ${product}`;


        // @ belgisi bo'lsa olib tashlaymiz

        const username = TELEGRAM_USERNAME.replace("@", "").trim();


        // Telegram chatiga o'tish

        const telegramURL =
            `https://t.me/${username}?text=${encodeURIComponent(message)}`;


        window.open(telegramURL, "_blank");

    });

}
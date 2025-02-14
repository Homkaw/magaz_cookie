document.addEventListener('DOMContentLoaded', function() {
    // Переменные для избежания повторного поиска элементов
    const mainActionButton = document.getElementById("main-action-button");
    const productsSection = document.getElementById('products');
    const orderSection = document.getElementById("order");
    const currencyButton = document.getElementById('change-currency');
    const prices = document.getElementsByClassName("products-item-price");
    const productInput = document.getElementById("product");
    const nameInput = document.getElementById("name");
    const phoneInput = document.getElementById("phone");
    const orderActionButton = document.getElementById("order-action");

    // Функция для плавной прокрутки к секции
    function scrollToSection(section) {
        if (section) {
            section.scrollIntoView({behavior: "smooth"});
        }
    }

    // Обработчик для кнопки "Заказать" в main-content
    if (mainActionButton) {
        mainActionButton.onclick = function() {
            scrollToSection(productsSection);
        };
    }

    // Обработчики для ссылок в меню
    const links = document.querySelectorAll(".menu-item > a");
    links.forEach(link => {
        link.onclick = function(event) {
            event.preventDefault(); // Предотвращаем стандартное поведение ссылки
            const targetId = this.getAttribute("data-link");
            const targetSection = document.getElementById(targetId);
            scrollToSection(targetSection);
        };
    });

    // Обработчики для кнопок "Заказать" в products-item
    const buttons = document.querySelectorAll(".products-item .button");
    buttons.forEach(button => {
        button.onclick = function() {
            scrollToSection(orderSection);
        };
    });

    // Обработчик для смены валюты
    if (currencyButton) {
        currencyButton.onclick = function(e) {
            const currentCurrency = e.target.innerText;
            let newCurrency = "$";
            let coefficient = 1;

            switch (currentCurrency) {
                case "$":
                    newCurrency = "₽";
                    coefficient = 90;
                    break;
                case "₽":
                    newCurrency = "BYN";
                    coefficient = 3;
                    break;
                case "BYN":
                    newCurrency = "€";
                    coefficient = 0.9;
                    break;
                case "€":
                    newCurrency = "¥";
                    coefficient = 6.9;
                    break;
            }

            e.target.innerText = newCurrency;

            for (let i = 0; i < prices.length; i++) {
                prices[i].innerText = (prices[i].getAttribute("data-base-price") * coefficient).toFixed(1) + " " + newCurrency;
            }
        };
    }

    // Обработчик для отправки заказа
    if (orderActionButton) {
        orderActionButton.onclick = function() {
            let hasError = false;

            [productInput, nameInput, phoneInput].forEach(item => {
                if (!item.value) {
                    item.style.borderColor = "red";
                    hasError = true;
                } else {
                    item.style.borderColor = "";
                }
            });

            if (!hasError) {
                [productInput, nameInput, phoneInput].forEach(item => {
                    item.value = "";
                });
                alert("Спасибо за заказ! Мы скоро свяжемся с вами!");
            }
        };
    }
});

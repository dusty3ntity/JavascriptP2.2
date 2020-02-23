const LOCAL_STORAGE = require("./LocalStorage");

let cartVisible;
const $CART_BUTTON = $("#cart-toggler");

function initializeCart() {
    cartVisible = LOCAL_STORAGE.get("cart-visible");
    if (typeof cartVisible === "undefined") cartVisible = screen.width > 500;
    if (cartVisible) toggleCart(false);

    $CART_BUTTON.click(() => toggleCart(true));
}

function toggleCart(save) {
    if (save) LOCAL_STORAGE.set("cart-visible", !cartVisible);
    $("#wrapper").toggleClass("cart-visible");
    $("#cart").toggleClass("cart-visible");
    $CART_BUTTON.toggleClass("cart-visible");
}

exports.initializeCart = initializeCart;

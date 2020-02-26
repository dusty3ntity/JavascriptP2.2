const LOCAL_STORAGE = require("./LocalStorage");

let cartHidden;
const $CART_BUTTON = $("#cart-toggler");

function initializeCart() {
    cartHidden = LOCAL_STORAGE.get("cart-hidden");
    if (typeof cartHidden === "undefined") cartHidden = screen.width < 500;
    toggleCart();

    $CART_BUTTON.click(() => {
        cartHidden = !cartHidden;
        toggleCart();
    });
}

function toggleCart() {
    if (cartHidden) hideCart();
    else showCart();
}

function showCart() {
    LOCAL_STORAGE.set("cart-hidden", false);
    $("#wrapper").removeClass("cart-hidden");
    $("#footer").removeClass("cart-hidden");
    $("#cart").removeClass("cart-hidden");
    $CART_BUTTON.removeClass("cart-hidden");
}

function hideCart() {
    LOCAL_STORAGE.set("cart-hidden", true);
    $("#wrapper").addClass("cart-hidden");
    $("#footer").addClass("cart-hidden");
    $("#cart").addClass("cart-hidden");
    $CART_BUTTON.addClass("cart-hidden");
}

exports.initializeCart = initializeCart;

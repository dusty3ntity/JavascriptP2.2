const TEMPLATES = require("../Templates");
const LOCAL_STORAGE = require("../LocalStorage");
const CART_TOGGLER = require("../CartToggler");

const $CART = $("#cart-body");
const $ITEMS_COUNT = $("#cart-items-count");
const $TOTAL_PRICE = $(".total-price-value");

let Cart;

function initializeCart() {
    Cart = LOCAL_STORAGE.get("cart");
    $CART.html("");

    let totalPrice = 0;
    Cart.forEach(item => {
        totalPrice += item.quantity * item.pizza[item.size.field].price;
        var htmlCode = TEMPLATES.OrderCartItem(item);
        var $node = $(htmlCode);
        $CART.append($node);
    });

    $TOTAL_PRICE.text(totalPrice);
    $ITEMS_COUNT.text(Cart.length);
    $("#edit-order-button").click(() => {
        window.location.href = "/";
    });
    CART_TOGGLER.initializeCart();
}

function getCartItems() {
    return Cart;
}

function clearCart() {
    Cart = [];
    LOCAL_STORAGE.set("cart", Cart);
    initializeCart();
}

exports.initializeCart = initializeCart;
exports.getCartItems = getCartItems;
exports.clearCart = clearCart;

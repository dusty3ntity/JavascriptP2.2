const TEMPLATES = require("../Templates");
const LOCAL_STORAGE = require("../LocalStorage");
const CART_TOGGLER = require("../CartToggler");

const PIZZA_SIZE = {
    Small: { field: "smallSize", string: "Мала" },
    Big: { field: "bigSize", string: "Велика" }
};

let CART = [];

const $CART = $("#cart-body");
const $ITEMS_COUNT = $("#cart-items-count");
const $TOTAL_PRICE = $(".total-price-value");

$("#clear-order").click(clearCart);

function addToCart(pizza, size) {
    let pizzaInCart;
    for (let i = 0; i < CART.length; i++)
        if (
            CART[i].pizza.title === pizza.title &&
            CART[i].size.field === size.field
        ) {
            pizzaInCart = CART[i];
            break;
        }

    if (pizzaInCart) pizzaInCart.quantity++;
    else
        CART.push({
            pizza: pizza,
            size: size,
            quantity: 1
        });
    updateCart();
}

function clearCart() {
    CART = [];
    updateCart();
}

function removeFromCart(item) {
    CART.splice(CART.indexOf(item), 1);
    updateCart();
}

function initializeCart() {
    let cart = LOCAL_STORAGE.get("cart");
    if (cart) CART = cart;
    CART_TOGGLER.initializeCart();
    $("#order-button").click(() => {
        if (CART.length > 0) window.location.href = "/order";
    });
    updateCart();
}

function getPizzaInCart() {
    return CART;
}

function updateCart() {
    LOCAL_STORAGE.set("cart", CART);

    $CART.html("");
    $ITEMS_COUNT.text(CART.length);

    function showOnePizzaInCart(item) {
        var htmlCode = TEMPLATES.PizzaCartItem(item);
        var $node = $(htmlCode);

        $node.find(".plus").click(() => {
            item.quantity++;
            updateCart();
        });

        $node.find(".minus").click(() => {
            item.quantity--;
            if (item.quantity < 1) removeFromCart(item);
            updateCart();
        });

        $node.find(".remove").click(() => {
            removeFromCart(item);
        });

        $CART.append($node);
    }

    function updateTotalPrice() {
        let price = 0;

        CART.forEach(item => {
            price += item.quantity * item.pizza[item.size.field].price;
        });

        $TOTAL_PRICE.text(price);
    }

    CART.forEach(showOnePizzaInCart);
    updateTotalPrice();
}

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;
exports.getPizzaInCart = getPizzaInCart;
exports.initializeCart = initializeCart;
exports.PizzaSize = PIZZA_SIZE;

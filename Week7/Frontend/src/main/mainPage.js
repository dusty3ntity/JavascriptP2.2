$(document).ready(() => {
    var PizzaMenu = require('./PizzaMenu');
    var PizzaCart = require('./PizzaCart');

    PizzaCart.initializeCart();
    PizzaMenu.initializeMenu();
});
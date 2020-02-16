$(document).ready(() => {
    var PizzaMenu = require('./pizza/PizzaMenu');
    var PizzaCart = require('./pizza/PizzaCart');
    var PizzaList = require('./PizzaList');

    PizzaCart.initializeCart();
    PizzaMenu.initializeMenu();
});
$(document).ready(() => {
    const ORDER_CART = require("./OrderCart");
    const FORM_VALIDATOR = require("./FormValidator");
    const API = require("../API");

    ORDER_CART.initializeCart();
    if (!ORDER_CART.getCartItems() || ORDER_CART.getCartItems().length == 0) {
        alert("Ваша корзина порожня! Додайте щось до неї...");
        window.location.href = "/";
    }


    $("#process-order").click(() => {
        FORM_VALIDATOR.initializeValidators();
        if (FORM_VALIDATOR.isValid()) {
            let data = { 
                customerData: FORM_VALIDATOR.getFormData(), 
                cart: ORDER_CART.getCartItems() 
            };
            API.createOrder( data,
                () => {
                    console.log(data);
                    alert("Order sent!");
                }
            );
        }
    });
});

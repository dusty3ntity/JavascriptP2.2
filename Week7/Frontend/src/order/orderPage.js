$(document).ready(() => {
    const ORDER_CART = require("./OrderCart");
    const FORM_VALIDATOR = require("./FormValidator");
    const API = require("../API");
    const GOOGLE_MAPS = require("./GoogleMaps");
    const TEMPLATES = require("../Templates");

    ORDER_CART.initializeCart();
    if (!ORDER_CART.getCartItems() || ORDER_CART.getCartItems().length == 0) {
        alert("Ваш кошик порожній! Додайте щось до нього...");
        window.location.href = "/";
    }

    GOOGLE_MAPS.initializeMap();
    FORM_VALIDATOR.initializeValidators();

    $("#process-order").click(() => {
        if (!FORM_VALIDATOR.isValid()) return;
        let data = {
            customerData: FORM_VALIDATOR.getFormData(),
            cart: ORDER_CART.getCartItems()
        };
        let $container = $("#order-form-container");
        let $swappedContainer = $("#swapped-container");
        $container.slideUp(250, () => {
            $swappedContainer.hide();
            let htmlCode = TEMPLATES.LiqPayWidget();
            let $node = $(htmlCode);

            API.createOrder(data, function(err, result) {
                var data_res = JSON.parse(result);

                LiqPayCheckout.init({
                    data: data_res.data,
                    signature: data_res.signature,
                    embedTo: "#liqpay",
                    mode: "embed" //	embed	||	popup
                })
                    .on("liqpay.callback", function(items) {
                        ORDER_CART.clearCart();
                        console.log(items.status);
                        console.log(items);
                    })
                    .on("liqpay.close", function(items) {
                        window.location.href = "/";
                    });
            });

            $node.appendTo($container);
            $container.slideDown(250);
        });
    });
});

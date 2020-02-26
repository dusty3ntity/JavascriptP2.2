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
                initLiqPay(result);
            });

            $node.appendTo($container);
            $container.slideDown(250);
        });
    });

    function initLiqPay(requestResult) {
        let data = JSON.parse(requestResult);

        LiqPayCheckout.init({
            data: data.data,
            signature: data.signature,
            embedTo: "#liqpay",
            mode: "embed", //	embed	||	popup
            language: "uk"
        })
            .on("liqpay.callback", result =>
                processPaymentResult(result.status)
            )
            .on("liqpay.close", () => (window.location.href = "/"));
    }

    function processPaymentResult(paymentStatus) {
        if (paymentStatus === "success" || paymentStatus === "sandbox") {
            ORDER_CART.clearCart();
            $("#liqpay-result").show();
        }
    }
});

$(function() {
    const ITEM = $("#item");
    const ITEM_CHECKOUT = $("#item-checkout");
    const CART = $(".cart-main > .inner-container");
    const CHECKOUT_REMAINING = $(".checkout-remaining");
    const CHECKOUT_BOUGHT = $(".checkout-bought");
    const ADD_FIELD = $("#new-field");
    const ADD_BUTTON = $("#new-button");

    ITEM.remove();
    ITEM_CHECKOUT.remove();

    function addItem(name) {
        let item = $(ITEM.html());
        let itemCheckout = $(ITEM_CHECKOUT.html());

        let itemName = item.find(".goods-title-uncrossed");
        let itemNameCrossed = item.find(".goods-title-crossed");
        let itemNameField = item.find(".title-field");
        let itemCheckoutName = itemCheckout.find(".goods-title");

        let minusButton = item.find(".minus");
        let itemCount = item.find(".goods-count");
        let itemCheckoutCount = itemCheckout.find(".goods-count");
        let plusButton = item.find(".plus");

        let boughtButton = item.find(".bought");
        let notBoughtButton = item.find(".not-bought");
        let removeButton = item.find(".remove");

        function refade(node, f) {
            node.fadeOut(250, () => {
                f();
                node.fadeIn(250);
            });
        }
    
        function slideAdd(node, f) {
            node.slideDown(250, f);
        }
    
        function slideRemove(node, f) {
            node.slideUp(250, f);
        }

        itemName.click(() => {
            itemName.hide();
            let name = itemName.text();
            itemNameField.val(name);
            itemNameField.show();
            itemNameField.focus();
        });

        itemNameField.on("keypress", e => {
            if (e.which === 13) updateName();
        });

        itemNameField.focusout(() => {
            updateName();
        });

        function updateName() {
            let name = itemNameField.val();
            if (name == null || name.length < 1) {
                name = itemName.text();
            }
            itemName.text(name);
            itemNameCrossed.text(name);
            itemCheckoutName.text(name);
            itemNameField.hide();
            itemName.show();
        }

        minusButton.click(() => {
            refade(itemCount, () => {
                let count = parseInt(itemCount.text());
                count--;
                itemCount.text(count);
                itemCheckoutCount.text(count);
                if (count === 1) minusButton.attr("disabled", "disabled");
            });
        });

        plusButton.click(() => {
            refade(itemCount, () => {
                let count = parseInt(itemCount.text());
                if (count === 1) minusButton.removeAttr("disabled");
                count++;
                itemCount.text(count);
                itemCheckoutCount.text(count);
            });
        });

        boughtButton.click(() => {
            refade(item.children(), () => {
                minusButton.hide();
                plusButton.hide();
                boughtButton.hide();
                removeButton.hide();

                itemName.hide();
                itemNameCrossed.show();
                itemCheckoutName.css("text-decoration", "line-through");

                CHECKOUT_BOUGHT.append(itemCheckout);

                notBoughtButton.show();
            });
        });

        notBoughtButton.click(() => {
            refade(item.children(), () => {
                notBoughtButton.hide();

                itemName.show();
                itemNameCrossed.hide();
                itemCheckoutName.css("text-decoration", "none");

                CHECKOUT_REMAINING.append(itemCheckout);

                minusButton.show();
                plusButton.show();
                boughtButton.show();
                removeButton.show();
            });
        });

        removeButton.click(() => {
            slideRemove(item, () => {
                item.remove();
                itemCheckout.remove();
            });
        });

        itemName.text(name);
        itemNameCrossed.text(name);
        itemCheckoutName.text(name);
        item.hide(); // For animation purposes

        item.appendTo(CART).slideDown(250);
        CHECKOUT_REMAINING.append(itemCheckout);
    }

    ADD_BUTTON.click(() => {
        newItem();
    });

    ADD_FIELD.on("keypress", e => {
        if (e.which === 13) newItem();
    });

    function newItem() {
        let val = ADD_FIELD.val();
        if (val == null || val.length === 0) return;
        addItem(ADD_FIELD.val());
        ADD_FIELD.val("");
    }

    addItem("Помідори");
    addItem("Печиво");
    addItem("Сир");
});

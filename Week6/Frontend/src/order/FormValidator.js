const $name = $("#name-input");
const $phone = $("#phone-input");
const $address = $("#address-input");

const $nameLabel = $("#name-label");
const $phoneLabel = $("#phone-label");
const $addressLabel = $("#address-label");

const $nameError = $("#name-error");
const $phoneError = $("#phone-error");
const $addressError = $("#address-error");

const NAME_REGEX = /^([А-я]|[І,і,Ї,ї,Є,є]){3,12}\s([А-я]|[І,і,Ї,ї,Є,є]){2,16}$/;
const PHONE_REGEX = /^(\+38)?0[3-9]\d\d{7}$/;
const ADDRESS_REGEX = /[\s\S]{10,50}/;

function initializeValidators() {
    initializeValidator($name, NAME_REGEX, $nameLabel, $nameError);
    initializeValidator($phone, PHONE_REGEX, $phoneLabel, $phoneError);
    initializeValidator($address, ADDRESS_REGEX, $addressLabel, $addressError);
}

function initializeValidator(input, regex, label, errorLabel) {
    input.focusout(() => {
        validate();
    });

    function validate() {
        if (!regex.test(input.val().trim())) {
            input.removeClass("validation-success");
            input.addClass("validation-error");
            label.removeClass("validation-success");
            label.addClass("validation-error");
            errorLabel.addClass("visible");
        } else {
            input.removeClass("validation-error");
            input.addClass("validation-success");
            label.removeClass("validation-error");
            label.addClass("validation-success");
            errorLabel.removeClass("visible");
        }
    }

    validate();
}

function isValid() {
    return (
        !$name.hasClass("validation-error") &&
        !$phone.hasClass("validation-error") &&
        !$address.hasClass("validation-error")
    );
}

function getFormData() {
    return {
        name: $name.val().trim(),
        phone: $phone.val(),
        address: $address.val().trim()
    };
}

exports.initializeValidators = initializeValidators;
exports.isValid = isValid;
exports.getFormData = getFormData;

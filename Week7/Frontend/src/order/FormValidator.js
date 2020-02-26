const SUMMARY_OPERATOR = require("./SummaryOperator");

const GOOGLE_MAPS = require("./GoogleMaps");

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
const PHONE_REGEX = /^(\+38)?0[3-9]\d{8}$/;
const ADDRESS_REGEX = /[\s\S]{10,100}/;

function initializeValidators() {
    initializeValidator($name, NAME_REGEX, $nameLabel, $nameError);
    initializeValidator($phone, PHONE_REGEX, $phoneLabel, $phoneError);
    initializeAddressValidator();
}

function initializeValidator(input, regex, label, errorLabel) {
    input.focusout(() => validate());

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
}

function initializeAddressValidator() {
    $address.focusout(() => {
        if (ADDRESS_REGEX.test($address.val().trim()))
            GOOGLE_MAPS.processAddress($address.val().trim(), validateAddress);
        else validateAddress("Вкажіть коректну адресу.")
    });
}

function validateAddress(err, deliveryDuration) {
    if (err) {
        SUMMARY_OPERATOR.resetData();
        $address.removeClass("validation-success");
        $address.addClass("validation-error");
        $addressLabel.removeClass("validation-success");
        $addressLabel.addClass("validation-error");
        $addressError.text(err);
        $addressError.addClass("visible");
    }
    else {
        SUMMARY_OPERATOR.updateData($address.val().trim(), deliveryDuration);
        $address.addClass("validation-success");
        $address.removeClass("validation-error");
        $addressLabel.addClass("validation-success");
        $addressLabel.removeClass("validation-error");
        $addressError.removeClass("visible");
    }
}

function isValid() {
    return (
        $name.hasClass("validation-success") &&
        $phone.hasClass("validation-success") &&
        $address.hasClass("validation-success")
    );
}

function getFormData() {
    if (!isValid()) return null;
    return {
        name: $name.val().trim(),
        phone: $phone.val(),
        address: $address.val().trim()
    };
}

exports.initializeValidators = initializeValidators;
exports.validateAddress = validateAddress;
exports.isValid = isValid;
exports.getFormData = getFormData;

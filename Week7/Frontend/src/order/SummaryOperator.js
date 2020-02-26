const $address = $("#destination-address");
const $deliveryDuration = $("#delivery-duration");

function updateData(address, duration) {
    $address.text(address);
    $deliveryDuration.text(duration);
}

function resetData() {
    $address.text("невідома");
    $deliveryDuration.text("невідомий");
}

exports.updateData = updateData;
exports.resetData = resetData;

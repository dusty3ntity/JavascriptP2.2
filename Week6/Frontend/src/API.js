const API_URL = "http://127.0.0.1:5050";

function backendGet(url, callback) {
    $.ajax({
        url: API_URL + url,
        type: "GET",
        success: data => {
            callback(null, data);
        },
        error: () => {
            callback(new Error("Ajax Failed"));
        }
    })
}

function backendPost(url, data, callback) {
    $.ajax({
        url: API_URL + url,
        type: "POST",
        contentType : "application/json",
        data: JSON.stringify(data),
        success: data => {
            callback(null, data);
        },
        error: () => {
            callback(new Error("Ajax Failed"));
        }
    })
}

exports.getPizzaList = callback => {
    backendGet("/api/get-pizza-list/", callback);
};

exports.createOrder = (orderInfo, callback) => {
    backendPost("/api/create-order/", orderInfo, callback);
};

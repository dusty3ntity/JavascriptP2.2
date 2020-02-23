let PizzaList = require("./data/PizzaList");

exports.getPizzaList = (req, res) => {
    res.send(PizzaList);
};

exports.createOrder = (req, res) => {
    var orderInfo = req.body;
    console.log("Creating Order", orderInfo);

    res.send({
        success: true,
        data: orderInfo
    });
};
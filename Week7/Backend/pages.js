exports.mainPage = (req, res) => {
    res.render("mainPage", {
        pageTitle: "Меню",
        jsFile: "main.js",
        maps: false,
        liqpay: false
    });
};

exports.orderPage = (req, res) => {
    res.render("orderPage", {
        pageTitle: "Замовлення",
        jsFile: "order.js",
        maps: true,
        liqpay: true
    });
};
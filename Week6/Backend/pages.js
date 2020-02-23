exports.mainPage = (req, res) => {
    res.render("mainPage", {
        pageTitle: "Меню",
        jsFile: "main.js"
    });
};

exports.orderPage = (req, res) => {
    res.render("orderPage", {
        pageTitle: "Замовлення",
        jsFile: "order.js"
    });
};
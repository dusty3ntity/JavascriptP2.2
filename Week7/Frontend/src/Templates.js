var fs = require('fs');
var ejs = require('ejs');

exports.PizzaMenuItem = ejs.compile(fs.readFileSync('./Frontend/templates/main/PizzaMenuItem.ejs', "utf8"));
exports.PizzaCartItem = ejs.compile(fs.readFileSync('./Frontend/templates/main/PizzaCartItem.ejs', "utf8"));
exports.PizzaFilter = ejs.compile(fs.readFileSync('./Frontend/templates/main/PizzaFilter.ejs', "utf8"));

exports.OrderCartItem = ejs.compile(fs.readFileSync('./Frontend/templates/order/OrderCartItem.ejs', "utf8"));
exports.LiqPayWidget = ejs.compile(fs.readFileSync('./Frontend/templates/order/LiqPayWidget.ejs', "utf8"));

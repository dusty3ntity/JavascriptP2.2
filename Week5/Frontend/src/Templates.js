var fs = require('fs');
var ejs = require('ejs');

exports.PizzaMenuItem = ejs.compile(fs.readFileSync('./Frontend/templates/PizzaMenuItem.ejs', "utf8"));
exports.PizzaCartItem = ejs.compile(fs.readFileSync('./Frontend/templates/PizzaCartItem.ejs', "utf8"));
exports.PizzaFilter = ejs.compile(fs.readFileSync('./Frontend/templates/PizzaFilter.ejs', "utf8"));

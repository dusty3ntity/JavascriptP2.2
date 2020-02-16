let basil = require("basil.js");
basil = new basil();

exports.get = key => basil.get(key);
exports.set = (key, value) => basil.set(key, value);

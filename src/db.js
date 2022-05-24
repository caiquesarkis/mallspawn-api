"use strict";
exports.__esModule = true;
var mysql2_1 = require("mysql2");
var express_1 = require("express");
require("dotenv/config");
var app = (0, express_1["default"])();
var connection = mysql2_1["default"].createConnection({
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
    database: process.env.DB_NAME
});
exports["default"](function () {
    var query = 'SELECT * FROM stores;';
    connection.query(query, function (err, results) {
        console.log(results, err);
    });
});

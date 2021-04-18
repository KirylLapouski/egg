"use strict";
exports.__esModule = true;
exports.WordToken = exports.ApplyToken = exports.ValueToken = void 0;
var ValueToken = /** @class */ (function () {
    function ValueToken(value) {
        this.value = value;
        this.type = 'value';
    }
    return ValueToken;
}());
exports.ValueToken = ValueToken;
var ApplyToken = /** @class */ (function () {
    function ApplyToken(operator, args) {
        this.operator = operator;
        this.args = args;
        this.type = 'apply';
    }
    return ApplyToken;
}());
exports.ApplyToken = ApplyToken;
var WordToken = /** @class */ (function () {
    function WordToken(name) {
        this.name = name;
        this.type = 'word';
    }
    return WordToken;
}());
exports.WordToken = WordToken;

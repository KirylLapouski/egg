"use strict";
exports.__esModule = true;
exports.run = void 0;
var parser_1 = require("./parser/parser");
var evaluator_1 = require("./evaluator/evaluator");
var topEnv = Object.create(null);
topEnv["true"] = true;
topEnv["false"] = false;
["+", "-", "*", "/", "==", "<", ">"].forEach(function (op) {
    topEnv[op] = new Function("a, b", "return a " + op + " b;");
});
topEnv["print"] = function (value) {
    console.log(value);
    return value;
};
function run(program) {
    var env = Object.create(topEnv);
    return evaluator_1.evaluate(parser_1.parse(program), env);
}
exports.run = run;

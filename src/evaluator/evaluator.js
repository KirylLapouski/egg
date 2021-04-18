"use strict";
exports.__esModule = true;
exports.evaluate = void 0;
var speacialForms_1 = require("./speacialForms");
function evaluate(expr, env) {
    debugger;
    var token;
    if (expr.type === 'value') {
        return expr.value;
    }
    if (expr.type === 'word') {
        token = expr;
        if (token.name in env)
            return env[token.name];
        else
            throw new ReferenceError("Undefined variable: " +
                token.name);
    }
    if (expr.type === 'apply') {
        token = expr;
        if (token.operator.type == "word" &&
            token.operator.name in speacialForms_1.specialForms)
            return speacialForms_1.specialForms[token.operator.name](token.args, env);
        var op = evaluate(token.operator, env);
        if (typeof op != "function")
            throw new TypeError("Applying a non-function.");
        return op.apply(null, token.args.map(function (arg) {
            return evaluate(arg, env);
        }));
    }
}
exports.evaluate = evaluate;

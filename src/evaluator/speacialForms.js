"use strict";
exports.__esModule = true;
exports.specialForms = void 0;
var evaluator_1 = require("./evaluator");
exports.specialForms = Object.create(null);
exports.specialForms["fun"] = function (args, env) {
    if (!args.length)
        throw new SyntaxError("Functions need a body");
    function name(expr) {
        if (expr.type != "word")
            throw new SyntaxError("Arg names must be words");
        return expr.name;
    }
    var argNames = args.slice(0, args.length - 1).map(name);
    var body = args[args.length - 1];
    return function () {
        if (arguments.length != argNames.length)
            throw new TypeError("Wrong number of arguments");
        var localEnv = Object.create(env);
        for (var i = 0; i < arguments.length; i++)
            localEnv[argNames[i]] = arguments[i];
        return evaluator_1.evaluate(body, localEnv);
    };
};
exports.specialForms["do"] = function (args, env) {
    var value = false;
    args.forEach(function (arg) {
        value = evaluator_1.evaluate(arg, env);
    });
    return value;
};
exports.specialForms["define"] = function (args, env) {
    if (args.length != 2 || args[0].type != "word")
        throw new SyntaxError("Bad use of define");
    var value = evaluator_1.evaluate(args[1], env);
    env[args[0].name] = value;
    return value;
};
exports.specialForms["if"] = function (args, env) {
    if (args.length != 3)
        throw new SyntaxError("Bad number of args to if");
    if (evaluator_1.evaluate(args[0], env) !== false)
        return evaluator_1.evaluate(args[1], env);
    else
        return evaluator_1.evaluate(args[2], env);
};
exports.specialForms["while"] = function (args, env) {
    if (args.length != 2)
        throw new SyntaxError("Bad number of args to while");
    while (evaluator_1.evaluate(args[0], env) !== false)
        evaluator_1.evaluate(args[1], env);
    // Since undefined does not exist in Egg, we return false,
    // for lack of a meaningful result.
    return false;
};

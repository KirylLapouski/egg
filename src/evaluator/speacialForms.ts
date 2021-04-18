import {evaluate} from "./evaluator";

export const specialForms = Object.create(null);

specialForms["fun"] = function(args, env) {
    if (!args.length)
        throw new SyntaxError("Functions need a body");
    function name(expr) {
        if (expr.type != "word")
            throw new SyntaxError("Arg names must be words");
        return expr.name;
    }
    const argNames = args.slice(0, args.length - 1).map(name);
    const body = args[args.length - 1];

    return function() {
        if (arguments.length != argNames.length)
            throw new TypeError("Wrong number of arguments");
        const localEnv = Object.create(env);
        for (let i = 0; i < arguments.length; i++)
            localEnv[argNames[i]] = arguments[i];
        return evaluate(body, localEnv);
    };
};

specialForms["do"] = function(args, env) {
    let value = false;
    args.forEach(function(arg) {
        value = evaluate(arg, env);
    });
    return value;
};

specialForms["define"] = function(args, env) {
    if (args.length != 2 || args[0].type != "word")
        throw new SyntaxError("Bad use of define");
    const value = evaluate(args[1], env);
    env[args[0].name] = value;
    return value;
};

specialForms["if"] = function(args, env) {
    if (args.length != 3)
        throw new SyntaxError("Bad number of args to if");

    if (evaluate(args[0], env) !== false)
        return evaluate(args[1], env);
    else
        return evaluate(args[2], env);
};

specialForms["while"] = function(args, env) {
    if (args.length != 2)
        throw new SyntaxError("Bad number of args to while");

    while (evaluate(args[0], env) !== false)
        evaluate(args[1], env);

    // Since undefined does not exist in Egg, we return false,
    // for lack of a meaningful result.
    return false;
};

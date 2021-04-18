import {specialForms} from "./speacialForms";
import {ApplyToken, Token, ValueToken, WordToken} from "../parser/token";
import {Enviroment} from "../index";

export function evaluate(expr: Token, env: Enviroment) {
    debugger;
    let token
    if(expr.type === 'value') {
        return (expr as ValueToken).value
    }
    if(expr.type === 'word') {
        token = expr as WordToken;
        if (token.name in env)
            return env[token.name];
        else
            throw new ReferenceError("Undefined variable: " +
                token.name);
    }
    if(expr.type === 'apply') {
        token = expr as ApplyToken;
        if (token.operator.type == "word" &&
            token.operator.name in specialForms)
            return specialForms[token.operator.name](token.args,
                env);
        const op = evaluate(token.operator, env);
        if (typeof op != "function")
            throw new TypeError("Applying a non-function.");
        return op.apply(null, token.args.map(function (arg) {
            return evaluate(arg, env);
        }));
    }
}

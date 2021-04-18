import {parse} from "./parser/parser";
import {evaluate} from "./evaluator/evaluator";

export interface Enviroment extends Record<string, unknown>{

}
const topEnv = Object.create(null);

topEnv["true"] = true;
topEnv["false"] = false;

["+", "-", "*", "/", "==", "<", ">"].forEach(function(op) {
    topEnv[op] = new Function("a, b", "return a " + op + " b;");
});

topEnv["print"] = function(value: string) {
    console.log(value);
    return value;
};

export function run(program: string) {
    const env = Object.create(topEnv);
    return evaluate(parse(program), env);
}


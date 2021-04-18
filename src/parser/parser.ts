import {ApplyToken, Token, WordToken} from "./token";

export function parse(program: string) {
    const result = parseExpression(program);
    if (skipSpace(result.rest).length > 0)
        throw new SyntaxError("Unexpected text after program");
    return result.expr;
}

function parseApply(expr: ApplyToken, program: string) {
    program = skipSpace(program);
    if (program[0] != "(")
        return {expr: expr, rest: program};

    program = skipSpace(program.slice(1));
    expr = {type: "apply", operator: expr as unknown as WordToken, args: []};
    while (program[0] != ")") {
        const arg = parseExpression(program);
        expr.args.push(arg.expr);
        program = skipSpace(arg.rest);
        if (program[0] == ",")
            program = skipSpace(program.slice(1));
        else if (program[0] != ")")
            throw new SyntaxError("Expected ',' or ')'");
    }
    return parseApply(expr, program.slice(1));
}


function skipSpace(string: string) {
    const first = string.search(/\S/);
    if (first == -1) return "";
    return string.slice(first);
}


function parseExpression(program: string) {
    program = skipSpace(program);
    let match, expr;
    if (match = /^"([^"]*)"/.exec(program))
        expr = {type: "value", value: match[1]};
    else if (match = /^\d+\b/.exec(program))
        expr = {type: "value", value: Number(match[0])};
    else if (match = /^[^\s(),"]+/.exec(program))
        expr = {type: "word", name: match[0]};
    else
        throw new SyntaxError("Unexpected syntax: " + program);

    return parseApply(expr, program.slice(match[0].length));
}

type TokenTypes = 'apply' | 'value' | 'word'
export interface Token {
    type:TokenTypes
}

export class ValueToken implements Token{
    readonly type: TokenTypes  = 'value';
    constructor(public readonly value: string | number) {
    }
}

export class ApplyToken implements Token {
    readonly type: TokenTypes  = 'apply';
    constructor(public readonly operator: WordToken,public readonly args: Token[]) {
    }
}

export class WordToken implements Token {
    readonly type: TokenTypes = 'word';
    constructor(public readonly name: string) {
    }
}

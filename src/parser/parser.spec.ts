import {parse} from "./parser";

describe("parser", () => {
    it("should parse +(a, 10)",() => {
        const res = parse("+(a, 10)");
        console.log(res);
    })

})

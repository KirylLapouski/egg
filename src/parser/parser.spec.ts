import { parse } from "./parser";

describe("parser", () => {
  it("should parse +(a, 10)", () => {
    const res = parse("+(a, 10)");
    const expecteTokens = {
      type: "apply",
      operator: { type: "word", name: "+" },
      args: [
        { type: "word", name: "a" },
        { type: "value", value: 10 },
      ],
    };

    expect(res).toEqual(expecteTokens);
  });

  it(
    "should parse `\n" +
      "do(define(plusOne, fun(a, +(a, 1))),\n" +
      "   print(plusOne(10)))\n" +
      "`",
    () => {
      const res = parse(`
            do(define(plusOne, fun(a, +(a, 1))),
               print(plusOne(10)))
            `);

      expect(res).toEqual({
        type: "apply",
        operator: { type: "word", name: "do" },
        args: [
          {
            type: "apply",
            operator: { type: "word", name: "define" },
            args: [
              { type: "word", name: "plusOne" },
              {
                type: "apply",
                operator: { type: "word", name: "fun" },
                args: [
                  { type: "word", name: "a" },
                  {
                    type: "apply",
                    operator: { type: "word", name: "+" },
                    args: [
                      { type: "word", name: "a" },
                      { type: "value", value: 1 },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "apply",
            operator: { type: "word", name: "print" },
            args: [
              {
                type: "apply",
                operator: { type: "word", name: "plusOne" },
                args: [{ type: "value", value: 10 }],
              },
            ],
          },
        ],
      });
    }
  );
});

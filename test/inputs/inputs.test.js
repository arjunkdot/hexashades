const hexashades = require("../../dist/index.cjs.js");

const ctx = new hexashades.Colors();

describe("input types", () => {
  test("divisible by 100", () => {
    expect(ctx.createColors("fff", 10).length).toBe(21);
  });
  test("a float number for percentage", () => {
    expect(ctx.createColors("fff", 10.2).length).toBe(21);
    expect(ctx.createColors("fff", 10.256371).length).toBe(21);
  });
});

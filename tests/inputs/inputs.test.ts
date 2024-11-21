import { Colors } from '../../src/index'

const ctx = new Colors();

describe("input types", () => {
  test("divisible by 100", () => {
    expect(ctx.createColors("fff", 10).length).toBe(21);
  });
  test("a float number for percentage", () => {
    expect(ctx.createColors("fff", 10.2).length).toBe(21);
    expect(ctx.createColors("fff", 10.256371).length).toBe(21);
  });
});

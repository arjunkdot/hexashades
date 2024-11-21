import { Colors } from '../../src/index'

const ctx = new Colors();

describe("output", () => {
  test("produces the correct amount of shades for 10%", () => {
    expect(ctx.createColors("663399", 10).length).toBe(21);
  });

  test("produces the correct amount of shades for 1%", () => {
    expect(ctx.createColors("663399", 1).length).toBe(201);
  });

  test("produces correct amount of shades for hex with 3 characters", () => {
    expect(ctx.createColors("f00", 10).length).toBe(21);
  });
});

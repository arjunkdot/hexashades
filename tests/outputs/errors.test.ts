import { Colors } from '../../src/index'

const ctx = new Colors();

describe("throws an error", () => {
  test("for invalid hex codes", () => {
    expect(() => ctx.createColors("xyz", 10)).toThrow(
      "Invalid input. Please make sure the HEX code given is valid."
    );
    expect(() => ctx.createColors("a0axa0", 10)).toThrow(
      "Invalid input. Please make sure the HEX code given is valid."
    );
    expect(() => ctx.createColors("a0aaaz", 10)).toThrow(
      "Invalid input. Please make sure the HEX code given is valid."
    );
  });

  test("for invalid input length", () => {
    expect(() => ctx.createColors("66", 10)).toThrow(
      "Invalid input. Wrong input values are given."
    );
    expect(() => ctx.createColors("6", 10)).toThrow(
      "Invalid input. Wrong input values are given."
    );
    expect(() => ctx.createColors("6666", 10)).toThrow(
      "Invalid input. Wrong input values are given."
    );
    expect(() => ctx.createColors("66666", 10)).toThrow(
      "Invalid input. Wrong input values are given."
    );
    expect(() => ctx.createColors("6666666", 10)).toThrow(
      "Invalid input. Wrong input values are given."
    );
  });

  test("for invalid percentage value", () => {
    expect(() => ctx.createColors("66", -10)).toThrow(
      "Invalid input. Wrong input values are given."
    );
    expect(() => ctx.createColors("66", 110)).toThrow(
      "Invalid input. Wrong input values are given."
    );
  });

  test("for invalid percentage type", () => {
    // @ts-expect-error Test for invalid percentage type
    expect(() => ctx.createColors("66", 'abc')).toThrow(
      "Invalid input. Wrong input types are given."
    );
    // @ts-expect-error Test for invalid percentage type
    expect(() => ctx.createColors("66", true)).toThrow(
      "Invalid input. Wrong input types are given."
    );
  });

  test("for invalid hex code type", () => {
    // @ts-expect-error Test for invalid hex code type: number
    expect(() => ctx.createColors(666, 10)).toThrow(
      "Invalid input. Wrong input types are given."
    );
    // @ts-expect-error Test for invalid hex code type: Boolean
    expect(() => ctx.createColors(true, 10)).toThrow(
      "Invalid input. Wrong input types are given."
    );
  });

  test("for invalid prefix type", () => {
    // @ts-expect-error Test for invalid prefix type
    expect(() => ctx.createColors('fff', 10, 'abc')).toThrow(
      "Invalid input. Wrong input types are given."
    );
  });

});

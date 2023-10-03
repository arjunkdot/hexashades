const hexashades = require("../../dist/index.cjs.js");

const ctx = new hexashades.Colors();

describe("throws an error", () => {
  test("for invalid hex codes", () => {
    expect(() => ctx.createColors("xyz", 10)).toThrow('Invalid input. Please make sure the HEX code given is valid.');
    expect(() => ctx.createColors("a0axa0", 10)).toThrow('Invalid input. Please make sure the HEX code given is valid.');
    expect(() => ctx.createColors("a0aaaz", 10)).toThrow('Invalid input. Please make sure the HEX code given is valid.');
  });

  test("for invalid input length", ()=>{
    expect(()=> ctx.createColors("66")).toThrow('Invalid input. Not a valid length');
    expect(()=> ctx.createColors("6")).toThrow('Invalid input. Not a valid length');
    expect(()=> ctx.createColors("6666")).toThrow('Invalid input. Not a valid length');
    expect(()=> ctx.createColors("66666")).toThrow('Invalid input. Not a valid length');
    expect(()=> ctx.createColors("6666666")).toThrow('Invalid input. Not a valid length');
  })
});

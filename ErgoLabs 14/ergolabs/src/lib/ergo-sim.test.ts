import { describe, expect, it } from "vitest";
import { expected, generate, lossProbability, sequence, summarize } from "./ergo-sim";

describe("ergo coin-toss model", () => {
  it("a win then a loss turns $100 into $90", () => {
    expect(sequence([1.5, 0.6], false).at(-1)).toBeCloseTo(90);
  });
  it("tails-first run exits below $10 at $7.78 while continued play ends at $59.05", () => {
    const h = [1.5, 1.5, 1.5, 1.5, 1.5, 0.6, 0.6, 0.6, 0.6, 0.6];
    const t = [...h].reverse();
    expect(sequence(t, false).at(-1)).toBeCloseTo(59.05, 2);
    expect(sequence(t, true).at(-1)).toBeCloseTo(7.78, 2);
    expect(sequence(h, true).at(-1)).toBeCloseTo(59.05, 2);
  });
  it("probability of finishing below $100 after 100 rounds is 86.44%", () => {
    expect(lossProbability(100)).toBeCloseTo(0.8644, 4);
  });
  it("expected wealth grows 5% per round", () => {
    expect(expected(1)).toBeCloseTo(105);
  });
  it("same seed gives the same 1,000 players", () => {
    const a = generate(42);
    expect(a).toHaveLength(1000);
    expect(generate(42)[7]).toEqual(a[7]);
    expect(summarize(a).means).toHaveLength(101);
  });
});

import { describe, expect, it } from "vitest";
import {
  MAX_ROUNDS,
  analyseResult,
  twoSidedProbability,
  validateResult,
} from "./ergo-results";

describe("student result validation", () => {
  it("rejects heads above the number of rounds", () => {
    expect(validateResult({ rounds: 10, heads: 11 })).toEqual({
      ok: false,
      error: "Heads cannot be more than the rounds you played.",
    });
  });

  it("rejects a round count above the cap", () => {
    expect(validateResult({ rounds: MAX_ROUNDS + 1, heads: 0 }).ok).toBe(false);
  });

  it("rejects a fraction of a round", () => {
    expect(validateResult({ rounds: 10.5, heads: 5 }).ok).toBe(false);
  });

  it("accepts a plain class result", () => {
    expect(validateResult({ rounds: "20", heads: "11" })).toEqual({
      ok: true,
      value: { rounds: 20, heads: 11 },
    });
  });
});

describe("probability comparison", () => {
  it("all heads out of ten is very unlikely for a fair coin", () => {
    expect(twoSidedProbability(10, 10)).toBeCloseTo(0.001953125, 9);
  });

  it("exactly half heads out of a hundred is not unusual at all", () => {
    expect(twoSidedProbability(100, 50)).toBe(1);
  });

  it("40 heads out of 100 is outside the usual spread but not unusual at the 5% level", () => {
    const p = twoSidedProbability(100, 40);
    expect(p).toBeGreaterThan(0.04);
    expect(p).toBeLessThan(0.07);
  });
});

describe("money comparison", () => {
  it("five heads and five tails leaves $59.05 and the typical growth rate", () => {
    const a = analyseResult({ rounds: 10, heads: 5 });
    expect(a.finalWealth).toBeCloseTo(59.049, 3);
    expect(a.realisedGrowthPerRound).toBeCloseTo(-0.05268, 5);
    expect(a.expectedWealth).toBeCloseTo(162.8895, 3);
    expect(a.finishedBelowStart).toBe(true);
  });

  it("reports the usual range around half heads", () => {
    const a = analyseResult({ rounds: 100, heads: 40 });
    expect(a.expectedHeads).toBe(50);
    expect(a.headsStdDev).toBe(5);
    expect(a.usualRangeLow).toBe(45);
    expect(a.usualRangeHigh).toBe(55);
    expect(a.zScore).toBe(-2);
    // ~5.7% chance for a fair coin: outside one standard deviation, still not
    // unusual at the conventional 5% level.
    expect(a.unusual).toBe(false);
  });
});

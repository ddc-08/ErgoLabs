import { describe, expect, it } from "vitest";
import { fairPremium, growthBoundary, householdPath, insuredWealth, shareBetterInsured, simulateE, uninsuredGrowth } from "./exp-e";

describe("Experiment E · insurance", () => {
  it("expected-wealth break-even premium is 5% × 95% = 4.75% per round", () => {
    expect(fairPremium(0.05, 0.95)).toBeCloseTo(0.0475, 10);
  });
  it("log-growth break-even premium is 1 − 0.05^0.05 ≈ 13.91% per round", () => {
    expect(growthBoundary(0.05, 0.95)).toBeCloseTo(1 - 0.05 ** 0.05, 12);
    expect(growthBoundary(0.05, 0.95)).toBeCloseTo(0.1391, 4);
  });
  it("uninsured log growth is 0.05 × ln(0.05) ≈ −0.1498 per round", () => {
    expect(uninsuredGrowth(0.05, 0.95)).toBeCloseTo(-0.14979, 5);
  });
  it("a 10% premium for 100 rounds leaves $100 × 0.9^100", () => {
    expect(insuredWealth(0.1, 100)).toBeCloseTo(100 * 0.9 ** 100, 12);
  });
  it("one 95% loss turns $100 into $5", () => {
    expect(householdPath([3], 5, 0.95).at(-1)).toBeCloseTo(5);
  });
  const r = simulateE({ people: 4000, seed: 42 });
  it("uninsured median never rises", () => {
    for (let t = 1; t < r.medianPath.length; t++) expect((r.medianPath[t] ?? 0)).toBeLessThanOrEqual((r.medianPath[t - 1] ?? 0));
  });
  it("simulated uninsured log growth is within 4 standard errors of exact", () => {
    const se = Math.abs(Math.log(0.05)) * Math.sqrt((0.05 * 0.95) / (4000 * 100));
    expect(Math.abs(r.meanLogGrowth - uninsuredGrowth(0.05, 0.95)) / se).toBeLessThan(4);
  });
  it("a cheaper premium beats the uninsured outcome at least as often", () => {
    expect(shareBetterInsured(r, 0.03)).toBeGreaterThanOrEqual(shareBetterInsured(r, 0.15));
  });
});

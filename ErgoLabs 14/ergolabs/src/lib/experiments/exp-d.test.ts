import { describe, expect, it } from "vitest";
import { expectedTerminal, growthDerivative, growthRate, medianPath, OPTIMAL_FRACTION, playerPath, simulateD } from "./exp-d";

describe("Experiment D · partial exposure", () => {
  it("compound growth is maximised at 25% exposure", () => {
    expect(OPTIMAL_FRACTION).toBe(0.25);
    expect(growthDerivative(0.25)).toBeCloseTo(0, 12);
    for (const f of [0, 0.1, 0.2, 0.3, 0.5, 1]) expect(growthRate(0.25)).toBeGreaterThanOrEqual(growthRate(f));
  });
  it("full exposure has log growth ½ln1.5 + ½ln0.6 ≈ −0.052680", () => {
    expect(growthRate(1)).toBeCloseTo(-0.05268, 5);
  });
  it("expected terminal wealth is highest at 100% exposure: $100 × 1.05^500", () => {
    expect(expectedTerminal(1, 500)).toBeCloseTo(100 * 1.05 ** 500, -10);
    expect(expectedTerminal(1, 500)).toBeGreaterThan(expectedTerminal(0.25, 500));
  });
  it("a win then a loss at 100% exposure leaves $90; 0% exposure never moves", () => {
    expect(playerPath(Uint8Array.from([1, 0]), 1).at(-1)).toBeCloseTo(90);
    expect(playerPath(Uint8Array.from([1, 0, 0]), 0).at(-1)).toBe(100);
  });
  const r = simulateD({ people: 2000, rounds: 200, seed: 42 });
  it("cash policy never crosses the 10% warning threshold", () => {
    expect(r.rows[0]?.everBelowThreshold).toBe(0);
    expect(r.rows[0]?.median).toBe(100);
  });
  it("simulated mean log growth is within 4 standard errors of the exact value", () => {
    for (const row of r.rows) {
      const se = Math.abs(Math.log1p(0.5 * row.fraction) - Math.log1p(-0.4 * row.fraction)) / (2 * Math.sqrt(2000 * 200));
      if (se) expect(Math.abs(row.meanLogGrowth - row.exactLogGrowth) / se).toBeLessThan(4);
    }
  });
  it("median path from heads counts matches the policy table's median", () => {
    r.rows.forEach((row) => expect((medianPath(r, row.fraction).at(-1) ?? 0)).toBeCloseTo(row.median, 6));
  });
  it("same seed reproduces the same run", () => {
    expect(simulateD({ people: 300, rounds: 50, seed: 7 }).rows[4]?.median).toBe(simulateD({ people: 300, rounds: 50, seed: 7 }).rows[4]?.median);
  });
});

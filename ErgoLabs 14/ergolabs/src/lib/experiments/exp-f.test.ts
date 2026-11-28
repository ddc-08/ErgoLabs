import { describe, it, expect } from 'vitest';
import { logChange, logCriterion, breakEvenCost, cappedExpectation, simulateF } from './exp-f';
describe('Experiment F', () => {
  it('first heads at toss 1 pays 1; toss 3 pays 4 with wealth 100 and cost 3', () => { expect(logChange(1,100,3)).toBeCloseTo(Math.log(98/100),12); expect(logChange(3,100,3)).toBeCloseTo(Math.log(101/100),12); });
  it('wealth 1 cost 1 has expected log change ln2', () => expect(logCriterion(1,1).value).toBeCloseTo(Math.LN2,9));
  it('omitted tail is below 1e-10 and bounds a longer sum', () => { const a = logCriterion(100,3); let longer = 0; for(let n=1;n<=a.terms+20;n++) longer += 2**-n * logChange(n,100,3); expect(a.tailBound).toBeLessThan(1e-10); expect(longer - a.value).toBeGreaterThanOrEqual(-1e-14); expect(longer-a.value).toBeLessThanOrEqual(a.tailBound + 1e-14); });
  it('break-even price has zero expected log change', () => { const root = breakEvenCost(100); expect(root).toBeGreaterThan(3); expect(Math.abs(logCriterion(100,root).value)).toBeLessThan(1e-8); });
  it('capped lotteries with cap index 5,10,20,30 have expected payout (K+1)/2', () => { for(const k of [5,10,20,30]) expect(cappedExpectation(k)).toBe((k+1)/2); });
  it('cost must be less than wealth plus minimum payout 1', () => expect(() => logCriterion(100,101)).toThrow());
  it('seeded log samples converge near the series benchmark', () => { const r=simulateF({samples:100000,repetitions:2}); for(const row of r.rows) expect(Math.abs(row.meanLog-r.benchmark.value)).toBeLessThan(5*row.se); });
});

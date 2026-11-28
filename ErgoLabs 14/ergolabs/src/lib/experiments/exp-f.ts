import { rng, geomspace } from './stats';
export const F_DEFAULTS = { wealth: 100, cost: 3, samples: 100000, repetitions: 5, seed: 42 };
export function logChange(n: number, wealth: number, cost: number) {
  const lp = (n - 1) * Math.LN2, offset = wealth - cost;
  if (offset > 0) { const a = Math.log(offset), m = Math.max(a, lp); return m + Math.log(Math.exp(a - m) + Math.exp(lp - m)) - Math.log(wealth); }
  return lp + Math.log1p(offset * Math.exp(-lp)) - Math.log(wealth);
}
export function logCriterion(wealth: number, cost: number, tolerance = 1e-10) {
  if (wealth <= 0 || cost < 0 || cost >= wealth + 1) throw Error('Require wealth > 0 and 0 ≤ cost < wealth + 1.');
  let k = 1;
  while (2 ** (-k) * ((k + 2) * Math.LN2 + Math.abs(Math.log(wealth))) >= tolerance || 2 ** (k - 1) < Math.abs(wealth - cost) || 2 ** k < wealth) k++;
  let value = 0;
  for (let n = 1; n <= k; n++) value += 2 ** (-n) * logChange(n, wealth, cost);
  return { value, tailBound: 2 ** (-k) * ((k + 2) * Math.LN2 + Math.abs(Math.log(wealth))), terms: k };
}
export function breakEvenCost(wealth: number) {
  let lo = 0, hi = wealth + 1 - Math.max(Number.EPSILON * (wealth + 1), Number.EPSILON);
  for (let i = 0; i < 80; i++) { const mid = (lo + hi) / 2; if (mid === lo || mid === hi) break; if (logCriterion(wealth, mid).value > 0) lo = mid; else hi = mid; }
  return (lo + hi) / 2;
}
export function cappedExpectation(k: number) { return (k + 1) / 2; }
export function simulateF({ wealth = 100, cost = 3, samples = 100000, repetitions = 5, seed = 42 } = {}) {
  const random = rng(seed), benchmark = logCriterion(wealth, cost);
  const indices = [...new Set(geomspace(1, samples, 300).map(v => Math.min(samples, Math.max(1, Math.round(v)))))];
  const rows = Array.from({ length: repetitions }, (_, rep) => {
    let sum = 0, logs = 0, logs2 = 0, largest = 0, maxN = 0, ix = 0;
    const means: number[] = [], logMeans: number[] = [], outcomes: number[] = [];
    for (let i = 1; i <= samples; i++) {
      const n = Math.floor(-Math.log2(1 - random())) + 1;
      const payout = 2 ** (n - 1), change = logChange(n, wealth, cost);
      if (!Number.isFinite(payout)) throw Error('A sampled payout exceeded floating-point range.');
      sum += payout; logs += change; logs2 += change * change; largest = Math.max(largest, payout); maxN = Math.max(maxN, n);
      if (i <= 12) outcomes.push(n);
      if (i === indices[ix]) { means.push(sum / i); logMeans.push(logs / i); ix++; }
    }
    return { repetition: rep + 1, mean: sum / samples, meanLog: logs / samples, largest, maxN, se: Math.sqrt(Math.max(0, (logs2 - logs * logs / samples) / (samples - 1)) / samples), means, logMeans, outcomes };
  });
  return { rows, indices, benchmark, root: breakEvenCost(wealth), wealth, cost, samples, repetitions, seed };
}

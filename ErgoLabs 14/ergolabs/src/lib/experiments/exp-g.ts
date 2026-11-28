import { rng, median, mean } from './stats';
export const G_DEFAULTS = { groups: 2000, rounds: 500, sizes: [1, 2, 5, 10, 50, 100], rhos: [0, 0.5, 1], comparisonSize: 10, seed: 42 };
export const soloGrowth = (Math.log(1.5) + Math.log(0.6)) / 2;
export function binomialProbabilities(m: number) {
  const probs = [2 ** -m];
  for (let h = 1; h <= m; h++) probs.push((probs[h - 1] ?? 0) * (m - h + 1) / h);
  return probs;
}
export function pooledMoments(m: number, rho: number) {
  let avg = 0, second = 0;
  binomialProbabilities(m).forEach((p, h) => { const l = Math.log(0.6 + 0.9 * h / m); avg += p * l; second += p * l * l; });
  const value = (1 - rho) * avg + rho * soloGrowth;
  return { value, variance: Math.max(0, (1 - rho) * second + rho * (Math.log(1.5) ** 2 + Math.log(0.6) ** 2) / 2 - value ** 2) };
}
export function redistribute(beforePerPerson: number, heads: number, members: number) { return beforePerPerson * (0.6 + 0.9 * heads / members); }
function binomialSampler(m: number, random: () => number) {
  let sum = 0; const cdf = binomialProbabilities(m).map(p => sum += p);
  return () => { const u = random(); let lo = 0, hi = m; while (lo < hi) { const mid = Math.floor((lo + hi) / 2); if (u > (cdf[mid] ?? 1)) lo = mid + 1; else hi = mid; } return lo; };
}
export function simulateG({ seed = 42, groups = 2000, rounds = 500, sizes = G_DEFAULTS.sizes, rhos = G_DEFAULTS.rhos, comparisonSize = 10 } = {}) {
  const random = rng(seed);
  const rows = rhos.flatMap(rho => sizes.map(m => {
    const sample = binomialSampler(m, random), factors = Array.from({ length: m + 1 }, (_, h) => Math.log(0.6 + 0.9 * h / m));
    const logs = new Float64Array(groups);
    for (let t = 0; t < rounds; t++) for (let g = 0; g < groups; g++) {
      const independentHeads = sample(), shared = random() < rho, sharedHeads = random() < 0.5;
      const h = shared ? (sharedHeads ? m : 0) : independentHeads;
      logs[g] = (logs[g] ?? 0) + (factors[h] ?? 0);
    }
    const terminal = Float64Array.from(logs, l => 100 * Math.exp(l));
    return { size: m, rho, simulated: mean(logs) / rounds, exact: pooledMoments(m, rho).value, median: median(terminal), mean: mean(terminal), belowStart: Array.from(logs).filter(l => l < 0).length / groups };
  }));
  const memberLogs = new Float64Array(groups * comparisonSize), pooledLogs = new Float64Array(groups);
  const pooledMedian = [100], unpooledMedian = [100], time = [0], examplePooled = [100], exampleUnpooled = [100];
  for (let t = 1; t <= rounds; t++) {
    for (let g = 0; g < groups; g++) {
      let heads = 0;
      for (let m = 0; m < comparisonSize; m++) { const win = random() < 0.5; if (win) heads++; const i = g * comparisonSize + m; memberLogs[i] = (memberLogs[i] ?? 0) + Math.log(win ? 1.5 : 0.6); }
      pooledLogs[g] = (pooledLogs[g] ?? 0) + Math.log(0.6 + 0.9 * heads / comparisonSize);
    }
    if (t % 5 === 0 || t === rounds) {
      const pooled = Float64Array.from(pooledLogs, l => 100 * Math.exp(l)), unpooled = new Float64Array(groups);
      for (let g = 0; g < groups; g++) { let total = 0; for (let m = 0; m < comparisonSize; m++) total += 100 * Math.exp(memberLogs[g * comparisonSize + m] ?? 0); unpooled[g] = total / comparisonSize; }
      time.push(t); pooledMedian.push(median(pooled)); unpooledMedian.push(median(unpooled)); examplePooled.push(pooled[0] ?? 100); exampleUnpooled.push(unpooled[0] ?? 100);
    }
  }
  return { rows, time, pooledMedian, unpooledMedian, examplePooled, exampleUnpooled, seed, groups, rounds, comparisonSize };
}

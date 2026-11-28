/* Experiment E: full insurance with a per-round premium (browser port of the uploaded script). */
import { middleCounts, rng } from "./stats";

export const E_DEFAULTS = {
  initialWealth: 100,
  people: 10_000,
  rounds: 100,
  lossProbability: 0.05,
  lossFraction: 0.95,
  premiums: [0.03, 0.05, 0.1, 0.15] as number[],
  threshold: 0.1,
  seed: 42,
};

/** Expected-wealth break-even premium: p·L (4.75% by default). */
export const fairPremium = (p: number, L: number) => p * L;
/** Uninsured log growth per round: p·ln(1−L). */
export const uninsuredGrowth = (p: number, L: number) => p * Math.log1p(-L);
/** Log-growth break-even premium: 1 − (1−L)^p (≈13.91% by default). */
export const growthBoundary = (p: number, L: number) => -Math.expm1(uninsuredGrowth(p, L));
export const insuredGrowth = (premium: number) => Math.log1p(-premium);
export const insuredWealth = (premium: number, t: number, w0 = 100) => w0 * (1 - premium) ** t;
export const uninsuredExpected = (p: number, L: number, t: number, w0 = 100) => w0 * (1 - p * L) ** t;

export type EResult = {
  seed: number;
  people: number;
  rounds: number;
  lossProbability: number;
  lossFraction: number;
  medianPath: number[];
  meanPath: number[];
  /** Histogram of final loss counts. */
  lossHist: Int32Array;
  /** Loss rounds (1-based) for the first three people. */
  sampleLosses: number[][];
  meanLogGrowth: number;
};

export function simulateE({
  seed = E_DEFAULTS.seed,
  people = E_DEFAULTS.people,
  rounds = E_DEFAULTS.rounds,
  lossProbability = E_DEFAULTS.lossProbability,
  lossFraction = E_DEFAULTS.lossFraction,
  initialWealth = E_DEFAULTS.initialWealth,
} = {}): EResult {
  const random = rng(seed);
  const counts = new Int32Array(people);
  const hist = new Int32Array(rounds + 1);
  const keep = Math.min(3, people);
  const sampleLosses: number[][] = Array.from({ length: keep }, () => []);
  const lf = Math.log1p(-lossFraction);
  const medianPath = [initialWealth];
  const meanPath = [initialWealth];
  for (let t = 1; t <= rounds; t++) {
    hist.fill(0);
    for (let i = 0; i < people; i++) {
      if (random() < lossProbability) {
        counts[i] = (counts[i] ?? 0) + 1;
        if (i < keep) sampleLosses[i]?.push(t);
      }
      { const count = counts[i] ?? 0; hist[count] = (hist[count] ?? 0) + 1; }
    }
    const [a, b] = middleCounts(hist, people);
    medianPath.push((initialWealth * Math.exp(a * lf) + initialWealth * Math.exp(b * lf)) / 2);
    let s = 0;
    for (let k = 0; k <= t; k++) if (hist[k]) s += (hist[k] ?? 0) * initialWealth * Math.exp(k * lf);
    meanPath.push(s / people);
  }
  let total = 0;
  for (let i = 0; i < people; i++) total += (counts[i] ?? 0);
  hist.fill(0);
  for (let i = 0; i < people; i++) { const count = counts[i] ?? 0; hist[count] = (hist[count] ?? 0) + 1; }
  return { seed, people, rounds, lossProbability, lossFraction, medianPath, meanPath, lossHist: hist, sampleLosses, meanLogGrowth: (total * lf) / people / rounds };
}

/** Quantile of uninsured terminal wealth (wealth falls as losses rise). */
export function uninsuredQuantile(r: EResult, q: number, w0 = 100) {
  const n = r.people;
  const pos = (n - 1) * (1 - q);
  const at = (rank: number) => {
    let seen = 0;
    for (let k = 0; k < r.lossHist.length; k++) {
      seen += (r.lossHist[k] ?? 0);
      if (seen > rank) return w0 * (1 - r.lossFraction) ** k;
    }
    return 0;
  };
  const lo = at(Math.floor(pos)), hi = at(Math.ceil(pos));
  return lo + (hi - lo) * (pos - Math.floor(pos));
}

/** Share of people whose insured wealth beats their own uninsured outcome. */
export function shareBetterInsured(r: EResult, premium: number, w0 = 100) {
  const insured = insuredWealth(premium, r.rounds, w0);
  let n = 0;
  for (let k = 0; k < r.lossHist.length; k++) if (insured > w0 * (1 - r.lossFraction) ** k) n += (r.lossHist[k] ?? 0);
  return n / r.people;
}

export function shareAtOrBelow(r: EResult, threshold: number, w0 = 100) {
  let n = 0;
  for (let k = 0; k < r.lossHist.length; k++) if (w0 * (1 - r.lossFraction) ** k <= w0 * threshold) n += (r.lossHist[k] ?? 0);
  return n / r.people;
}

/** One household's uninsured path from its loss rounds. */
export function householdPath(lossRounds: number[], rounds: number, lossFraction: number, w0 = 100) {
  const set = new Set(lossRounds);
  const p = [w0];
  for (let t = 1; t <= rounds; t++) p.push((p[t - 1] ?? 0) * (set.has(t) ? 1 - lossFraction : 1));
  return p;
}

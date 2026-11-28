/* Experiment D: fractional exposure, rebalanced each round (browser port of the uploaded script). */
import { middleCounts, quantileSorted, rng } from "./stats";

export const D_DEFAULTS = {
  initialWealth: 100,
  people: 10_000,
  rounds: 500,
  fractions: [0, 0.1, 0.25, 0.5, 1] as number[],
  seed: 42,
  threshold: 0.1,
};

export const up = (f: number) => Math.log1p(0.5 * f);
export const down = (f: number) => Math.log1p(-0.4 * f);
/** Exact long-run log growth per round: ½ln(1+0.5f) + ½ln(1−0.4f). */
export const growthRate = (f: number) => (up(f) + down(f)) / 2;
/** Expected wealth multiplier per round, 1 + 0.05f. */
export const expectedTerminal = (f: number, rounds: number, w0 = 100) => w0 * (1 + 0.05 * f) ** rounds;
/** g'(f) = 0.25/(1+0.5f) − 0.2/(1−0.4f) vanishes at f = 0.25. */
export const growthDerivative = (f: number) => 0.25 / (1 + 0.5 * f) - 0.2 / (1 - 0.4 * f);
export const OPTIMAL_FRACTION = 0.25;
/** Wealth after h heads in t rounds at exposure f. */
export const wealthAt = (f: number, h: number, t: number, w0 = 100) => w0 * Math.exp(h * up(f) + (t - h) * down(f));

export type PolicyRow = {
  fraction: number;
  median: number;
  mean: number;
  expected: number;
  q10: number;
  q90: number;
  meanLogGrowth: number;
  exactLogGrowth: number;
  finishBelowStart: number;
  everBelowThreshold: number;
  medianDrawdown: number;
};

export type DResult = {
  seed: number;
  people: number;
  rounds: number;
  fractions: number[];
  rows: PolicyRow[];
  /** Two middle heads counts per round, so the median path is exact for any exposure. */
  medLo: Int32Array;
  medHi: Int32Array;
  /** Final heads count of every person (enough to get terminal wealth for any exposure). */
  finalHeads: Int32Array;
  /** Heads (1) / tails (0) of the first three people, for "follow one player". */
  sampleTosses: Uint8Array[];
};

export function simulateD({
  seed = D_DEFAULTS.seed,
  people = D_DEFAULTS.people,
  rounds = D_DEFAULTS.rounds,
  fractions = D_DEFAULTS.fractions,
  threshold = D_DEFAULTS.threshold,
  initialWealth = D_DEFAULTS.initialWealth,
} = {}): DResult {
  const random = rng(seed);
  const nf = fractions.length;
  const ups = fractions.map(up);
  const downs = fractions.map(down);
  const logT = Math.log(threshold);
  const logW = new Float64Array(people * nf);
  const peak = new Float64Array(people * nf);
  const maxDD = new Float64Array(people * nf); // deepest log fall from the peak (≤ 0)
  const crossed = new Uint8Array(people * nf);
  const heads = new Int32Array(people);
  const medLo = new Int32Array(rounds + 1);
  const medHi = new Int32Array(rounds + 1);
  const hist = new Int32Array(rounds + 1);
  const keep = Math.min(3, people);
  const sampleTosses = Array.from({ length: keep }, () => new Uint8Array(rounds));

  for (let t = 1; t <= rounds; t++) {
    hist.fill(0);
    for (let p = 0; p < people; p++) {
      const h = random() < 0.5;
      if (h) heads[p] = (heads[p] ?? 0) + 1;
      if (p < keep) { const sample = sampleTosses[p]; if (sample) sample[t - 1] = h ? 1 : 0; }
      const count = heads[p] ?? 0; hist[count] = (hist[count] ?? 0) + 1;
      const base = p * nf;
      for (let j = 0; j < nf; j++) {
        const k = base + j;
        const v = (logW[k] = (logW[k] ?? 0) + (h ? (ups[j] ?? 0) : (downs[j] ?? 0)));
        if (v <= logT) crossed[k] = 1;
        if (v > (peak[k] ?? 0)) peak[k] = v;
        else if (v - (peak[k] ?? 0) < (maxDD[k] ?? 0)) maxDD[k] = v - (peak[k] ?? 0);
      }
    }
    const [lo, hi] = middleCounts(hist, people);
    medLo[t] = lo;
    medHi[t] = hi;
  }

  const rows: PolicyRow[] = fractions.map((f, j) => {
    const terminal = new Float64Array(people);
    const dd = new Float64Array(people);
    let logSum = 0, below = 0, cross = 0, sum = 0;
    for (let p = 0; p < people; p++) {
      const v = (logW[p * nf + j] ?? 0);
      terminal[p] = initialWealth * Math.exp(v);
      sum += (terminal[p] ?? 0);
      dd[p] = -Math.expm1((maxDD[p * nf + j] ?? 0));
      logSum += v;
      if (v < -1e-12) below++;
      cross += (crossed[p * nf + j] ?? 0);
    }
    terminal.sort();
    dd.sort();
    return {
      fraction: f,
      median: quantileSorted(terminal, 0.5),
      mean: sum / people,
      expected: expectedTerminal(f, rounds, initialWealth),
      q10: quantileSorted(terminal, 0.1),
      q90: quantileSorted(terminal, 0.9),
      meanLogGrowth: logSum / people / rounds,
      exactLogGrowth: growthRate(f),
      finishBelowStart: below / people,
      everBelowThreshold: cross / people,
      medianDrawdown: quantileSorted(dd, 0.5),
    };
  });

  return { seed, people, rounds, fractions, rows, medLo, medHi, finalHeads: heads, sampleTosses };
}

/** Median wealth path for any exposure, exact because wealth rises with the heads count. */
export function medianPath(r: DResult, f: number, w0 = 100): number[] {
  return Array.from({ length: r.rounds + 1 }, (_, t) =>
    t === 0 ? w0 : (wealthAt(f, (r.medLo[t] ?? 0), t, w0) + wealthAt(f, (r.medHi[t] ?? 0), t, w0)) / 2,
  );
}

/** One person's wealth path at exposure f from their recorded tosses. */
export function playerPath(tosses: Uint8Array, f: number, w0 = 100): number[] {
  const p = [w0];
  const u = 1 + 0.5 * f, d = 1 - 0.4 * f;
  for (const h of tosses) p.push((p[p.length - 1] ?? 0) * (h ? u : d));
  return p;
}

/** Terminal median and share finishing below start for any exposure. */
export function terminalFor(r: DResult, f: number, w0 = 100) {
  const s = Float64Array.from(r.finalHeads, (h) => wealthAt(f, h, r.rounds, w0)).sort();
  let below = 0;
  for (const v of s) if (Math.log(v / w0) < -1e-12) below++;
  return { median: quantileSorted(s, 0.5), finishBelowStart: below / s.length };
}

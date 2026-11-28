/**
 * Deterministic maths behind the results explainer. Everything the student sees
 * as a number comes from here; the model only puts these figures into words.
 */

export const MAX_ROUNDS = 500;
export const STARTING_BALANCE = 100;
export const HEADS_MULTIPLIER = 1.5;
export const TAILS_MULTIPLIER = 0.6;
/** Long-run compound growth of the site's game: 0.5 ln(1.5) + 0.5 ln(0.6). */
export const TYPICAL_GROWTH_PER_ROUND = 0.5 * Math.log(1.5) + 0.5 * Math.log(0.6);

export type StudentResult = { rounds: number; heads: number };

export type ResultAnalysis = {
  rounds: number;
  heads: number;
  tails: number;
  observedHeadsShare: number;
  expectedHeadsShare: number;
  expectedHeads: number;
  headsStdDev: number;
  usualRangeLow: number;
  usualRangeHigh: number;
  zScore: number;
  twoSidedProbability: number;
  unusual: boolean;
  finalWealth: number;
  expectedWealth: number;
  realisedGrowthPerRound: number;
  typicalGrowthPerRound: number;
  finishedBelowStart: boolean;
};

export function validateResult(
  input: unknown,
): { ok: true; value: StudentResult } | { ok: false; error: string } {
  if (typeof input !== "object" || input === null) {
    return { ok: false, error: "Enter how many rounds you played and how many were heads." };
  }
  const raw = input as Record<string, unknown>;
  const rounds = Number(raw["rounds"]);
  const heads = Number(raw["heads"]);

  if (!Number.isInteger(rounds) || rounds < 1) {
    return { ok: false, error: "Rounds must be a whole number of 1 or more." };
  }
  if (rounds > MAX_ROUNDS) {
    return { ok: false, error: `Please keep rounds to ${MAX_ROUNDS} or fewer.` };
  }
  if (!Number.isInteger(heads) || heads < 0) {
    return { ok: false, error: "Heads must be a whole number of 0 or more." };
  }
  if (heads > rounds) {
    return { ok: false, error: "Heads cannot be more than the rounds you played." };
  }
  return { ok: true, value: { rounds, heads } };
}

/** P(X <= k) for X ~ Binomial(n, 1/2), built upward from P(X = 0). */
function lowerTail(n: number, k: number): number {
  let pmf = 2 ** -n;
  let sum = pmf;
  for (let i = 0; i < k; i += 1) {
    pmf *= (n - i) / (i + 1);
    sum += pmf;
  }
  return sum;
}

/** Two-sided chance of a fair coin drifting at least this far from half heads. */
export function twoSidedProbability(n: number, heads: number): number {
  const nearer = Math.min(heads, n - heads);
  return Math.min(1, 2 * lowerTail(n, nearer));
}

export function analyseResult({ rounds, heads }: StudentResult): ResultAnalysis {
  const tails = rounds - heads;
  const expectedHeads = rounds / 2;
  const headsStdDev = Math.sqrt(rounds) / 2;
  const finalWealth =
    STARTING_BALANCE * HEADS_MULTIPLIER ** heads * TAILS_MULTIPLIER ** tails;

  return {
    rounds,
    heads,
    tails,
    observedHeadsShare: heads / rounds,
    expectedHeadsShare: 0.5,
    expectedHeads,
    headsStdDev,
    usualRangeLow: Math.max(0, Math.floor(expectedHeads - headsStdDev)),
    usualRangeHigh: Math.ceil(expectedHeads + headsStdDev),
    zScore: headsStdDev === 0 ? 0 : (heads - expectedHeads) / headsStdDev,
    twoSidedProbability: twoSidedProbability(rounds, heads),
    unusual: twoSidedProbability(rounds, heads) < 0.05,
    finalWealth,
    expectedWealth: STARTING_BALANCE * 1.05 ** rounds,
    realisedGrowthPerRound: Math.log(finalWealth / STARTING_BALANCE) / rounds,
    typicalGrowthPerRound: TYPICAL_GROWTH_PER_ROUND,
    finishedBelowStart: finalWealth < STARTING_BALANCE,
  };
}

export function describeAnalysis(a: ResultAnalysis): string {
  const pct = (v: number) => `${(v * 100).toFixed(1)}%`;
  const money = (v: number) =>
    v > 0 && v < 0.01 ? `$${v.toPrecision(3)}` : `$${v.toFixed(2)}`;
  return [
    `Rounds: ${a.rounds}. Heads: ${a.heads}. Tails: ${a.tails}.`,
    `Observed share of heads: ${pct(a.observedHeadsShare)}. Expected for a fair coin: 50%.`,
    `A fair coin lands between ${a.usualRangeLow} and ${a.usualRangeHigh} heads about two thirds of the time (one standard deviation is ${a.headsStdDev.toFixed(2)} heads).`,
    `Distance from expectation: ${a.zScore.toFixed(2)} standard deviations. Chance a fair coin drifts at least this far either way: ${a.twoSidedProbability.toFixed(4)}.`,
    a.unusual
      ? "This is unusual for a fair coin: it sits outside what a fair coin produces about 95 times in 100."
      : "This is not unusual for a fair coin: it sits inside the spread a fair coin produces.",
    `Final balance under the site's rules (x1.5 heads, x0.6 tails): ${money(a.finalWealth)} from a $100 start.`,
    `Expected wealth after ${a.rounds} rounds: ${money(a.expectedWealth)}.`,
    `Realised growth: ${(a.realisedGrowthPerRound * 100).toFixed(2)}% per round. The game's long-run typical rate is ${(a.typicalGrowthPerRound * 100).toFixed(2)}% per round.`,
  ]
    .filter(Boolean)
    .join("\n");
}

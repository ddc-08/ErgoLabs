/* Shared numeric helpers for Experiments D–G. Seeded draws reuse Experiment A's Mulberry32. */
export { rng } from "@/lib/ergo-sim";

/** Sort a copy ascending. */
export function sorted(values: ArrayLike<number>): Float64Array {
  return Float64Array.from(values).sort();
}

/** NumPy-style quantile with linear interpolation on already-sorted data. */
export function quantileSorted(s: ArrayLike<number>, q: number): number {
  const n = s.length;
  if (n === 0) return NaN;
  const pos = (n - 1) * q;
  const lo = Math.floor(pos);
  const hi = Math.ceil(pos);
  const a = (s[lo] ?? 0);
  const b = (s[hi] ?? 0);
  return a + (b - a) * (pos - lo);
}

export function quantile(values: ArrayLike<number>, q: number): number {
  return quantileSorted(sorted(values), q);
}

export function median(values: ArrayLike<number>): number {
  return quantile(values, 0.5);
}

export function mean(values: ArrayLike<number>): number {
  let s = 0;
  for (let i = 0; i < values.length; i++) s += (values[i] ?? 0);
  return s / values.length;
}

/**
 * Indices (0-based) of the two middle elements of a sample of integer counts
 * in 0..max, found from a histogram. Returns the two middle count values.
 */
export function middleCounts(hist: Int32Array | number[], n: number): [number, number] {
  const loRank = Math.floor((n - 1) / 2);
  const hiRank = Math.floor(n / 2);
  let seen = 0;
  let lo = -1;
  let hi = -1;
  for (let v = 0; v < hist.length; v++) {
    seen += (hist[v] ?? 0);
    if (lo < 0 && seen > loRank) lo = v;
    if (seen > hiRank) {
      hi = v;
      break;
    }
  }
  return [lo, hi];
}

/** Geometric grid between a and b (inclusive), like numpy.geomspace. */
export function geomspace(a: number, b: number, n: number): number[] {
  const la = Math.log(a);
  const lb = Math.log(b);
  return Array.from({ length: n }, (_, i) => Math.exp(la + ((lb - la) * i) / (n - 1)));
}

export function linspace(a: number, b: number, n: number): number[] {
  return Array.from({ length: n }, (_, i) => a + ((b - a) * i) / (n - 1));
}

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });

export function money(v: number): string {
  if (!Number.isFinite(v)) return "—";
  if (v > 0 && v < 0.01) return "$" + v.toPrecision(3);
  if (v >= 1e9) return "$" + v.toExponential(2);
  return usd.format(v);
}

export function compactMoney(v: number): string {
  if (v >= 1e9) return "$" + v.toExponential(0).replace("+", "");
  if (v >= 1e6) return "$" + (v / 1e6).toFixed(v >= 1e7 ? 0 : 1) + "m";
  if (v >= 1000) return "$" + (v / 1000).toFixed(v >= 1e4 ? 0 : 1) + "k";
  if (v > 0 && v < 0.01) return "$" + v.toExponential(0);
  if (v < 1 && v > 0) return "$" + v.toFixed(2);
  return "$" + Math.round(v * 100) / 100;
}

export function pct(v: number, digits = 2): string {
  if (!Number.isFinite(v)) return "—";
  return new Intl.NumberFormat("en-US", { style: "percent", maximumFractionDigits: digits }).format(v);
}

export function fixed(v: number, digits = 6): string {
  return Number.isFinite(v) ? v.toFixed(digits) : "—";
}

/** Run a synchronous computation after paint so the page stays responsive. */
export function nextFrame(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

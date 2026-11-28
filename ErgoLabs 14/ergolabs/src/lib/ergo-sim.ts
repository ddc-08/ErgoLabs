/* Original Mulberry32 and path-major draw order retained for seed compatibility. */
export function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function generate(seed: number, n = 1000, t = 100): number[][] {
  if (!Number.isInteger(seed) || seed < 0 || seed > 4294967295) throw Error("Invalid seed");
  const random = rng(seed);
  return Array.from({ length: n }, () => {
    const p = [100];
    for (let i = 1; i <= t; i++) p.push(p[i - 1]! * (random() < 0.5 ? 1.5 : 0.6));
    return p;
  });
}

export function summarize(paths: number[][], n = paths.length, t = paths[0]!.length - 1) {
  const means: number[] = [];
  const medians: number[] = [];
  for (let r = 0; r <= t; r++) {
    const a = paths.slice(0, n).map((p) => p[r]!).sort((x, y) => x - y);
    means.push(a.reduce((s, v) => s + v, 0) / n);
    medians.push(n % 2 ? a[(n - 1) / 2]! : (a[n / 2 - 1]! + a[n / 2]!) / 2);
  }
  return { means, medians, loss: paths.slice(0, n).filter((p) => p[t]! < 100).length / n };
}

export function sequence(order: number[], stop: boolean) {
  let exited = false;
  const p = [100];
  for (const f of order) {
    let v = p.at(-1)!;
    if (!exited) v *= f;
    if (stop && v < 10) exited = true;
    p.push(v);
  }
  return p;
}

export function lossProbability(t: number) {
  let term = 2 ** -t;
  let p = 0;
  for (let h = 0; h <= t; h++) {
    if (100 * 1.5 ** h * 0.6 ** (t - h) < 100) p += term;
    term *= (t - h) / (h + 1);
  }
  return p;
}

export const g = 0.5 * Math.log(1.5) + 0.5 * Math.log(0.6);
export const expected = (t: number) => 100 * 1.05 ** t;

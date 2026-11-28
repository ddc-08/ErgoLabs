import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState, type ReactNode } from "react";

export type ChartLine = {
  xs?: number[];
  ys: number[];
  color: string;
  width?: number;
  dash?: boolean;
  opacity?: number;
};
export type ChartPoint = { x: number; y: number; color: string; r?: number; shape?: "circle" | "square" };
export type RefLine = { value: number; color?: string; dash?: boolean };
export type Band = { from: number; to: number; color: string };

type ChartProps = {
  id: string;
  labelledBy: string;
  describedBy?: string;
  lines?: ChartLine[];
  points?: ChartPoint[];
  hlines?: RefLine[];
  vlines?: RefLine[];
  bands?: Band[];
  xLog?: boolean;
  yLog?: boolean;
  xDomain?: [number, number];
  yDomain?: [number, number];
  xLabel: string;
  xFormat?: (v: number) => string;
  yFormat?: (v: number) => string;
  height?: number;
};

function useWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(760);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setWidth(Math.max(280, Math.round(el.clientWidth)));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, width] as const;
}

const defaultFormat = (v: number) => {
  const a = Math.abs(v);
  if (a >= 1e6) return v.toExponential(0).replace("+", "");
  if (a >= 1000) return Math.round(v).toLocaleString("en-US");
  if (a >= 10 || v === 0) return String(Math.round(v * 10) / 10);
  if (a >= 0.01) return String(Math.round(v * 1000) / 1000);
  return v.toExponential(0);
};

function niceTicks(min: number, max: number, count = 5) {
  const span = max - min || 1;
  const step0 = span / count;
  const mag = 10 ** Math.floor(Math.log10(step0));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => span / s <= count) ?? mag * 10;
  const ticks: number[] = [];
  for (let v = Math.ceil(min / step) * step; v <= max + step * 1e-9; v += step) ticks.push(Math.abs(v) < step * 1e-9 ? 0 : v);
  return ticks;
}

/** Lightweight SVG chart in the style of Experiment A. Supports log or linear axes. */
export function Chart({
  id,
  labelledBy,
  describedBy,
  lines = [],
  points = [],
  hlines = [],
  vlines = [],
  bands = [],
  xLog = false,
  yLog = false,
  xDomain,
  yDomain,
  xLabel,
  xFormat = defaultFormat,
  yFormat = defaultFormat,
  height = 320,
}: ChartProps) {
  const [ref, W] = useWidth<HTMLDivElement>();
  const H = height;
  const L = W < 500 ? 58 : 74;
  const R = 16;
  const top = 18;
  const bottom = 46;

  const xsOf = (l: ChartLine) => l.xs ?? l.ys.map((_, i) => i);
  let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
  const take = (x: number, y: number) => {
    if (Number.isFinite(x) && (!xLog || x > 0)) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); }
    if (Number.isFinite(y) && (!yLog || y > 0)) { y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
  };
  for (const l of lines) { const xs = xsOf(l); l.ys.forEach((y, i) => take((xs[i] ?? i), y)); }
  for (const p of points) take(p.x, p.y);
  for (const h of hlines) take(NaN, h.value);
  if (xDomain) [x0, x1] = xDomain;
  if (yDomain) [y0, y1] = yDomain;
  if (!Number.isFinite(x0)) { x0 = 0; x1 = 1; }
  if (!Number.isFinite(y0)) { y0 = 0; y1 = 1; }

  let yMin: number, yMax: number;
  if (yLog) {
    yMin = Math.floor(Math.log10(y0));
    yMax = Math.ceil(Math.log10(y1));
    if (yMax <= yMin) yMax = yMin + 1;
  } else {
    const pad = (y1 - y0) * 0.06 || Math.abs(y1) * 0.1 || 1;
    yMin = yDomain ? y0 : y0 - (y0 === 0 ? 0 : pad);
    yMax = yDomain ? y1 : y1 + pad;
  }
  const xa = xLog ? Math.log10(x0) : x0;
  const xb = xLog ? Math.log10(x1) : x1;
  const sx = (x: number) => L + (((xLog ? Math.log10(x) : x) - xa) / (xb - xa || 1)) * (W - L - R);
  const sy = (y: number) => top + ((yMax - (yLog ? Math.log10(y) : y)) / (yMax - yMin)) * (H - top - bottom);

  const yTicks = yLog
    ? (() => { const step = Math.max(1, Math.ceil((yMax - yMin) / 6)); const t: number[] = []; for (let e = yMin; e <= yMax; e += step) t.push(10 ** e); return t; })()
    : niceTicks(yMin, yMax);
  const xTicks = xLog
    ? (() => { const t: number[] = []; for (let e = Math.ceil(xa); e <= Math.floor(xb); e++) t.push(10 ** e); return t.length ? t : [x0, x1]; })()
    : niceTicks(x0, x1, W < 500 ? 4 : 6);

  const path = (l: ChartLine) => {
    const xs = xsOf(l);
    let d = "";
    let pen = false;
    l.ys.forEach((y, i) => {
      const x = (xs[i] ?? i);
      const ok = Number.isFinite(y) && Number.isFinite(x) && (!yLog || y > 0) && (!xLog || x > 0);
      if (!ok) { pen = false; return; }
      d += (pen ? "L" : "M") + sx(x).toFixed(2) + " " + sy(y).toFixed(2) + " ";
      pen = true;
    });
    return d;
  };
  const clampY = (y: number) => Math.min(H - bottom, Math.max(top, y));

  return (
    <div ref={ref} className="chart-frame">
      <svg
        id={id}
        className="chart"
        role="img"
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        viewBox={`0 0 ${W} ${H}`}
        width={W}
        height={H}
      >
        {bands.map((b, i) => (
          <rect key={i} x={sx(b.from)} width={Math.max(0, sx(b.to) - sx(b.from))} y={top} height={H - top - bottom} style={{ fill: b.color }} opacity={0.14} />
        ))}
        {yTicks.map((v) => (
          <g key={"y" + v}>
            <line x1={L} x2={W - R} y1={sy(v)} y2={sy(v)} style={{ stroke: "var(--line)" }} />
            <text x={L - 9} y={sy(v) + 4} textAnchor="end">{yFormat(v)}</text>
          </g>
        ))}
        {xTicks.map((v) => (
          <text key={"x" + v} x={sx(v)} y={H - 25} textAnchor="middle">{xFormat(v)}</text>
        ))}
        {hlines.map((h, i) => (
          <line key={"h" + i} x1={L} x2={W - R} y1={clampY(sy(h.value))} y2={clampY(sy(h.value))} style={{ stroke: h.color ?? "var(--muted)" }} strokeDasharray={h.dash === false ? undefined : "3 5"} strokeWidth={1.4} />
        ))}
        {vlines.map((v, i) => (
          <line key={"v" + i} x1={sx(v.value)} x2={sx(v.value)} y1={top} y2={H - bottom} style={{ stroke: v.color ?? "var(--ink)" }} strokeDasharray={v.dash === false ? undefined : "3 4"} strokeWidth={1.4} />
        ))}
        {lines.map((l, i) => (
          <path key={"l" + i} d={path(l)} fill="none" style={{ stroke: l.color }} strokeWidth={l.width ?? 2.5} strokeDasharray={l.dash ? "7 5" : undefined} strokeLinejoin="round" opacity={l.opacity ?? 1} />
        ))}
        {points.map((p, i) =>
          p.shape === "square" ? (
            <rect key={"p" + i} x={sx(p.x) - (p.r ?? 4)} y={clampY(sy(p.y)) - (p.r ?? 4)} width={(p.r ?? 4) * 2} height={(p.r ?? 4) * 2} style={{ fill: p.color, stroke: "var(--card)" }} />
          ) : (
            <circle key={"p" + i} cx={sx(p.x)} cy={clampY(sy(p.y))} r={p.r ?? 4.5} style={{ fill: p.color, stroke: "var(--card)" }} strokeWidth={1.5} />
          ),
        )}
        <text x={(L + W - R) / 2} y={H - 5} textAnchor="middle">{xLabel}{yLog ? " · log vertical axis" : ""}</text>
      </svg>
    </div>
  );
}

export type BarSeries = { label: string; values: number[]; color: string };

/** Grouped bar chart; values share one linear axis. */
export function BarChart({
  id,
  labelledBy,
  describedBy,
  categories,
  series,
  yMax,
  yFormat = defaultFormat,
  xLabel,
  height = 300,
}: {
  id: string;
  labelledBy: string;
  describedBy?: string;
  categories: string[];
  series: BarSeries[];
  yMax?: number;
  yFormat?: (v: number) => string;
  xLabel: string;
  height?: number;
}) {
  const [ref, W] = useWidth<HTMLDivElement>();
  const H = height, L = W < 500 ? 50 : 64, R = 12, top = 16, bottom = 46;
  const max = yMax ?? Math.max(1e-9, ...series.flatMap((s) => s.values)) * 1.08;
  const sy = (v: number) => top + (1 - v / max) * (H - top - bottom);
  const slot = (W - L - R) / categories.length;
  const bw = Math.min(46, (slot * 0.72) / series.length);
  return (
    <div ref={ref} className="chart-frame">
      <svg id={id} className="chart" role="img" aria-labelledby={labelledBy} aria-describedby={describedBy} viewBox={`0 0 ${W} ${H}`} width={W} height={H}>
        {niceTicks(0, max, 4).map((v) => (
          <g key={v}>
            <line x1={L} x2={W - R} y1={sy(v)} y2={sy(v)} style={{ stroke: "var(--line)" }} />
            <text x={L - 8} y={sy(v) + 4} textAnchor="end">{yFormat(v)}</text>
          </g>
        ))}
        {categories.map((c, ci) => {
          const cx = L + slot * (ci + 0.5);
          return (
            <g key={c}>
              {series.map((s, si) => {
                const v = s.values[ci] ?? 0;
                const x = cx - (bw * series.length) / 2 + si * bw;
                return <rect key={s.label} x={x + 1} width={bw - 2} y={sy(v)} height={Math.max(0, sy(0) - sy(v))} style={{ fill: s.color }} rx={2} />;
              })}
              <text x={cx} y={H - 25} textAnchor="middle">{c}</text>
            </g>
          );
        })}
        <text x={(L + W - R) / 2} y={H - 5} textAnchor="middle">{xLabel}</text>
      </svg>
    </div>
  );
}

export function Legend({ items }: { items: { label: string; color: string; dash?: boolean }[] }) {
  return (
    <div className="legend">
      {items.map((it) => (
        <span key={it.label} className="key xkey">
          <i aria-hidden="true" style={{ borderColor: it.color, borderTopStyle: it.dash ? "dashed" : "solid" }} />
          {it.label}
        </span>
      ))}
    </div>
  );
}

export function ScaleToggle({ value, onChange, label }: { value: "log" | "linear"; onChange: (v: "log" | "linear") => void; label: string }) {
  return (
    <div className="chart-controls">
      <div className="scale-group" role="group" aria-label={label}>
        {(["log", "linear"] as const).map((s) => (
          <Button variant="outline" key={s} type="button" aria-pressed={value === s} onClick={() => onChange(s)}>
            {s === "log" ? "Log" : "Linear"}
          </Button>
        ))}
      </div>
    </div>
  );
}

/** Titled card around a chart, with an optional scale toggle and a takeaway sentence. */
export function ChartPanel({
  titleId,
  title,
  controls,
  takeaway,
  takeawayId,
  children,
}: {
  titleId: string;
  title: string;
  controls?: ReactNode;
  takeaway?: ReactNode;
  takeawayId?: string;
  children: ReactNode;
}) {
  return (
    <div className="panel">
      <div className="charthead">
        <h3 id={titleId}>{title}</h3>
        {controls}
      </div>
      {children}
      {takeaway ? (
        <p className="chart-takeaway" id={takeawayId}>
          {takeaway}
        </p>
      ) : null}
    </div>
  );
}

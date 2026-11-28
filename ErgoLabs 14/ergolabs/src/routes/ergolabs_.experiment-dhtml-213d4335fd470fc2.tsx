import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BarChart, Chart, ChartPanel, Legend, ScaleToggle } from "@/components/experiment/chart";
import { Choice, ExperimentPage, Quiz, SeedControl, useSimulation, type QuizQuestion } from "@/components/experiment/experiment-page";
import { D_DEFAULTS, OPTIMAL_FRACTION, expectedTerminal, growthRate, medianPath, playerPath, simulateD, terminalFor } from "@/lib/experiments/exp-d";
import { compactMoney, fixed, linspace, money, pct } from "@/lib/experiments/stats";

const TITLE = "D · Partial exposure · ErgoLabs";
const DESCRIPTION =
  "Choose how much of your wealth to put into the coin toss each round. Simulate 10,000 people over 500 rounds and find the share that maximises long-run growth.";

export const Route = createFileRoute("/ergolabs_/experiment-dhtml-213d4335fd470fc2")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  staticData: { importedDocument: { html: { lang: "en" }, body: { className: "page-experiment-d" } } },
  component: ExperimentD,
});

const COLORS = ["var(--grey)", "var(--blue)", "var(--green)", "var(--orange)", "var(--purple)"];
const YOURS = "var(--ink)";
const SHARES = D_DEFAULTS.fractions.map((f) => ({ value: String(f), label: pct(f, 0) }));
const { people: PEOPLE, rounds: ROUNDS } = D_DEFAULTS;

const QUESTIONS: QuizQuestion[] = [
  {
    question: "You keep 25% of your wealth in the toss and rebalance every round. What multiplies your wealth on heads?",
    options: ["1.5", "1.125", "1.25"],
    correct: 1,
    explanation: "Only the exposed quarter gains 50%: 1 + 0.5 × 0.25 = 1.125. On tails the multiplier is 1 − 0.4 × 0.25 = 0.9.",
  },
  {
    question: "Which exposure maximises the long-run compound (log) growth rate in this game?",
    options: ["100%, because the expected return per round is highest", "25%", "0%, because cash can never lose"],
    correct: 1,
    explanation: "g(f) = ½ln(1 + 0.5f) + ½ln(1 − 0.4f). Its derivative 0.25/(1 + 0.5f) − 0.2/(1 − 0.4f) is zero at f = 25%.",
  },
  {
    question: "Which exposure maximises expected (average) terminal wealth?",
    options: ["100%", "25%", "50%"],
    correct: 0,
    explanation: "Expected wealth grows by 1 + 0.05f per round, so it keeps rising all the way to f = 100%—even though the typical player at 100% ends with almost nothing.",
  },
  {
    question: "At 50% exposure, the long-run log growth rate is almost exactly zero. What does that mean for a player?",
    options: [
      "Their wealth stays at $100 every round.",
      "Their wealth wanders up and down with no long-run trend, and can still fall far below the start along the way.",
      "They are guaranteed to break even after 500 rounds.",
    ],
    correct: 1,
    explanation: "Zero log growth means no typical trend, not no risk: in the simulation most 50% players dip below $10 at some point and about half finish below $100.",
  },
  {
    question: "Why does keeping 75% in cash not act like an untouchable reserve here?",
    options: [
      "Because cash loses 40% on tails.",
      "Because the split is rebalanced every round, so after a loss part of the cash is moved back into the toss.",
      "Because the cash is invested in a second coin toss.",
    ],
    correct: 1,
    explanation: "Rebalancing restores the same fraction of current wealth each round. Cash earns nothing, but it is not held back permanently.",
  },
];

function ExperimentD() {
  const [seed, setSeed] = useState(D_DEFAULTS.seed);
  const [share, setShare] = useState(0.25);
  const [choice, setChoice] = useState<string | null>(null);
  const [predMedian, setPredMedian] = useState<string | null>(null);
  const [predMean, setPredMean] = useState<string | null>(null);
  const [player, setPlayer] = useState(0);
  const [scaleOne, setScaleOne] = useState<"log" | "linear">("log");
  const sim = useSimulation(String(seed), () => simulateD({ seed }));

  const running = <p className="sim-status" role="status">Simulating 10,000 people × 500 rounds in your browser…</p>;
  const best = sim ? sim.rows.reduce((a, b) => (b.median > a.median ? b : a)) : null;
  const yours = useMemo(() => (sim ? terminalFor(sim, share) : null), [sim, share]);

  const steps = [
    {
      label: "The game",
      next: "Make a prediction →",
      render: () => (
        <>
          <div className="eyebrow">Experiment D · Partial exposure</div>
          <h1 tabIndex={-1}>How much would you put on the coin?</h1>
          <p className="lead">Same coin as Experiment A. This time you choose a share of your wealth to expose; the rest sits in cash that earns nothing.</p>
          <div className="rules">
            <div className="rule"><strong>$100</strong><span>Starting wealth</span></div>
            <div className="rule"><strong>+50%</strong><span>Exposed share on heads</span></div>
            <div className="rule"><strong>−40%</strong><span>Exposed share on tails</span></div>
            <div className="rule"><strong>500</strong><span>Rounds, rebalanced each time</span></div>
          </div>
          <p>Every round you reset to the same share of your <em>current</em> wealth. With 25% exposed, heads multiplies your wealth by 1.125 and tails by 0.9.</p>
          <div className="prompt">
            <h2>Which share would you choose?</h2>
            <p>There is no single right answer. Pick the share that matches your instinct.</p>
            <Choice label="Your initial choice" options={SHARES} value={choice} onChange={setChoice} />
            <p className="small" aria-live="polite">{choice ? `You chose ${pct(Number(choice), 0)}. You can change your mind later.` : "Your choice stays in this page only."}</p>
          </div>
          <details>
            <summary>The model’s assumptions</summary>
            <p>Fair, independent tosses. Every exposure policy sees the same tosses for the same person, so differences come only from the share exposed. Cash earns zero; no fees, borrowing or leverage.</p>
          </details>
        </>
      ),
    },
    {
      label: "Predict",
      next: "Follow one player →",
      render: () => (
        <>
          <h2 tabIndex={-1}>Where will 10,000 people finish?</h2>
          <p className="lead">Imagine 10,000 people, each playing 500 rounds with their own tosses. Five groups use five different shares.</p>
          <div className="prompt">
            <p><strong>Which share gives the highest <em>median</em> (typical) wealth after 500 rounds?</strong></p>
            <Choice label="Median prediction" options={SHARES} value={predMedian} onChange={setPredMedian} />
            <p><strong>Which share gives the highest <em>expected</em> (probability-weighted average) wealth?</strong></p>
            <Choice label="Expected prediction" options={SHARES} value={predMean} onChange={setPredMean} />
            <p className="small" role="status">{predMedian && predMean ? "Predictions recorded." : "Choose both, or go straight to one player."}</p>
          </div>
        </>
      ),
    },
    {
      label: "One player",
      next: "Compare 10,000 people →",
      render: () => {
        if (!sim) return running;
        const tosses = sim.sampleTosses[player] ?? new Uint8Array();
        const mine = playerPath(tosses, share);
        const full = playerPath(tosses, 1);
        const heads = tosses.reduce((s, v) => s + v, 0);
        return (
          <>
            <h2 tabIndex={-1}>Same tosses, different exposure.</h2>
            <p>Player {player + 1} gets {heads} heads and {ROUNDS - heads} tails. Move the slider to change only how much of their wealth is exposed.</p>
            <div className="control-grid">
              <div>
                <label htmlFor="shareOne">Your exposure <output>{pct(share, 0)}</output></label>
                <input id="shareOne" type="range" min={0} max={100} step={1} value={Math.round(share * 100)} onChange={(e) => setShare(Number(e.target.value) / 100)} />
              </div>
              <div>
                <span className="small">Player</span>
                <Choice label="Choose player" options={[0, 1, 2].map((i) => ({ value: String(i), label: `Player ${i + 1}` }))} value={String(player)} onChange={(v) => setPlayer(Number(v))} />
              </div>
            </div>
            <ChartPanel titleId="dOneTitle" title={`Player ${player + 1} over 500 rounds`} controls={<ScaleToggle value={scaleOne} onChange={setScaleOne} label="Chart scale" />} takeawayId="dOneTake" takeaway="One history only. The same tosses can grow wealth at a moderate share and destroy it at full exposure.">
              <Chart id="dOneChart" labelledBy="dOneTitle" describedBy="dOneTake" yLog={scaleOne === "log"} xLabel="Round" yFormat={compactMoney}
                hlines={[{ value: 100 }]}
                lines={[{ ys: full, color: "var(--purple)", width: 1.6 }, { ys: mine, color: YOURS }]} />
              <Legend items={[{ label: `Your exposure (${pct(share, 0)})`, color: YOURS }, { label: "100% exposed", color: "var(--purple)" }, { label: "Start $100", color: "var(--muted)", dash: true }]} />
              <p className="readout" aria-live="polite">
                With {pct(share, 0)} exposed, player {player + 1} finishes with {money(mine.at(-1) ?? 0)}. Fully exposed, the same tosses leave {money(full.at(-1) ?? 0)}.
              </p>
            </ChartPanel>
          </>
        );
      },
    },
    {
      label: "Compare",
      next: "Why does 25% win? →",
      render: () => {
        if (!sim) return running;
        return (
          <>
            <h2 tabIndex={-1}>The typical outcome peaks at a moderate share.</h2>
            <p>Median wealth across all 10,000 people, round by round. The median at each round can belong to different people.</p>
            <ChartPanel titleId="dMedTitle" title="Median wealth over time" takeawayId="dMedTake" takeaway="25% grows fastest. 50% barely moves. 100% collapses, even though every policy faces identical tosses.">
              <Chart id="dMedChart" labelledBy="dMedTitle" describedBy="dMedTake" yLog xLabel="Round" yFormat={compactMoney} hlines={[{ value: 100 }]}
                lines={[...sim.fractions.map((f, j) => ({ ys: medianPath(sim, f), color: COLORS[j] ?? YOURS })), ...(sim.fractions.includes(share) ? [] : [{ ys: medianPath(sim, share), color: YOURS, dash: true, width: 2 }])]} />
              <Legend items={[...sim.fractions.map((f, j) => ({ label: `${pct(f, 0)} exposed`, color: COLORS[j] ?? YOURS })), ...(sim.fractions.includes(share) ? [] : [{ label: `Your ${pct(share, 0)}`, color: YOURS, dash: true }])]} />
            </ChartPanel>
            <div className="stats">
              <div className="stat"><span>Best median ({pct(best?.fraction ?? 0, 0)} exposed)</span><strong>{money(best?.median ?? 0)}</strong></div>
              <div className="stat"><span>Median at your {pct(share, 0)}</span><strong>{money(yours?.median ?? 0)}</strong></div>
              <div className="stat"><span>At your share: below $100 at the end</span><strong>{pct(yours?.finishBelowStart ?? 0)}</strong></div>
            </div>
            <div className="chart-pair">
              <ChartPanel titleId="dRiskTitle" title="Two measures of loss risk" takeawayId="dRiskTake" takeaway="Ever touching $10 is far more common than finishing below $100 once exposure is high.">
                <BarChart id="dRiskChart" labelledBy="dRiskTitle" describedBy="dRiskTake" categories={sim.fractions.map((f) => pct(f, 0))} yMax={1} yFormat={(v) => pct(v, 0)} xLabel="Wealth exposed"
                  series={[{ label: "Finish below $100", values: sim.rows.map((r) => r.finishBelowStart), color: "var(--blue)" }, { label: "Ever at or below $10", values: sim.rows.map((r) => r.everBelowThreshold), color: "var(--orange)" }]} />
                <Legend items={[{ label: "Finish below $100", color: "var(--blue)" }, { label: "Ever at or below $10", color: "var(--orange)" }]} />
              </ChartPanel>
              <div className="panel">
                <h3>Policy table · seed {sim.seed}</h3>
                <div className="scrolltable" tabIndex={0} role="region" aria-label="Policy results">
                  <table className="data-table">
                    <thead><tr><th scope="col">Exposed</th><th scope="col">Median</th><th scope="col">10th–90th pct</th><th scope="col">Log growth (sim / exact)</th><th scope="col">Median max fall</th></tr></thead>
                    <tbody>
                      {sim.rows.map((r) => (
                        <tr key={r.fraction} data-highlight={r.fraction === OPTIMAL_FRACTION}>
                          <th scope="row">{pct(r.fraction, 0)}</th>
                          <td>{compactMoney(r.median)}</td>
                          <td>{compactMoney(r.q10)} – {compactMoney(r.q90)}</td>
                          <td>{fixed(r.meanLogGrowth, 4)} / {fixed(r.exactLogGrowth, 4)}</td>
                          <td>{pct(r.medianDrawdown, 0)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <SeedControl seed={seed} onSeed={setSeed} />
            <p className="small">Seed {sim.seed} · {PEOPLE.toLocaleString("en-US")} people · {ROUNDS} rounds · same tosses for every policy</p>
          </>
        );
      },
    },
    {
      label: "Explain",
      next: "Return to your prediction →",
      render: () => {
        const grid = linspace(0, 1, 201);
        return (
          <>
            <h2 tabIndex={-1}>Growth depends on what you keep, not just what you win.</h2>
            <p className="lead">Each round multiplies wealth by 1 + 0.5f on heads or 1 − 0.4f on tails. Over many rounds a typical player grows at the average of their log multipliers.</p>
            <ChartPanel titleId="dGrowthTitle" title="How much exposure maximises compound growth?" takeawayId="dGrowthTake" takeaway="The curve rises, peaks at 25%, crosses zero near 50% and is clearly negative at 100%.">
              <Chart id="dGrowthChart" labelledBy="dGrowthTitle" describedBy="dGrowthTake" xLabel="Wealth exposed (%)" xFormat={(v) => `${Math.round(v)}%`} yFormat={(v) => v.toFixed(3)}
                hlines={[{ value: 0, color: "var(--ink)", dash: false }]} vlines={[{ value: 25, color: "var(--muted)" }]}
                lines={[{ xs: grid.map((f) => f * 100), ys: grid.map(growthRate), color: "var(--green)" }]}
                points={[...(sim ? sim.rows.map((r) => ({ x: r.fraction * 100, y: r.meanLogGrowth, color: "var(--orange)" })) : []), { x: share * 100, y: growthRate(share), color: YOURS, shape: "square" as const }]} />
              <Legend items={[{ label: "Exact log growth g(f)", color: "var(--green)" }, { label: "Simulated mean (dots)", color: "var(--orange)" }, { label: `Your ${pct(share, 0)} (square)`, color: YOURS }, { label: "Optimum 25%", color: "var(--muted)", dash: true }]} />
            </ChartPanel>
            <div className="walk">
              <div className="step"><h3>Growth rate for a share f</h3><div className="math">g(f) = ½ ln(1 + 0.5f) + ½ ln(1 − 0.4f)</div></div>
              <div className="step"><h3>Set the slope to zero</h3><div className="math">g′(f) = 0.25 / (1 + 0.5f) − 0.2 / (1 − 0.4f) = 0<br />⇒ f* = 25%, g(f*) ≈ +0.006211 per round</div></div>
              <div className="step"><h3>Expected wealth tells a different story</h3><div className="math">E[W₅₀₀] = $100 × (1 + 0.05f)⁵⁰⁰<br />largest at f = 100%: ≈ {compactMoney(expectedTerminal(1, ROUNDS))}</div></div>
            </div>
            {sim ? (
              <ChartPanel titleId="dExpTitle" title="Expected wealth versus typical outcomes" takeawayId="dExpTake" takeaway="The expected value keeps rising with exposure; the median turns down after 25%. Rare fortunes drive the expectation.">
                <Chart id="dExpChart" labelledBy="dExpTitle" describedBy="dExpTake" yLog xLabel="Wealth exposed (%)" xFormat={(v) => `${Math.round(v)}%`} yFormat={compactMoney}
                  lines={[{ xs: sim.rows.map((r) => r.fraction * 100), ys: sim.rows.map((r) => r.expected), color: "var(--ink)", dash: true }, { xs: sim.rows.map((r) => r.fraction * 100), ys: sim.rows.map((r) => r.median), color: "var(--orange)" }]}
                  points={sim.rows.flatMap((r) => [{ x: r.fraction * 100, y: r.expected, color: "var(--ink)" }, { x: r.fraction * 100, y: r.median, color: "var(--orange)" }])} />
                <Legend items={[{ label: "Theoretical expected wealth", color: "var(--ink)", dash: true }, { label: "Simulated median wealth", color: "var(--orange)" }]} />
              </ChartPanel>
            ) : null}
            <p className="callout">
              {predMedian ? `You predicted ${pct(Number(predMedian), 0)} would give the best median. ` : "You did not record a median prediction. "}
              {predMedian ? (Number(predMedian) === OPTIMAL_FRACTION ? "That matches the model." : "The model’s answer is 25%.") : ""}{" "}
              {predMean ? `For expected wealth you chose ${pct(Number(predMean), 0)}; the model’s answer is 100%.` : ""}
            </p>
          </>
        );
      },
    },
    {
      label: "Results",
      render: () => (
        <>
          <h2 tabIndex={-1}>Maximising the average is not maximising growth.</h2>
          <p className="callout">
            {choice ? `You first chose to expose ${pct(Number(choice), 0)}. ` : "You did not record an initial choice. "}
            Under the model, {pct(OPTIMAL_FRACTION, 0)} gives the fastest typical growth; your current slider ({pct(share, 0)}) grows at {fixed(growthRate(share), 4)} per round.
          </p>
          <div className="results-grid">
            <div><span>Growth-maximising share</span><strong>25%</strong><p>g ≈ +0.6211% log growth per round.</p></div>
            <div><span>Median after 500 rounds at 25%</span><strong>{sim ? money(sim.rows[2]?.median ?? 0) : "…"}</strong><p>This run (seed {seed}).</p></div>
            <div><span>Expected-wealth winner</span><strong>100%</strong><p>Yet {sim ? pct(sim.rows[4]?.finishBelowStart ?? 0) : "…"} of fully exposed players finished below $100.</p></div>
          </div>
          <p>Zero log growth around 50% exposure does not mean safety: the path still swings widely. And a growth-optimal share depends on these exact odds—it is not a general recommendation.</p>
          <Quiz letter="D" questions={QUESTIONS} />
          <p className="port-note">This page runs the model from the Experiment D script in your browser with the same settings (10,000 people, 500 rounds, seed 42). It uses a different random-number generator from NumPy, so individual figures differ slightly from the Python output; exact formulas are identical.</p>
          <div className="stage-nav next-experiment">
            <a className="button primary" href="/ergolabs/experiment-ehtml-10836aea884cd575">Next: Experiment E · Insurance →</a>
            <a href="/#experiments">All experiments</a>
          </div>
        </>
      ),
    },
  ];

  return <ExperimentPage letter="D" steps={steps} run={{ seed, players: PEOPLE, rounds: ROUNDS }} />;
}

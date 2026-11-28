import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { MessageResponse } from "@/components/ai-elements/message";
import { explainResults, type ExplainOutcome } from "@/lib/ergo-results.functions";

export const Route = createFileRoute("/results-explainer")({
  head: () => ({
    meta: [
      { title: "Check your own coin-toss results · ErgoLabs" },
      {
        name: "description",
        content:
          "Enter the heads and tails you actually got, and see how your run compares with what a fair coin predicts.",
      },
      { property: "og:title", content: "Check your own coin-toss results · ErgoLabs" },
      {
        property: "og:description",
        content:
          "Enter the heads and tails you actually got, and see how your run compares with what a fair coin predicts.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResultsExplainer,
});

const money = (v: number) =>
  v > 0 && v < 0.01 ? `$${v.toPrecision(3)}` : `$${v.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
const pct = (v: number) => `${(v * 100).toFixed(1)}%`;

function Stat({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="border-t border-dashed border-ergo-line py-3">
      <p className="font-mono text-[10px] tracking-[0.12em] text-ergo-green uppercase">{label}</p>
      <p className="mt-1 text-[19px] tracking-tight text-ergo-ink">{value}</p>
      {note ? <p className="mt-1 text-[12px] leading-snug text-ergo-muted">{note}</p> : null}
    </div>
  );
}

function ResultsExplainer() {
  const explain = useServerFn(explainResults);
  const [rounds, setRounds] = useState("20");
  const [heads, setHeads] = useState("11");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [outcome, setOutcome] = useState<ExplainOutcome | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const result = await explain({
        data: { rounds: Number(rounds), heads: Number(heads) },
      });
      setOutcome(result);
      if (!result.ok) setError(result.error);
    } catch {
      setError("The explainer couldn't reach the answer service. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  const analysis = outcome?.ok ? outcome.analysis : null;

  return (
    <div className="min-h-screen bg-ergo-bg text-ergo-ink">
      <div className="mx-auto max-w-[860px] px-6 py-10">
        <header className="flex flex-wrap items-baseline justify-between gap-3 border-b border-ergo-line pb-4">
          <div>
            <span className="block text-[20px] font-extrabold tracking-[-1.3px]">ErgoLabs</span>
            <span className="text-[11px] tracking-wider text-ergo-muted">
              Chance, growth &amp; decisions
            </span>
          </div>
          <nav className="flex flex-wrap items-center gap-4 text-[12px] font-medium">
            <Link className="underline underline-offset-3" to="/">
              Home
            </Link>
            <Link
              className="underline underline-offset-3"
              to="/ergolabs/experiment-ahtml-50fe086c96acb043"
            >
              Experiment A
            </Link>
            <Link
              className="underline underline-offset-3"
              to="/ergolabs/bibliographyhtml-3408dc6a695866e9"
            >
              Bibliography
            </Link>
          </nav>
        </header>

        <main className="pt-8">
          <p className="font-mono text-[11px] tracking-[0.14em] text-ergo-green uppercase">
            For students · Experiment A
          </p>
          <h1 className="mt-3 max-w-[22ch] text-balance text-[34px] leading-[1.12] font-extrabold tracking-[-0.05em]">
            Check your own coin-toss results
          </h1>
          <p className="mt-4 max-w-[70ch] text-[15px] text-ergo-muted">
            Played the game by hand in class? Enter how many rounds you tossed and how many came up
            heads. The page works out the numbers exactly, then explains how your run compares with
            what a fair coin predicts. Nothing you enter is saved or sent anywhere except to the
            explainer.
          </p>

          <form
            noValidate
            onSubmit={(event) => void onSubmit(event)}
            className="mt-8 rounded-xl border border-ergo-line bg-ergo-card p-5"
          >
            <div className="flex flex-wrap gap-5">
              <label className="block">
                <span className="font-mono text-[10px] tracking-[0.12em] text-ergo-muted uppercase">
                  Rounds you tossed
                </span>
                <input
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={500}
                  step={1}
                  value={rounds}
                  onChange={(e) => setRounds(e.target.value)}
                  className="mt-1 block w-[150px] rounded-md border border-ergo-line bg-white px-3 py-2 text-[15px] text-ergo-ink outline-none focus:border-ergo-green"
                />
              </label>
              <label className="block">
                <span className="font-mono text-[10px] tracking-[0.12em] text-ergo-muted uppercase">
                  Heads you got
                </span>
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  step={1}
                  value={heads}
                  onChange={(e) => setHeads(e.target.value)}
                  className="mt-1 block w-[150px] rounded-md border border-ergo-line bg-white px-3 py-2 text-[15px] text-ergo-ink outline-none focus:border-ergo-green"
                />
              </label>
            </div>
            <p className="mt-3 text-[12px] text-ergo-muted">
              Uses the site's rules: $100 start, heads ×1.5, tails ×0.6, fair and independent rounds.
            </p>
            <button
              type="submit"
              disabled={busy}
              className="mt-4 inline-flex items-center rounded-md bg-ergo-green px-4 py-2 text-[13px] font-semibold text-white transition-opacity disabled:opacity-60"
            >
              {busy ? "Working it out…" : "Explain my results"}
            </button>
            {error ? (
              <p className="mt-3 text-[13px] text-ergo-orange">{error}</p>
            ) : null}
          </form>

          {analysis ? (
            <section className="mt-10">
              <h2 className="text-[13px] font-mono tracking-[0.12em] text-ergo-muted uppercase">
                Your run, measured
              </h2>
              <div className="mt-3 grid gap-x-8 sm:grid-cols-2">
                <Stat
                  label="Heads you got"
                  value={`${analysis.heads} of ${analysis.rounds}`}
                  note={`${pct(analysis.observedHeadsShare)} heads. A fair coin gives 50%.`}
                />
                <Stat
                  label="Usual range for a fair coin"
                  value={`${analysis.usualRangeLow}–${analysis.usualRangeHigh} heads`}
                  note={`One standard deviation is ${analysis.headsStdDev.toFixed(2)} heads around ${analysis.expectedHeads}.`}
                />
                <Stat
                  label="How far from expectation"
                  value={`${analysis.zScore.toFixed(2)} std dev`}
                  note={`A fair coin drifts at least this far about ${(analysis.twoSidedProbability * 100).toFixed(1)}% of the time.`}
                />
                <Stat
                  label="Verdict"
                  value={analysis.unusual ? "Unusual for a fair coin" : "Within the usual spread"}
                  note="Unusual does not mean the coin is unfair — it happens to fair coins too."
                />
                <Stat
                  label="Your balance under the rules"
                  value={money(analysis.finalWealth)}
                  note={
                    analysis.finishedBelowStart
                      ? "Below your $100 start."
                      : "Above your $100 start."
                  }
                />
                <Stat
                  label="Expected wealth"
                  value={money(analysis.expectedWealth)}
                  note={`The probability-weighted average after ${analysis.rounds} rounds.`}
                />
                <Stat
                  label="Your growth per round"
                  value={`${(analysis.realisedGrowthPerRound * 100).toFixed(2)}%`}
                  note={`The game's typical long-run rate is ${(analysis.typicalGrowthPerRound * 100).toFixed(2)}% per round.`}
                />
              </div>

              <div className="mt-8 rounded-xl border border-ergo-line bg-ergo-card p-5">
                <h2 className="font-mono text-[11px] tracking-[0.14em] text-ergo-green uppercase">
                  What this means
                </h2>
                <div className="mt-3 text-[15px] leading-relaxed text-ergo-ink">
                  <MessageResponse>{outcome?.ok ? outcome.explanation : ""}</MessageResponse>
                </div>
              </div>
            </section>
          ) : null}
        </main>

        <footer className="mt-12 border-t border-ergo-line pt-4 text-[11px] leading-[1.9] text-ergo-muted">
          ErgoLabs · Educational experiments · No investment recommendations
          <p className="mt-2 max-w-[78ch] text-[10px]">
            The numbers on this page come from the site's own model; the written explanation is
            generated by a model reading those numbers.
          </p>
        </footer>
      </div>
    </div>
  );
}

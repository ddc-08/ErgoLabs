import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import capturedCSS from "@/styles/pages/ergolabs.experiment-ahtml-50fe086c96acb043.css?raw";
import extraCSS from "@/styles/pages/ergolabs.experiments-extra.css?raw";

export type ExperimentStep = {
  /** Short label for the step navigation, e.g. "The game". */
  label: string;
  /** Text of the button that leads to the next step. */
  next?: string;
  render: () => ReactNode;
};

type TrackFn = (name: string, props: Record<string, unknown>) => void;
function track(name: string, props: Record<string, unknown>) {
  const w = window as unknown as { __lovableEvents?: { track?: TrackFn } };
  w.__lovableEvents?.track?.(name, props);
}

/**
 * Six-step guided journey shared by Experiments D–G. Steps are addressable as
 * #step-n, and analytics mirror Experiment A with an `experiment` letter.
 */
export function ExperimentPage({
  letter,
  steps,
  run,
}: {
  letter: string;
  steps: ExperimentStep[];
  run: { seed: number; players: number; rounds: number };
}) {
  const [current, setCurrent] = useState(1);
  const runReported = useRef<string | null>(null);
  const runRef = useRef(run);
  runRef.current = run;
  const mainRef = useRef<HTMLElement>(null);
  const total = steps.length;

  useEffect(() => {
    const route = () => {
      const m = location.hash.match(/^#step-(\d+)$/);
      const n = location.hash === "#results" ? total : m ? Number(m[1]) : 1;
      setCurrent(Math.max(1, Math.min(total, n)));
    };
    route();
    window.addEventListener("hashchange", route);
    window.addEventListener("popstate", route);
    return () => {
      window.removeEventListener("hashchange", route);
      window.removeEventListener("popstate", route);
    };
  }, [total]);

  const go = useCallback(
    (n: number) => {
      const from = current;
      const to = Math.max(1, Math.min(total, n));
      try {
        history.pushState(history.state, "", "#step-" + to);
      } catch {
        /* ignore */
      }
      setCurrent(to);
      requestAnimationFrame(() => {
        const heading = mainRef.current?.querySelector<HTMLElement>(".stage h1, .stage h2");
        heading?.focus({ preventScroll: true });
        heading?.scrollIntoView({ block: "start", behavior: "auto" });
      });
      if (from === 1 && to > 1) track("project.experiment_started", { experiment: letter });
      if (to > from) track("project.experiment_step_completed", { experiment: letter, step: from, step_name: steps[from - 1]?.label ?? "Unknown step" });
      const key = JSON.stringify(runRef.current);
      if (to === total && runReported.current !== key) {
        runReported.current = key;
        track("project.experiment_run_completed", { experiment: letter, ...runRef.current });
      }
    },
    [current, total, letter, steps],
  );

  const step = steps[current - 1];
  if (!step) return null;
  return (
    <>
      <style>{capturedCSS}</style>
      <style>{extraCSS}</style>
      <a className="skip-main left-[18px] absolute top-0 z-200" href="#content">
        Skip to main content
      </a>
      <div className="shell">
        <nav aria-label="Main navigation">
          <a href="/">
            <span className="brand">ErgoLabs</span>
            <span className="brand-tagline">Chance, growth &amp; decisions</span>
          </a>
          <div className="nav-links items-center flex-wrap">
            <a href="/#experiments">Experiments</a>
            <a href="/ergolabs/bibliographyhtml-3408dc6a695866e9">Bibliography</a>
            <span className="muted [@media(max-width:600px)]:w-full">Davide Di Conno</span>
          </div>
        </nav>
        <main id="content" ref={mainRef}>
          <div className="journey-bar">
            <a href="/#experiments">← Experiments</a>
            <Button variant="outline" type="button" onClick={() => go(total)}>
              Skip to results →
            </Button>
          </div>
          <nav className="journey-nav" aria-label="Experiment steps">
            {steps.map((s, i) => (
              <Button variant="outline" key={s.label} type="button" aria-current={current === i + 1 ? "step" : "false"} onClick={() => go(i + 1)}>
                <span>{String(i + 1).padStart(2, "0")}</span> {s.label}
              </Button>
            ))}
          </nav>
          <p className="small" role="status">
            Step {current} of {total} · {step.label}
          </p>
          <section className="stage" key={current} aria-label={step.label}>
            {step.render()}
            {current < total ? (
              <div className="stage-nav">
                <Button variant="outline" type="button" className="primary" onClick={() => go(current + 1)}>
                  {step.next ?? "Next →"}
                </Button>
              </div>
            ) : null}
          </section>
        </main>
        <footer className="text-(--muted) leading-[1.9] pt-[22px] [border-top:1px_solid_var(--line)]">
          ErgoLabs · Educational experiments · No investment recommendations
          <br />
          <a href="/">Home</a> · <a href="/ergolabs/bibliographyhtml-3408dc6a695866e9">Bibliography</a>
          <p className="quiet-note">This website was developed with the aid of ChatGPT.</p>
        </footer>
      </div>
    </>
  );
}

/** A row of mutually exclusive answer buttons (aria-pressed), like Experiment A's prompts. */
export function Choice({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: string; label: string }[];
  value: string | null;
  onChange: (v: string) => void;
}) {
  return (
    <div className="actions" role="group" aria-label={label}>
      {options.map((o) => (
        <Button variant="outline" key={o.value} type="button" aria-pressed={value === o.value} onClick={() => onChange(o.value)}>
          {o.label}
        </Button>
      ))}
    </div>
  );
}

export type QuizQuestion = {
  question: string;
  options: string[];
  /** Index of the correct option. */
  correct: number;
  explanation: string;
};

/** Knowledge check with per-question feedback; answers stay in the browser. */
export function Quiz({ letter, questions }: { letter: string; questions: QuizQuestion[] }) {
  const [answers, setAnswers] = useState<(number | null)[]>(() => questions.map(() => null));
  const [checked, setChecked] = useState(false);
  const [note, setNote] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const correct = answers.filter((a, i) => a === questions[i]?.correct).length;
  const id = `quiz-${letter}`;
  return (
    <form
      className="check"
      aria-labelledby={`${id}-title`}
      onSubmit={(e) => {
        e.preventDefault();
        if (answers.some((a) => a === null)) {
          setNote("Choose an answer for every question, then check again.");
          setChecked(false);
          return;
        }
        setNote(null);
        setChecked(true);
        track("project.quiz_answered", { experiment: letter, correct, total: questions.length });
        requestAnimationFrame(() => resultRef.current?.focus());
      }}
      onReset={() => {
        setAnswers(questions.map(() => null));
        setChecked(false);
        setNote(null);
      }}
    >
      <h2 id={`${id}-title`}>Check your understanding</h2>
      <p>Choose one answer for each question, then check your answers for explanations. Answers are checked in your browser and are not saved.</p>
      <div ref={resultRef} className="quiz-result" role="status" tabIndex={-1} hidden={!checked && !note}>
        {checked ? `${correct} of ${questions.length} correct. Review the explanations, then change any answer and check again.` : note}
      </div>
      {questions.map((q, qi) => {
        const state = checked ? (answers[qi] === q.correct ? "correct" : "review") : undefined;
        return (
          <fieldset key={qi} className="quiz-question" data-state={state} aria-describedby={`${id}-f${qi}`}>
            <legend>
              {qi + 1}. {q.question}
            </legend>
            {q.options.map((o, oi) => (
              <label key={oi} className="quiz-option">
                <input
                  type="radio"
                  name={`${id}-q${qi}`}
                  value={oi}
                  checked={answers[qi] === oi}
                  onChange={() => {
                    setAnswers((a) => a.map((v, i) => (i === qi ? oi : v)));
                    if (checked) {
                      setChecked(false);
                      setNote("Answers changed. Check again for updated feedback.");
                    }
                  }}
                />
                <span>{o}</span>
              </label>
            ))}
            <p id={`${id}-f${qi}`} className="quiz-feedback" hidden={!checked}>
              {checked ? (answers[qi] === q.correct ? "Correct. " : "Not quite. ") + q.explanation : ""}
            </p>
          </fieldset>
        );
      })}
      <div className="actions">
        <Button variant="outline" type="submit" className="primary">
          Check answers
        </Button>
        <Button variant="outline" type="reset">Start again</Button>
      </div>
    </form>
  );
}

/** Runs an expensive pure computation after the first paint and re-runs when the key changes. */
export function useSimulation<T>(key: string, compute: () => T): T | null {
  const [state, setState] = useState<{ key: string; value: T } | null>(null);
  const computeRef = useRef(compute);
  computeRef.current = compute;
  useEffect(() => {
    let cancelled = false;
    const t = setTimeout(() => {
      const value = computeRef.current();
      if (!cancelled) setState({ key, value });
    }, 0);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [key]);
  return state?.key === key ? state.value : null;
}

export function SeedControl({ seed, onSeed }: { seed: number; onSeed: (s: number) => void }) {
  const [draft, setDraft] = useState(String(seed));
  const [msg, setMsg] = useState("");
  useEffect(() => setDraft(String(seed)), [seed]);
  return (
    <details>
      <summary>Reproduce or change the sample</summary>
      <p className="small">The seed determines every random draw. Reusing a seed reproduces exactly the same run.</p>
      <form
        className="actions"
        onSubmit={(e) => {
          e.preventDefault();
          const v = Number(draft);
          if (draft.trim() === "" || !Number.isInteger(v) || v < 0 || v > 4294967295) {
            setMsg("Enter a whole seed from 0 to 4,294,967,295.");
            return;
          }
          onSeed(v);
          setMsg(`Seed ${v} applied.`);
        }}
      >
        <label htmlFor="seedInput">Seed</label>
        <input id="seedInput" type="number" min={0} max={4294967295} step={1} inputMode="numeric" value={draft} onChange={(e) => setDraft(e.target.value)} />
        <Button variant="outline" type="submit">Apply seed</Button>
        <Button variant="outline"
          type="button"
          onClick={() => {
            const v = crypto.getRandomValues(new Uint32Array(1))[0] ?? 42;
            onSeed(v);
            setMsg(`New seed ${v} generated.`);
          }}
        >
          New random seed
        </Button>
      </form>
      <p className="small" role="status">
        {msg}
      </p>
    </details>
  );
}

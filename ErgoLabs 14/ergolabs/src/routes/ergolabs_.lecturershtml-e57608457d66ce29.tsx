import { createFileRoute } from "@tanstack/react-router";
import capturedCSS from "../styles/pages/ergolabs.lecturershtml-e57608457d66ce29.css?raw";

export const Route = createFileRoute("/ergolabs_/lecturershtml-e57608457d66ce29")({
  head: () => ({
    meta: [
      { title: "For lecturers · ErgoLabs" },
      { name: "description", content: "Teaching notes for lecturers: run Experiment A in class with a shared seed and guide students through ergodicity." },
      { property: "og:title", content: "For lecturers · ErgoLabs" },
      { property: "og:description", content: "Teaching notes for lecturers: run Experiment A in class with a shared seed and guide students through ergodicity." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  staticData: { importedDocument: { html: { "lang": "en" }, body: { "className": "page-lecturers" } } },
  component: Index,
});

function Index() {
  return (
    <>
      <style>{capturedCSS}</style>
      <a className="skip-main bg-none [background-position:0%_0%] [background-size:auto_auto] [background-repeat:repeat] [background-origin:padding-box] [background-clip:border-box] [background-attachment:scroll] bg-(--ink) left-[18px] py-[12px] px-[20px] absolute underline-offset-3 top-0 z-200" href="#content">Skip to main content</a>
      <div className="shell m-auto max-w-[1256px]">
        <nav className="flex-wrap gap-[20px] justify-between [border-bottom:0px]" aria-label="Main navigation">
          <a className="underline-offset-3" href="/">
            <span className="brand gap-[9px] tracking-[-1.3px]">ErgoLabs</span>
            <span className="brand-tagline text-(--muted) tracking-wider leading-[1.4]">Chance, growth &amp; decisions</span>
          </a>
          <div className="nav-links items-center flex-wrap [@media(max-width:600px)]:text-[12px]">
            <a className="underline-offset-3 [font-weight:550]" href="/#experiments">Experiments</a>
            <a className="underline-offset-3 [font-weight:550]" href="/ergolabs/bibliographyhtml-3408dc6a695866e9">Bibliography</a>
            <span className="muted text-(--muted) text-[11px] pl-[24px] [border-left:1px_solid_var(--line)] [@media(max-width:600px)]:w-full">Davide Di Conno</span>
          </div>
        </nav>
        <main className="m-0 max-w-none" id="content">
          <div className="mt-[24px] [font:10px/1.5_var(--mono)]"><a className="underline-offset-3" href="/">Home</a> / For lecturers</div>
          <ImportedSectionAssignTheCoinToss />
        </main>
        <footer className="text-(--muted) text-[11px] leading-[1.9] pt-[22px] [border-top:1px_solid_var(--line)]">ErgoLabs · Educational experiments · No investment recommendations<br /><a className="text-[11px] underline-offset-3" href="/">Home</a> · <a className="text-[11px] underline-offset-3" href="/ergolabs/bibliographyhtml-3408dc6a695866e9">Bibliography</a><p className="quiet-note text-(--muted) text-[10px] max-w-[78ch]">This website was developed with the aid of ChatGPT.</p></footer>
      </div>
    </>
  );
}

function ImportedSectionAssignTheCoinToss() {
  return (
    <section className="lecturer-guide mt-[30px] mr-0 mb-[40px] ml-0 max-w-[860px]" aria-labelledby="lecturersTitle">
      <div className="eyebrow text-(--green) uppercase">For lecturers · Experiment A</div>
      <h1 className="font-[family-name:var(--display)]! text-[clamp(40px,5vw,60px)]! font-normal! tracking-[-0.055em] leading-[1.1]! mt-[15px] mr-0 mb-[22px] ml-0 mt-[12px]! [font:clamp(36px,6vw,60px)/1.1_Georgia,serif]" id="lecturersTitle">Assign the coin-toss lesson.</h1>
      <p className="max-w-[78ch]">An interactive lesson on why rising expected wealth can coexist with losses for most players. It runs in the browser, with no sign-up.</p>
      <h2 className="font-[family-name:var(--display)]! text-[28px]! font-normal! tracking-[-0.055em] leading-[1.1]! mt-[9px] mr-0 mb-[16px] ml-0 mt-[38px]! [font:29px/1.25_Georgia,serif]">Learning objectives</h2>
      <p className="max-w-[78ch]">By the end of the lesson, students can:</p>
      <ol>
        <li className="my-[9px] mx-0 max-w-[78ch]">Distinguish expected wealth across many players from the growth of one player’s wealth over repeated rounds.</li>
        <li className="my-[9px] mx-0 max-w-[78ch]">Explain why a +50% / −40% pair of tosses multiplies wealth by 1.5 × 0.6 = 0.9, and why most players finish below $100 even though expected wealth rises 5% per round.</li>
        <li className="my-[9px] mx-0 max-w-[78ch]">Interpret the gap between sample mean and median, and state what ergodicity asks: whether time averages and averages across possible outcomes agree for the same quantity.</li>
      </ol>
      <h2 className="font-[family-name:var(--display)]! text-[28px]! font-normal! tracking-[-0.055em] leading-[1.1]! mt-[9px] mr-0 mb-[16px] ml-0 mt-[38px]! [font:29px/1.25_Georgia,serif]">Prerequisites</h2>
      <p className="max-w-[78ch]">Percentages and basic expected value. Logarithms are used only in the optional mathematics.</p>
      <h2 className="font-[family-name:var(--display)]! text-[28px]! font-normal! tracking-[-0.055em] leading-[1.1]! mt-[9px] mr-0 mb-[16px] ml-0 mt-[38px]! [font:29px/1.25_Georgia,serif]">Suggested classroom sequence</h2>
      <ol>
        <li className="my-[9px] mx-0 max-w-[78ch]"><strong>Individual prediction.</strong> Each student answers, on paper, “Would you take the offer?” and “Will most of 1,000 players finish above or below $100 after 100 rounds?” Answers entered on the site stay in the page and are not collected.</li>
        <li className="my-[9px] mx-0 max-w-[78ch]"><strong>Experiment.</strong> Students work through the steps using the fixed-seed link below, so everyone sees the same 1,000 histories. The knowledge check at the end includes a new game (±20%).</li>
        <li className="my-[9px] mx-0 max-w-[78ch]"><strong>Paired explanation.</strong> In pairs, students explain to each other why expected wealth rises while most players finish below $100. For the ±20% quiz question, ask them to explain aloud the difference between unchanged expected wealth and a preserved individual balance. During the pilot, note where explanations break down.</li>
        <li className="my-[9px] mx-0 max-w-[78ch]"><strong>Class discussion.</strong> Use the prompts below.</li>
      </ol>
      <h2 className="font-[family-name:var(--display)]! text-[28px]! font-normal! tracking-[-0.055em] leading-[1.1]! mt-[9px] mr-0 mb-[16px] ml-0 mt-[38px]! [font:29px/1.25_Georgia,serif]">Discussion prompts</h2>
      <ul>
        <li className="my-[9px] mx-0 max-w-[78ch]">Would your answer change if you could play only once rather than 100 times? What objective are you maximising in each case?</li>
        <li className="my-[9px] mx-0 max-w-[78ch]">Which decisions you know of compound over time, so that a population average may be a poor guide to one person’s experience? Which do not?</li>
      </ul>
      <h2 className="font-[family-name:var(--display)]! text-[28px]! font-normal! tracking-[-0.055em] leading-[1.1]! mt-[9px] mr-0 mb-[16px] ml-0 mt-[38px]! [font:29px/1.25_Georgia,serif]">Fixed-seed experiment links</h2>
      <p className="max-w-[78ch]">Seed 42 reproduces the same simulation every time. In that run, about 87.1% of the 1,000 players finish below $100, the sample median is about $0.52 and the sample average is about $638.85. The theoretical expectation, $13,150.13, differs because a sample can miss rare very large balances.</p>
      <p className="lecturer-links actions max-w-[78ch]">
        <a className="button primary underline-offset-3" href={"/ergolabs/experiment-ahtml-50fe086c96acb043?seed=42&player=1#step-1"}>Start Experiment A (seed 42)</a>
        <a className="button underline-offset-3" href={"/ergolabs/experiment-ahtml-50fe086c96acb043?seed=42&player=1#step-4"}>Open the comparison (seed 42)</a>
      </p>
      <p className="small text-(--muted) text-[13px] max-w-[78ch]">Changing the seed, player or chart settings on the page updates its address, so a modified link can be shared.</p>
      <h2 className="font-[family-name:var(--display)]! text-[28px]! font-normal! tracking-[-0.055em] leading-[1.1]! mt-[9px] mr-0 mb-[16px] ml-0 mt-[38px]! [font:29px/1.25_Georgia,serif]">Reading</h2>
      <p className="max-w-[78ch]">The <a className="underline-offset-3" href="/ergolabs/bibliographyhtml-3408dc6a695866e9">bibliography</a> lists the sources. Start students with <a className="underline-offset-3" href="/ergolabs/bibliographyhtml-3408dc6a695866e9#introductoryReading">Peters (2023), The infamous coin toss</a>.</p>
      <h2 className="font-[family-name:var(--display)]! text-[28px]! font-normal! tracking-[-0.055em] leading-[1.1]! mt-[9px] mr-0 mb-[16px] ml-0 mt-[38px]! [font:29px/1.25_Georgia,serif]">Duration</h2>
      <p className="max-w-[78ch]">Not yet measured. An estimate will be added after student sessions.</p>
    </section>
  );
}

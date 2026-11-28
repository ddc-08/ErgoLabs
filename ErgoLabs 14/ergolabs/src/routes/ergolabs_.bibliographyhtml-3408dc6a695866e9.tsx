import { createFileRoute } from "@tanstack/react-router";
import capturedCSS from "../styles/pages/ergolabs.bibliographyhtml-3408dc6a695866e9.css?raw";

export const Route = createFileRoute("/ergolabs_/bibliographyhtml-3408dc6a695866e9")({
  head: () => ({
    meta: [
      { title: "Bibliography · ErgoLabs" },
      { name: "description", content: "Sources, readings and model assumptions behind the ErgoLabs ergodicity economics experiments." },
      { property: "og:title", content: "Bibliography · ErgoLabs" },
      { property: "og:description", content: "Sources, readings and model assumptions behind the ErgoLabs ergodicity economics experiments." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  staticData: { importedDocument: { html: { "lang": "en" }, body: { "className": "page-bibliography" } } },
  component: Index,
});

function Index() {
  return (
    <>
      <style>{capturedCSS}</style>
      <a className="skip-main bg-none [background-position:0%_0%] [background-size:auto_auto] [background-repeat:repeat] [background-origin:padding-box] [background-clip:border-box] [background-attachment:scroll] bg-(--ink) text-white left-[18px] py-[12px] px-[20px] absolute underline-offset-3 top-0 z-200" href="#content">Skip to main content</a>
      <div className="shell m-auto max-w-[1256px]">
        <nav className="flex-wrap gap-[20px] justify-between [border-bottom:0px]" aria-label="Main navigation">
          <a className="text-(--green) underline-offset-3" href="/">
            <span className="brand gap-[9px] tracking-[-1.3px]">ErgoLabs</span>
            <span className="brand-tagline text-(--muted) tracking-wider leading-[1.4]">Chance, growth &amp; decisions</span>
          </a>
          <div className="nav-links items-center flex-wrap [@media(max-width:600px)]:text-[12px]">
            <a className="text-(--ink) underline-offset-3 [font-weight:550]" href="/#experiments">Experiments</a>
            <a className="text-(--ink) underline-offset-3 [font-weight:550]" href="#">Bibliography</a>
            <span className="muted text-(--muted) text-[11px] pl-[24px] [border-left:1px_solid_var(--line)] [@media(max-width:600px)]:w-full">Davide Di Conno</span>
          </div>
        </nav>
        <main className="m-0 max-w-none" id="content">
          <div className="mt-[24px] [font:10px/1.5_var(--mono)]"><a className="text-(--green) underline-offset-3" href="/">Home</a> / Bibliography</div>
          <ImportedSectionWhereToStartReading />
          <p className="my-[10px] mx-0 max-w-[78ch]">
            <a className="button bg-none [background-position:0%_0%] [background-size:auto_auto] [background-repeat:repeat] [background-origin:padding-box] [background-clip:border-box] [background-attachment:scroll] bg-(--card) text-(--green) underline-offset-3" href="/ergolabs/experiment-ahtml-50fe086c96acb043#results">Go to A’s results</a>
          </p>
        </main>
        <footer className="text-(--muted) text-[11px] leading-[1.9] pt-[22px] [border-top:1px_solid_var(--line)]">ErgoLabs · Educational experiments · No investment recommendations<br /><a className="text-(--green) text-[11px] underline-offset-3" href="/">Home</a> · <a className="text-(--green) text-[11px] underline-offset-3" href="#">Bibliography</a><p className="text-(--muted) text-[10px] my-[10px] mx-0 mt-[12px]! max-w-[78ch]">This website was developed with the aid of ChatGPT.</p></footer>
      </div>
    </>
  );
}

function ImportedSectionWhereToStartReading() {
  return (
    <section className="mt-[32px] [scroll-margin-top:24px]" aria-labelledby="bibliographyTitle">
      <div className="eyebrow text-(--green) uppercase">Reading and sources</div>
      <h1 className="font-[family-name:var(--display)]! text-[clamp(43px,5.5vw,65px)]! font-normal! tracking-[-0.055em] leading-[1.1]! mt-[15px] mr-0 mb-[22px] ml-0 text-balance [font:clamp(36px,6vw,60px)/1.1_Georgia,serif] [scroll-margin-top:24px]" id="bibliographyTitle">Where to start reading.</h1>
      <p className="my-[10px] mx-0 max-w-[78ch]">Start with the coin-toss explanation below. The longer readings and formal mathematics are listed separately.</p>
      <section className="mt-[32px] [scroll-margin-top:24px]" aria-labelledby="startReadingTitle">
        <h2 className="font-[family-name:var(--display)]! text-[clamp(29px,3.4vw,42px)]! font-normal! tracking-[-0.055em] leading-[1.1]! mt-[9px] mr-0 mb-[16px] ml-0 text-balance [font:29px/1.25_Georgia,serif] [scroll-margin-top:24px]" id="startReadingTitle">Start here</h2>
        <div className="source bg-none [background-position:0%_0%] [background-size:auto_auto] [background-repeat:repeat] [background-origin:padding-box] [background-clip:border-box] [background-attachment:scroll] bg-white rounded-[9px] my-[16px] mx-0 max-w-[960px] [border:1px_solid_var(--line)]" id="introductoryReading">
          <span className="text-(--muted) tracking-[0.08em] uppercase [font:10px_var(--mono)]">Introductory explanation · Experiment A</span>
          <h3 className="font-[family-name:var(--text)] tracking-tight mt-0 mr-0 mb-[9px] ml-0 text-balance [scroll-margin-top:24px]">Ole Peters (2023)</h3>
          <p className="my-[10px] mx-0 max-w-[78ch]"><em>The infamous coin toss.</em> Ergodicity Economics, 28 July 2023.</p>
          <p className="my-[10px] mx-0 max-w-[78ch]">
            <a className="text-(--green) underline-offset-3" href="https://ergodicityeconomics.com/blog/the-infamous-coin-toss/" rel="noopener noreferrer" target="_blank">Read the introduction ↗</a>
          </p>
          <p className="my-[10px] mx-0 max-w-[78ch]">Explains the +50% / −40% coin-toss game using a worked example and interactive simulations. A useful first reading alongside Experiment A.</p>
        </div>
      </section>
      <section className="mt-[32px] [scroll-margin-top:24px]" aria-labelledby="furtherReadingTitle">
        <h2 className="font-[family-name:var(--display)]! text-[clamp(29px,3.4vw,42px)]! font-normal! tracking-[-0.055em] leading-[1.1]! mt-[9px] mr-0 mb-[16px] ml-0 text-balance [font:29px/1.25_Georgia,serif] [scroll-margin-top:24px]" id="furtherReadingTitle">Further reading</h2>
        <div className="source bg-none [background-position:0%_0%] [background-size:auto_auto] [background-repeat:repeat] [background-origin:padding-box] [background-clip:border-box] [background-attachment:scroll] bg-white rounded-[9px] my-[16px] mx-0 max-w-[960px] [border:1px_solid_var(--line)]">
          <span className="text-(--muted) tracking-[0.08em] uppercase [font:10px_var(--mono)]">Student research essay</span>
          <h3 className="font-[family-name:var(--text)] tracking-tight mt-0 mr-0 mb-[9px] ml-0 text-balance [scroll-margin-top:24px]">Davide Di Conno</h3>
          <p className="my-[10px] mx-0 max-w-[78ch]"><em>How can the ergodic theory be used to maximise one's wealth growth?</em> Student research essay; undated.</p>
          <p className="small text-(--muted) my-[10px] mx-0 max-w-[78ch]">A public reading link is not yet available.</p>
          <details className="bg-none [background-position:0%_0%] [background-size:auto_auto] [background-repeat:repeat] [background-origin:padding-box] [background-clip:border-box] [background-attachment:scroll] bg-[#f9fbf6] border-(--line)! rounded-[8px] my-[16px] mx-0 py-[13px] px-[17px] [border:1px_solid_var(--line)]">
            <summary className="cursor-pointer text-[13px] leading-normal py-[3px] px-0 [font-weight:650]">How it relates to ErgoLabs</summary>
            <p className="my-[10px] mx-0 max-w-[78ch]">Page 4 introduces the coin-toss game. Pages 5–7 discuss losses that prevent further play and ways to limit the money at risk.</p>
            <p className="my-[10px] mx-0 max-w-[78ch]">The website distinguishes growth rates from averages of wealth, and gradual losses from losing everything. Whether insurance helps depends on the premium and the outcome being assessed. Reducing risk alone does not make wealth ergodic.</p>
          </details>
        </div>
        <div className="source bg-none [background-position:0%_0%] [background-size:auto_auto] [background-repeat:repeat] [background-origin:padding-box] [background-clip:border-box] [background-attachment:scroll] bg-white rounded-[9px] my-[16px] mx-0 max-w-[960px] [border:1px_solid_var(--line)]">
          <span className="text-(--muted) tracking-[0.08em] uppercase [font:10px_var(--mono)]">Research paper · Compound growth</span>
          <h3 className="font-[family-name:var(--text)] tracking-tight mt-0 mr-0 mb-[9px] ml-0 text-balance [scroll-margin-top:24px]">Ole Peters (2011)</h3>
          <p className="my-[10px] mx-0 max-w-[78ch]"><em>The time resolution of the St Petersburg paradox.</em> Philosophical Transactions of the Royal Society A, 369, 4913–4931.</p>
          <p className="my-[10px] mx-0 max-w-[78ch]">
            <a className="text-(--green) underline-offset-3" href="https://doi.org/10.1098/rsta.2011.0065" rel="noopener noreferrer" target="_blank">Read the paper ↗</a>
          </p>
          <details className="bg-none [background-position:0%_0%] [background-size:auto_auto] [background-repeat:repeat] [background-origin:padding-box] [background-clip:border-box] [background-attachment:scroll] bg-[#f9fbf6] border-(--line)! rounded-[8px] my-[16px] mx-0 py-[13px] px-[17px] [border:1px_solid_var(--line)]">
            <summary className="cursor-pointer text-[13px] leading-normal py-[3px] px-0 [font-weight:650]">How it relates to ErgoLabs</summary>
            <p className="my-[10px] mx-0 max-w-[78ch]">Section 6, especially equations (6.6)–(6.10), uses logarithms to calculate compound growth. Section 7 explains how this calculation differs in meaning from treating the logarithm of wealth as a measure of personal value, or utility.</p>
            <p className="my-[10px] mx-0 max-w-[78ch]">In Peters’ lottery, the ticket price and the player’s wealth affect the fraction at risk. Experiment A instead uses fixed percentage gains and losses. Repeating opportunities on equivalent terms is a model assumption.</p>
          </details>
        </div>
        <div className="source bg-none [background-position:0%_0%] [background-size:auto_auto] [background-repeat:repeat] [background-origin:padding-box] [background-clip:border-box] [background-attachment:scroll] bg-white rounded-[9px] my-[16px] mx-0 max-w-[960px] [border:1px_solid_var(--line)]">
          <span className="text-(--muted) tracking-[0.08em] uppercase [font:10px_var(--mono)]">Essay · Risk and ruin</span>
          <h3 className="font-[family-name:var(--text)] tracking-tight mt-0 mr-0 mb-[9px] ml-0 text-balance [scroll-margin-top:24px]">Nassim Nicholas Taleb (2017)</h3>
          <p className="my-[10px] mx-0 max-w-[78ch]"><em>The Logic of Risk Taking.</em> INCERTO, Medium, 25 August 2017.</p>
          <p className="my-[10px] mx-0 max-w-[78ch]">
            <a className="text-(--green) underline-offset-3" href="https://medium.com/incerto/the-logic-of-risk-taking-107bf41029d3" rel="noopener noreferrer" target="_blank">Read the essay ↗</a>
          </p>
          <details className="bg-none [background-position:0%_0%] [background-size:auto_auto] [background-repeat:repeat] [background-origin:padding-box] [background-clip:border-box] [background-attachment:scroll] bg-[#f9fbf6] border-(--line)! rounded-[8px] my-[16px] mx-0 py-[13px] px-[17px] [border:1px_solid_var(--line)]">
            <summary className="cursor-pointer text-[13px] leading-normal py-[3px] px-0 [font-weight:650]">How it relates to ErgoLabs</summary>
            <p className="my-[10px] mx-0 max-w-[78ch]">Taleb’s discussion of ruin inspired the stopping-rule example. The $10 threshold is our illustration of having to stop; the player keeps the remaining money. This example is separate from the mathematical definition of ergodicity.</p>
          </details>
        </div>
      </section>
      <section className="mt-[32px] [scroll-margin-top:24px]" aria-labelledby="formalReadingTitle">
        <h2 className="font-[family-name:var(--display)]! text-[clamp(29px,3.4vw,42px)]! font-normal! tracking-[-0.055em] leading-[1.1]! mt-[9px] mr-0 mb-[16px] ml-0 text-balance [font:29px/1.25_Georgia,serif] [scroll-margin-top:24px]" id="formalReadingTitle">Optional mathematical background</h2>
        <p className="small text-(--muted) my-[10px] mx-0 max-w-[78ch]">For readers who want the precise theorem and its assumptions.</p>
        <details className="bg-none [background-position:0%_0%] [background-size:auto_auto] [background-repeat:repeat] [background-origin:padding-box] [background-clip:border-box] [background-attachment:scroll] bg-[#f9fbf6] border-(--line)! rounded-[8px] my-[16px] mx-0 py-[13px] px-[17px] [border:1px_solid_var(--line)]">
          <summary className="cursor-pointer text-[13px] leading-normal py-[3px] px-0 [font-weight:650]">Formal statement of the ergodic theorem</summary>
          <div className="source bg-none [background-position:0%_0%] [background-size:auto_auto] [background-repeat:repeat] [background-origin:padding-box] [background-clip:border-box] [background-attachment:scroll] bg-white rounded-[9px] my-[16px] mx-0 max-w-[960px] [border:1px_solid_var(--line)]" id="ergodicityReference">
            <span className="text-(--muted) tracking-[0.08em] uppercase [font:10px_var(--mono)]">Advanced lecture notes · Formal statement</span>
            <h3 className="font-[family-name:var(--text)] tracking-tight mt-0 mr-0 mb-[9px] ml-0 text-balance [scroll-margin-top:24px]">Will J. Merry (2019–2020)</h3>
            <p className="my-[10px] mx-0 max-w-[78ch]"><em>Sixty Lectures of Dynamical Systems.</em> ETH Zürich. Lecture 20, Corollary 20.3 and Remark 20.4.</p>
            <p className="my-[10px] mx-0 max-w-[78ch]">
              <a className="text-(--green) underline-offset-3" href="https://www2.math.ethz.ch/will-merry/files/Merry%20-%20Sixty%20Lectures%20of%20Dynamical%20Systems%20%282020%29.pdf#page=138" rel="noopener noreferrer" target="_blank">Read the mathematical statement ↗</a>
            </p>
            <p className="small text-(--muted) my-[10px] mx-0 max-w-[78ch]">Gives the formal conditions under which a time average equals the expected value in the long run. This is optional mathematical background.</p>
          </div>
        </details>
      </section>
      <details className="bg-none [background-position:0%_0%] [background-size:auto_auto] [background-repeat:repeat] [background-origin:padding-box] [background-clip:border-box] [background-attachment:scroll] bg-[#f9fbf6] border-(--line)! rounded-[8px] my-[16px] mx-0 py-[13px] px-[17px] [border:1px_solid_var(--line)]">
        <summary className="cursor-pointer text-[13px] leading-normal py-[3px] px-0 [font-weight:650]">Model assumptions, reproducibility &amp; limitations</summary>
        <p className="my-[10px] mx-0 max-w-[78ch]">Each player starts with $100. Independent fair tosses multiply all current wealth by 1.5 or 0.6. The main game has no costs, income, spending, borrowing, pooling or early stopping. Balances may include fractions of a cent.</p>
        <p className="my-[10px] mx-0 max-w-[78ch]">At round 100, H follows Binomial(100, ½). Wealth is $100 × 1.5ᴴ × 0.6¹⁰⁰⁻ᴴ. Finishing below $100 means H ≤ 55, with exact probability approximately 86.44%.</p>
        <p className="my-[10px] mx-0 max-w-[78ch]">The simulation uses Mulberry32 to generate its tosses. Reusing a seed reproduces this website’s results; it need not reproduce results from NumPy. The final-wealth calculation has been checked against the number of heads.</p>
        <p className="my-[10px] mx-0 max-w-[78ch]">The simulation illustrates the model; it does not prove ergodicity. A gap between the mean and median is not enough to establish non-ergodicity either.</p>
        <p className="my-[10px] mx-0 max-w-[78ch]">Maximising long-run compound growth is one possible aim. A player’s preferences, available money and intended number of rounds can lead to a different choice. This example does not disprove expected-utility theory.</p>
      </details>
    </section>
  );
}

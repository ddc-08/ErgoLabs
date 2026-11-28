import { createFileRoute } from "@tanstack/react-router";
import capturedCSS from "../styles/pages/ergolabs.experiment-bhtml-569739d817ec2099.css?raw";

export const Route = createFileRoute("/ergolabs_/experiment-bhtml-569739d817ec2099")({
  head: () => ({
    meta: [
      { title: "Ruin over time · ErgoLabs" },
      { name: "description", content: "Preview of Experiment B: what happens to players when losing everything means they cannot play again." },
      { property: "og:title", content: "Ruin over time · ErgoLabs" },
      { property: "og:description", content: "Preview of Experiment B: what happens to players when losing everything means they cannot play again." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  staticData: { importedDocument: { html: { "lang": "en" }, body: { "className": "page-experiment-b" } } },
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
          <div className="mt-[24px] [font:10px/1.5_var(--mono)]"><a className="underline-offset-3" href="/#experiments">Experiments</a> / Preview</div>
          <ImportedSectionRuinOverTime />
        </main>
        <footer className="text-(--muted) text-[11px] leading-[1.9] pt-[22px] [border-top:1px_solid_var(--line)]">ErgoLabs · Educational experiments · No investment recommendations<br /><a className="text-[11px] underline-offset-3" href="/">Home</a> · <a className="text-[11px] underline-offset-3" href="/ergolabs/bibliographyhtml-3408dc6a695866e9">Bibliography</a><p className="text-(--muted) text-[10px] my-[10px] mx-0 mt-[12px]! max-w-[78ch]">This website was developed with the aid of ChatGPT.</p></footer>
      </div>
    </>
  );
}

function ImportedSectionRuinOverTime() {
  return (
    <section className="placeholder bg-none [background-position:0%_0%] [background-size:auto_auto] [background-repeat:repeat] [background-origin:padding-box] [background-clip:border-box] [background-attachment:scroll] bg-white rounded-[14px] grid-cols-[minmax(0px,1.5fr)_minmax(220px,1fr)] max-w-[1000px] [border:1px_solid_var(--line)]">
      <div className="eyebrow text-(--green) mt-[7px] uppercase">Experiment B · Repeated exposure</div>
      <h1 className="tracking-[-0.055em] mt-[15px] mr-0 mb-[22px] ml-0 mt-[20px]!">Ruin over time</h1>
      <span className="pill forthcoming-label bg-none [background-position:0%_0%] [background-size:auto_auto] [background-repeat:repeat] [background-origin:padding-box] [background-clip:border-box] [background-attachment:scroll] bg-[#f2f4ed] border border-solid border-[#d5dfcd] rounded-[20px] text-[#526348] text-[13px]! justify-self-start tracking-[0px] py-[3px] px-[8px] normal-case whitespace-nowrap [font:500_10px/1.5_var(--text)]">Coming soon</span>
      <svg className="teaser self-center bg-none [background-position:0%_0%] [background-size:auto_auto] [background-repeat:repeat] [background-origin:padding-box] [background-clip:border-box] [background-attachment:scroll] bg-[#e8efdf] rounded-[10px] w-full" aria-hidden="true" viewBox="0 0 260 110" {...({ focusable: "false" } as any)}>
        <g fill="none" stroke="#27654e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 80 L50 65 85 50 120 35 120 93 245 93" />
          <path d="M15 80 L55 65 100 48 145 31 190 15" stroke="#bd673a" opacity=".6" />
        </g>
      </svg>
      <h2 className="tracking-tight mt-[9px] mr-0 mb-[16px] ml-0">What changes when losing means you cannot continue?</h2>
      <p className="text-[14px] my-[10px] mx-0 max-w-[78ch]">This experiment will follow players who risk losing everything each round. Once ruined, they cannot play again. The results will include those who lost, as well as those still playing.</p>
      <p className="small text-(--muted) text-[12px] my-[10px] mx-0 max-w-[78ch]">This is a preview. The interactive experiment is not available yet.</p>
      <div className="actions pt-[25px] [border-top:1px_solid_var(--line)]">
        <a className="button primary underline-offset-3 [@media(max-width:700px)]:text-center [@media(max-width:700px)]:w-full" href="/ergolabs/experiment-ahtml-50fe086c96acb043">Explore Experiment A</a>
        <a className="button underline-offset-3 [@media(max-width:700px)]:text-center [@media(max-width:700px)]:w-full" href="/#experiments">Back to experiments</a>
      </div>
    </section>
  );
}

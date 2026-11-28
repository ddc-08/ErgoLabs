import { createFileRoute } from "@tanstack/react-router";
import capturedCSS from "../styles/site.css?raw";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Explore chance and growth · ErgoLabs" },
      { name: "description", content: "Explore ergodicity economics through a reproducible coin-toss experiment. Compare one history, typical outcomes and expected wealth." },
      { property: "og:title", content: "Explore chance and growth · ErgoLabs" },
      { property: "og:description", content: "Explore ergodicity economics through a reproducible coin-toss experiment. Compare one history, typical outcomes and expected wealth." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  staticData: { importedDocument: { html: { "lang": "en" }, body: { "className": "page-index" } } },
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
          <ImportedHeaderAGoodAverageA />
          <section className="[scroll-margin-top:24px]" id="experiments" aria-labelledby="routeTitle">
            <h2 className="tracking-[-0.055em] mt-[9px] mr-0 mb-[16px] ml-0 max-w-[600px] text-balance [scroll-margin-top:24px]" id="routeTitle">Start with one game. Build the idea.</h2>
            <a className="featured-experiment [box-shadow:rgb(233,236,230)_0px_3px_0px] mt-[24px] underline-offset-3" href="/ergolabs/experiment-ahtml-50fe086c96acb043">
              <div>
                <span className="eyebrow text-(--green) uppercase">Experiment A · Start here</span>
                <h3 className="tracking-[-0.045em] my-[10px] mx-0 text-balance [scroll-margin-top:24px]">The multiplicative coin toss</h3>
                <p className="text-(--muted) text-[14px] max-w-[55ch]">Follow one player, compare 1,000 histories, and explain how rising expected wealth can coexist with likely losses.</p>
                <span className="card-link text-(--green) text-[12px] font-bold mt-[20px]">Play, predict and compare →</span>
              </div>
              <div className="route-map content-center [@media(max-width:600px)]:grid-cols-[1fr_1fr] [@media(max-width:700px)]:grid-cols-[1fr_1fr]" aria-hidden="true">
                <span className="text-(--green) [border-bottom:1px_solid_rgb(233,237,230)]">01 <b className="text-(--ink)">Your prediction</b></span>
                <span className="text-(--green) [border-bottom:1px_solid_rgb(233,237,230)]">02 <b className="text-(--ink)">One history</b></span>
                <span className="text-(--green) [border-bottom:1px_solid_rgb(233,237,230)]">03 <b className="text-(--ink)">The population</b></span>
                <span className="text-(--green) [border-bottom:0px]">04 <b className="text-(--ink)">What it means</b></span>
              </div>
            </a>
          </section>
          <section className="home-explainer [border-bottom:1px_solid_var(--line)] [border-top:1px_solid_var(--line)] [scroll-margin-top:24px]" aria-labelledby="whyTitle">
            <h2 className="tracking-[-0.055em] mt-[9px] mr-0 mb-[16px] ml-0 mt-[9px]! text-balance [scroll-margin-top:24px]" id="whyTitle">Why ergodicity?</h2>
            <div>
              <p className="text-[15px] max-w-[78ch]">You experience decisions in sequence: what happens today changes what you have tomorrow. A population average answers a different question.</p>
              <p className="text-[15px] max-w-[78ch]"><strong>Ergodicity asks when time averages and averages across possible outcomes agree for the same quantity.</strong> The coin toss makes that distinction concrete before we introduce the notation.</p>
              <a className="text-[12px] underline-offset-3" href="/ergolabs/bibliographyhtml-3408dc6a695866e9#introductoryReading">Read the introductory source →</a>
            </div>
          </section>
          <ImportedSectionPlannedTopics />
        </main>
        <footer className="text-(--muted) text-[11px] leading-[1.9] pt-[22px] [border-top:1px_solid_var(--line)]">ErgoLabs · Educational experiments · No investment recommendations<br /><a className="text-[11px] underline-offset-3" href="/">Home</a> · <a className="text-[11px] underline-offset-3" href="/ergolabs/bibliographyhtml-3408dc6a695866e9">Bibliography</a><p className="quiet-note text-(--muted) text-[10px] max-w-[78ch]">This website was developed with the aid of ChatGPT.</p></footer>
      </div>
    </>
  );
}

function ImportedHeaderAGoodAverageA() {
  return (
    <header className="home-hero items-center bg-none [background-position:0%_0%] [background-size:auto_auto] [background-repeat:repeat] [background-origin:padding-box] [background-clip:border-box] [background-attachment:scroll] bg-(--dark) isolate max-w-none relative">
      <div>
        <h1 className="tracking-[-0.055em] text-balance [scroll-margin-top:24px]">A good average.<br />A different story<br />for you?</h1>
        <p className="hero-purpose text-white leading-normal max-w-[40ch]">An interactive lesson for economics students: discover why rising expected wealth can coexist with losses for most players.</p>
        <p className="text-[#f1f6ef] max-w-[43ch]">Start with $100. A fair coin gives you <strong>50% more</strong> on heads or takes <strong>40% away</strong> on tails. Would you keep playing?</p>
        <p className="hero-motivation text-[#c1cdc5] max-w-[48ch]">When gains and losses compound, an average return can hide what happens to most people. Try the game, then see why.</p>
        <a className="button primary mt-[15px] underline-offset-3" href="/ergolabs/experiment-ahtml-50fe086c96acb043">Start the coin-toss experiment →</a>
        <p className="small text-[#b9c9bf] max-w-[43ch]">No sign-up. All calculations run in your browser.</p>
        <p className="small hero-prereq text-[#b9c9bf] max-w-[43ch]">Prerequisites: percentages and basic expected value. · <a className="font-semibold underline-offset-3" href="/ergolabs/lecturershtml-e57608457d66ce29">For lecturers →</a></p>
      </div>
      <div className="coin-example bg-none [background-position:0%_0%] [background-size:auto_auto] [background-repeat:repeat] [background-origin:padding-box] [background-clip:border-box] [background-attachment:scroll] bg-(--mint) rounded-[13px] [box-shadow:rgba(0,0,0,0.133)_0px_15px_40px] text-(--ink) [border:0px]" aria-label="Worked example: 100 dollars becomes 150 dollars after a win, then 90 dollars after a loss.">
        <p className="text-[#243a29] max-w-[43ch]">One win. One loss.</p>
        <div className="balance items-center gap-[12px] justify-between py-[12px] px-0 [border-top:1px_solid_rgba(39,72,52,0.15)]">
          <span className="text-[#41513b] [font:11px_var(--mono)]">Start</span>
          <strong className="tracking-tighter">$100</strong>
        </div>
        <div className="change text-[#225333] justify-between mt-0 mr-0 mb-0 ml-[8px] ml-[8px]! pt-[9px] pr-0 pb-[9px] pl-[14px] [border-left:1px_dashed_rgba(82,111,65,0.314)] [font:11px_var(--mono)]">Heads · × 1.5 <span>+50%</span></div>
        <div className="balance items-center gap-[12px] justify-between py-[12px] px-0 [border-top:1px_solid_rgba(39,72,52,0.15)]">
          <span className="text-[#41513b] [font:11px_var(--mono)]">After a win</span>
          <strong className="tracking-tighter">$150</strong>
        </div>
        <div className="change text-[#8c411d] justify-between mt-0 mr-0 mb-0 ml-[8px] ml-[8px]! pt-[9px] pr-0 pb-[9px] pl-[14px] [border-left:1px_dashed_rgba(82,111,65,0.314)] [font:11px_var(--mono)]">Tails · × 0.6 <span>−40%</span></div>
        <div className="balance items-center gap-[12px] justify-between py-[12px] px-0 [border-top:1px_solid_rgba(39,72,52,0.25)]">
          <span className="text-[#41513b] [font:11px_var(--mono)]">After a loss</span>
          <strong className="text-[#8c411d] tracking-tighter">$90</strong>
        </div>
        <p className="small text-[#43563d] max-w-[43ch]">The loss comes out of the larger balance.</p>
      </div>
    </header>
  );
}

function ImportedSectionPlannedTopics() {
  return (
    <section className="[scroll-margin-top:24px]" aria-labelledby="forthcomingTitle">
      <div className="section-heading items-baseline flex-wrap justify-between">
        <h2 className="tracking-[-0.055em] mt-[9px] mr-0 mb-[16px] ml-0 mb-0! text-balance [scroll-margin-top:24px]" id="forthcomingTitle">Continue experimenting</h2>
        <span className="small text-(--muted) tracking-[-0.02em]">D, E, F and G · Interactive simulations</span>
      </div>
      <p className="max-w-[78ch]">The next questions build on A. Explore the interactive experiments; F brings the route together. Experiment B remains a preview.</p>
      <ul className="planned-list bg-none [background-position:0%_0%] [background-size:auto_auto] [background-repeat:repeat] [background-origin:padding-box] [background-clip:border-box] [background-attachment:scroll] bg-white rounded-[11px] list-none mt-[20px] mr-0 mb-0 ml-0 overflow-hidden p-0 [border:1px_solid_var(--line)]">
        <li>
          <a className={"items-center gap-y-[6px] gap-x-[18px] underline-offset-3 [&:hover]:bg-none [&:hover]:[background-position:0%_0%] [&:hover]:[background-size:auto_auto] [&:hover]:[background-repeat:repeat] [&:hover]:[background-origin:padding-box] [&:hover]:[background-clip:border-box] [&:hover]:[background-attachment:scroll] [&:hover]:bg-[#fafff5]"} href="/ergolabs/experiment-bhtml-569739d817ec2099">
            <span className="text-(--green) [font:600_11px/1.6_var(--mono)]">B</span>
            <span className="tracking-[-0.02em] [font:500_16px/1.3_var(--text)]">Ruin over time</span>
            <span className="text-(--muted) text-[13px] [@media(max-width:700px)]:col-start-2">Learn why an absorbing loss changes every decision that follows.</span>
            <span className="pill forthcoming-label bg-none [background-position:0%_0%] [background-size:auto_auto] [background-repeat:repeat] [background-origin:padding-box] [background-clip:border-box] [background-attachment:scroll] bg-[#f2f4ed] border border-solid border-[#d5dfcd] rounded-[20px] text-[#526348] tracking-[0px] py-[3px] px-[8px] normal-case whitespace-nowrap [font:500_10px/1.5_var(--text)] [@media(max-width:700px)]:col-start-2 [@media(max-width:700px)]:justify-self-start">Coming soon</span>
          </a>
        </li>
        <li className="[border-top:1px_solid_var(--line)]">
          <a className={"items-center gap-y-[6px] gap-x-[18px] underline-offset-3 [&:hover]:bg-none [&:hover]:[background-position:0%_0%] [&:hover]:[background-size:auto_auto] [&:hover]:[background-repeat:repeat] [&:hover]:[background-origin:padding-box] [&:hover]:[background-clip:border-box] [&:hover]:[background-attachment:scroll] [&:hover]:bg-[#fafff5]"} href="/ergolabs/experiment-dhtml-213d4335fd470fc2">
            <span className="text-(--green) [font:600_11px/1.6_var(--mono)]">D</span>
            <span className="tracking-[-0.02em] [font:500_16px/1.3_var(--text)]">Partial exposure</span>
            <span className="text-(--muted) text-[13px] [@media(max-width:700px)]:col-start-2">Compare how much to risk for different growth objectives.</span>
            <span className="pill forthcoming-label bg-none [background-position:0%_0%] [background-size:auto_auto] [background-repeat:repeat] [background-origin:padding-box] [background-clip:border-box] [background-attachment:scroll] bg-[#f2f4ed] border border-solid border-[#d5dfcd] rounded-[20px] text-[#526348] tracking-[0px] py-[3px] px-[8px] normal-case whitespace-nowrap [font:500_10px/1.5_var(--text)] [@media(max-width:700px)]:col-start-2 [@media(max-width:700px)]:justify-self-start">Start experiment →</span>
          </a>
        </li>
        <li className="[border-top:1px_solid_var(--line)]">
          <a className={"items-center gap-y-[6px] gap-x-[18px] underline-offset-3 [&:hover]:bg-none [&:hover]:[background-position:0%_0%] [&:hover]:[background-size:auto_auto] [&:hover]:[background-repeat:repeat] [&:hover]:[background-origin:padding-box] [&:hover]:[background-clip:border-box] [&:hover]:[background-attachment:scroll] [&:hover]:bg-[#fafff5]"} href="/ergolabs/experiment-ghtml-ce86c34cb1abc59a">
            <span className="text-(--green) [font:600_11px/1.6_var(--mono)]">G</span>
            <span className="tracking-[-0.02em] [font:500_16px/1.3_var(--text)]">Pooling and shared risks</span>
            <span className="text-(--muted) text-[13px] [@media(max-width:700px)]:col-start-2">See why pooling can help—and why shared losses limit the benefit.</span>
            <span className="pill forthcoming-label bg-none [background-position:0%_0%] [background-size:auto_auto] [background-repeat:repeat] [background-origin:padding-box] [background-clip:border-box] [background-attachment:scroll] bg-[#f2f4ed] border border-solid border-[#d5dfcd] rounded-[20px] text-[#526348] tracking-[0px] py-[3px] px-[8px] normal-case whitespace-nowrap [font:500_10px/1.5_var(--text)] [@media(max-width:700px)]:col-start-2 [@media(max-width:700px)]:justify-self-start">Start experiment →</span>
          </a>
        </li>
        <li className="[border-top:1px_solid_var(--line)]">
          <a className={"items-center gap-y-[6px] gap-x-[18px] underline-offset-3 [&:hover]:bg-none [&:hover]:[background-position:0%_0%] [&:hover]:[background-size:auto_auto] [&:hover]:[background-repeat:repeat] [&:hover]:[background-origin:padding-box] [&:hover]:[background-clip:border-box] [&:hover]:[background-attachment:scroll] [&:hover]:bg-[#fafff5]"} href="/ergolabs/experiment-ehtml-10836aea884cd575">
            <span className="text-(--green) [font:600_11px/1.6_var(--mono)]">E</span>
            <span className="tracking-[-0.02em] [font:500_16px/1.3_var(--text)]">Insurance</span>
            <span className="text-(--muted) text-[13px] [@media(max-width:700px)]:col-start-2">Compare the cost of protection with the losses it prevents.</span>
            <span className="pill forthcoming-label bg-none [background-position:0%_0%] [background-size:auto_auto] [background-repeat:repeat] [background-origin:padding-box] [background-clip:border-box] [background-attachment:scroll] bg-[#f2f4ed] border border-solid border-[#d5dfcd] rounded-[20px] text-[#526348] tracking-[0px] py-[3px] px-[8px] normal-case whitespace-nowrap [font:500_10px/1.5_var(--text)] [@media(max-width:700px)]:col-start-2 [@media(max-width:700px)]:justify-self-start">Start experiment →</span>
          </a>
        </li>
        <li className="[border-top:1px_solid_var(--line)]">
          <a className={"items-center gap-y-[6px] gap-x-[18px] underline-offset-3 [&:hover]:bg-none [&:hover]:[background-position:0%_0%] [&:hover]:[background-size:auto_auto] [&:hover]:[background-repeat:repeat] [&:hover]:[background-origin:padding-box] [&:hover]:[background-clip:border-box] [&:hover]:[background-attachment:scroll] [&:hover]:bg-[#fafff5]"} href="/ergolabs/experiment-fhtml-71a5468a7a1d01d2">
            <span className="text-(--green) [font:600_11px/1.6_var(--mono)]">F</span>
            <span className="tracking-[-0.02em] [font:500_16px/1.3_var(--text)]">The St Petersburg paradox</span>
            <span className="text-(--muted) text-[13px] [@media(max-width:700px)]:col-start-2">Bring the ideas together: what can an infinite average tell a player with finite wealth?</span>
            <span className="pill forthcoming-label bg-none [background-position:0%_0%] [background-size:auto_auto] [background-repeat:repeat] [background-origin:padding-box] [background-clip:border-box] [background-attachment:scroll] bg-[#f2f4ed] border border-solid border-[#d5dfcd] rounded-[20px] text-[#526348] tracking-[0px] py-[3px] px-[8px] normal-case whitespace-nowrap [font:500_10px/1.5_var(--text)] [@media(max-width:700px)]:col-start-2 [@media(max-width:700px)]:justify-self-start">Start experiment →</span>
          </a>
        </li>
      </ul>
    </section>
  );
}

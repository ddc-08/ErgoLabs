import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import * as S from "@/lib/ergo-sim";
import capturedCSS from "../styles/pages/ergolabs.experiment-ahtml-50fe086c96acb043.css?raw";

const DESCRIPTION = "Play a reproducible multiplicative coin toss: follow one player, compare 1,000 players and see why expected wealth and typical outcomes diverge.";

export const Route = createFileRoute("/ergolabs_/experiment-ahtml-50fe086c96acb043")({
  head: () => ({
    meta: [
      { title: "A · The multiplicative coin toss · ErgoLabs" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "A · The multiplicative coin toss · ErgoLabs" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  staticData: { importedDocument: { html: { "lang": "en" }, body: { "className": "page-experiment-a" } } },
  component: Index,
});

function Index() {
  useEffect(() => {
    const controller = new AbortController();
    mountExperiment(controller.signal);
    return () => controller.abort();
  }, []);
  return (
    <>
      <style>{capturedCSS}</style>
      <a className="skip-main left-[18px] absolute top-0 z-200" href="#content">Skip to main content</a>
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
        <main id="content">
<div className="journey-bar"><a href="/#experiments">← Experiments</a><button id="skipResults">Skip to results →</button></div>
<nav className="journey-nav" aria-label="Experiment steps"><button data-step="1" aria-current="false"><span>01</span> The game</button><button data-step="2" aria-current="false"><span>02</span> Predict</button><button data-step="3" aria-current="false"><span>03</span> One player</button><button data-step="4" aria-current="false"><span>04</span> Compare</button><button data-step="5" aria-current="false"><span>05</span> Explain</button><button data-step="6" aria-current="false"><span>06</span> Results</button></nav>
<p id="stepStatus" className="small" role="status"></p>
{" "}<section id="intro" className="stage" aria-labelledby="introTitle"><div className="eyebrow">Experiment A · Start here</div>
<h1 id="introTitle" tabIndex={-1}>Would you play<br />100 times?</h1><p className="lead">You start with $100. Each toss changes the money you have <em>at that moment</em>.</p>
<div className="rules"><div className="rule"><strong>$100</strong><span>Starting balance</span></div>
<div className="rule"><strong>+50%</strong><span>Heads · 50% chance</span></div>
<div className="rule"><strong>−40%</strong><span>Tails · 50% chance</span></div>
<div className="rule"><strong>100</strong><span>Independent rounds</span></div>
</div>
<p>The expected return is +5% for one toss. But a win followed by a loss takes $100 → $150 → $90. Both facts matter.</p>
<div className="prompt"><h2>Would you take the offer?</h2>
<p>There is no single right choice. Keep your objective in mind as you explore.</p>
<div className="actions" role="group" aria-label="Your initial choice"><button className="opening" data-answer="Yes" aria-pressed="false">Yes</button><button className="opening" data-answer="No" aria-pressed="false">No</button><button className="opening" data-answer="It depends" aria-pressed="false">It depends</button></div>
<p id="openingStatus" className="small" aria-live="polite">Your choice stays in this page only.</p>
</div>
<div className="stage-nav"><button data-step="2" className="primary">Make a prediction →</button></div>
<details><summary>The model’s assumptions</summary><p>All current wealth is exposed. Tosses are fair and independent across players and rounds. There is no income, spending, borrowing, pooling or early stopping. Balances can include fractions of a cent.</p>
</details>
</section>
{" "}<section id="rules" className="stage" hidden aria-labelledby="predictionTitle"><h2 id="predictionTitle" tabIndex={-1}>Where will most players finish?</h2>
<p className="lead">Imagine 1,000 people each playing the same game for 100 rounds. Every person gets their own independent tosses.</p>
<div className="prompt"><p>Will most finish above or below their starting $100?</p>
<div className="actions" role="group" aria-label="Your prediction"><button className="guess" data-answer="above" aria-pressed="false">Above $100</button><button className="guess" data-answer="below" aria-pressed="false">Below $100</button><button className="guess" data-answer="unsure" aria-pressed="false">I’m not sure</button></div>
<p id="predictionStatus" className="small" role="status">Choose a prediction, or go straight to one player.</p>
</div>
<div className="stage-nav"><button data-step="3" className="primary">Follow one player →</button></div>
</section>
{" "}<section id="one" className="stage" hidden aria-labelledby="oneHeading"><h2 id="oneHeading" tabIndex={-1}>First, follow one person.</h2>
<p>Each point is the balance after another toss. This player keeps playing, even when very little remains.</p>
<div className="panel"><div className="charthead"><h3 id="oneTitle">One player over 100 rounds</h3>
<div className="chart-controls"><div className="scale-group" role="group" aria-label="one chart scale"><button type="button" data-chart="one" data-scale="log" aria-pressed="true">Log</button><button type="button" data-chart="one" data-scale="linear" aria-pressed="false">Linear</button></div>
<details className="chart-help"><summary aria-label="About the one chart scale">?</summary><p>Log: equal spacing shows equal ratios, like $1 → $10 → $100. Linear: equal spacing shows equal dollar changes. Use the round slider for exact amounts.</p>
</details>
</div>
</div>
<p className="scale-hint">Use Log to compare proportional growth; use Linear to compare dollar differences.</p>
<svg id="oneChart" className="chart" role="img" aria-labelledby="oneTitle" aria-describedby="oneTakeaway" viewBox="0 0 860 320"></svg>
<p className="chart-takeaway" id="oneTakeaway">This is one player’s history. It does not show what happened to most players.</p>
<p id="oneResult" className="readout" aria-live="polite"></p>
<div className="inspect"><label htmlFor="oneRound">Inspect round <output id="oneRoundLabel">100</output></label><input id="oneRound" type="range" min="0" max="100" defaultValue="100" /><p id="oneAtRound" className="small" aria-live="polite"></p>
</div>
<div className="actions"><button id="nextPlayer">Show another player</button><label htmlFor="player">Player</label><input id="player" name="player" type="number" min="1" max="1000" defaultValue="1" inputMode="numeric" /><button id="selectPlayer">Show player</button></div>
<p id="playerStatus" role="status" className="small"></p>
</div>
<div className="stage-nav"><button data-step="4" className="primary">Compare all 1,000 players →</button></div>
</section>
{" "}<section id="many" className="stage" hidden aria-labelledby="manyHeading"><h2 id="manyHeading" tabIndex={-1}>Most players and the average tell different stories.</h2>
<p>The highlighted player is the same person you just followed. The mean and median use all 1,000 histories.</p>
<div className="panel"><div className="charthead"><h3 id="manyTitle">The cohort, round by round</h3>
<div className="chart-controls"><div className="scale-group" role="group" aria-label="many chart scale"><button type="button" data-chart="many" data-scale="log" aria-pressed="true">Log</button><button type="button" data-chart="many" data-scale="linear" aria-pressed="false">Linear</button></div>
<details className="chart-help"><summary aria-label="About the many chart scale">?</summary><p>Log: equal spacing shows equal ratios, like $1 → $10 → $100. Linear: equal spacing shows equal dollar changes. Use the round slider for exact amounts.</p>
</details>
</div>
</div>
<p className="scale-hint">Use Log to compare proportional growth; use Linear to compare dollar differences.</p>
<svg id="manyChart" className="chart" role="img" aria-labelledby="manyTitle" aria-describedby="manyTakeaway" viewBox="0 0 860 320"></svg>
<p className="chart-takeaway" id="manyTakeaway">A high average can coexist with a low typical balance. The median at each round can belong to different people.</p>
<div className="legend"><span className="key player-key">Selected player</span><span className="key median-key">Sample median</span><span className="key mean-key">Sample average</span><span className="key expected-key">Theoretical expectation</span><span className="key examples-key">10 example paths</span></div>
<p className="small">Median = the middle two balances averaged. Sample average = total wealth ÷ 1,000. The dashed expectation weights every possible outcome by its probability.</p>
<div className="stats"><div className="stat"><span>Sample median</span><strong id="median"></strong></div>
<div className="stat"><span>Sample average</span><strong id="mean"></strong></div>
<div className="stat"><span>Below the starting $100</span><strong id="loss"></strong></div>
</div>
<p className="callout"><strong>Theoretical expected wealth: $13,150.13 at round 100.</strong><br />Rare, very large balances pull it up. This sample may miss them—or contain unusually large ones. A different sample average does not itself mean the simulator is wrong.</p>
<div className="inspect"><label htmlFor="manyRound">Inspect round <output id="manyRoundLabel">100</output></label><input id="manyRound" type="range" min="0" max="100" defaultValue="100" /><p id="manyAtRound" aria-live="polite" className="small"></p>
</div>
<details id="dataDetails"><summary>Read the chart as a data table</summary><div className="scrolltable" tabIndex={0} role="region" aria-label="Chart data"><table><caption>All 101 rounds of the main cohort</caption><thead><tr><th scope="col">Round</th><th scope="col">Selected player</th><th scope="col">Sample median</th><th scope="col">Sample average</th><th scope="col">Expectation</th></tr>
</thead>
<tbody id="chartData"></tbody>
</table>
</div>
</details>
<details><summary>Reproduce or change the sample</summary><p className="small">The seed determines every toss. Reusing the same seed reproduces the original website’s 1,000 × 100 simulation. Changing it resets the selected player to 1.</p>
<form id="seedForm" className="actions"><label htmlFor="seed">Seed</label><input id="seed" name="seed" type="number" min="0" max="4294967295" step="1" required inputMode="numeric" autoComplete="off" /><button type="submit">Apply seed</button><button type="button" id="newRun">New random seed</button></form>
<p id="seedStatus" className="small" role="status"></p>
</details>
<p id="runInfo" className="small"></p>
</div>
<div className="stage-nav"><button data-step="5" className="primary">Why do the results differ? →</button></div>
</section>
{" "}<section id="explanation" className="stage" hidden aria-labelledby="explanationHeading"><h2 id="explanationHeading" tabIndex={-1}>The balance changes. So does the amount at risk.</h2>
<p className="lead">A 50% gain and a 40% loss do not cancel out: 1.5 × 0.6 = 0.9. Repeat that pair 50 times and $100 becomes about $0.52.</p>
<p id="predictionRecap" className="callout" aria-live="polite"></p>
<p>Expected wealth grows 5% per round because rare, very large balances pull the average up. But each player’s wealth compounds: a win followed by a loss multiplies it by 0.9. The typical player’s growth rate is about −5.13% per round, which is why the median falls while expected wealth rises.</p>
<details id="mathDetails" className="math-details"><summary>Explore the mathematics</summary><p className="notation-guide">X is the multiplier for one round: 1.5 for heads or 0.6 for tails. W₀ is starting wealth; Wₜ is wealth after t rounds. E[ ] means expected value, ln is the natural logarithm, and exp is its inverse.</p>
<div className="walk"> <div className="step"><h3>Calculate expected wealth</h3>
<div className="math">E[X] = ½(1.5) + ½(0.6) = 1.05<br />E[Wₜ] = $100 × 1.05ᵗ</div>
<details><summary>About this calculation</summary><p>Each round has an expected multiplier of 1.05. Because tosses are independent, expected wealth after t rounds is $100 × 1.05ᵗ.</p>
<p>Expected wealth rises by 5% per round. This does not say what most individuals receive.</p>
</details>
</div>
{" "}<div className="step"><h3>Calculate one player’s wealth over successive rounds</h3>
<div className="math">Wₜ / W₀ = X₁ × X₂ × … × Xₜ<br />One win and one loss: 1.5 × 0.6 = 0.9</div>
<details><summary>About this calculation</summary><p>One win and one loss give 1.5 × 0.6 = 0.9: a 10% loss over two rounds, in either order.</p>
</details>
</div>
{" "}<div className="step"><h3>Logs turn the product into a sum</h3>
<div className="math">ln(Wₜ / W₀) = ln X₁ + … + ln Xₜ<br />gₜ = ln(Wₜ / W₀) / t</div>
<p>The logarithm turns multiplication into addition. Divide the total log change by the number of rounds, t, to find gₜ, the average log growth per round. This is not an average of the player’s dollar balances.</p>
</div>
{" "}<div className="step"><h3>Find the long-run average log growth</h3>
<div className="math">gₜ → g = E[ln X] almost surely<br />g = ½ ln(1.5) + ½ ln(0.6)<br />g ≈ −0.052680 per round</div>
<details><summary>About this calculation</summary><p>With independent tosses and the same probabilities each round, the average log multiplier approaches its expected value as play continues. This is an application of the law of large numbers.</p>
<p>Logarithms let us calculate growth when wealth changes through multiplication. Their use here does not assume anything about the player’s preferences.</p>
</details>
</div>
{" "}<div className="step"><h3>Express the growth rate as a percentage</h3>
<div className="math">exp(g) = √0.9 ≈ 0.948683<br />exp(g) − 1 ≈ −5.13% per round</div>
<details><summary>About this calculation</summary><p>A constant loss of about 5.13% per round would give the same long-run compound growth rate. The game itself still gives +50% or −40% each round.</p>
</details>
</div>
{" "}</div>
{" "}<div className="math-comparison"><h3>Why the two growth measures differ</h3>
<div className="math">ln(E[X]) = ln(1.05) ≈ +0.048790<br />E[ln X] ≈ −0.052680<br />50 wins and 50 losses: $100 × 0.9⁵⁰ ≈ $0.52</div>
{" "}<details> <summary>Why these averages differ</summary> <p>The order of calculation matters: ln(E[X]) takes the logarithm after averaging, while E[ln X] averages the logarithms. Here, E[ln X] &lt; ln(E[X]). This follows from the downward curvature of the logarithm, expressed by Jensen’s inequality.</p>
{" "}<p>50 heads and 50 tails leave about $0.52. The curve $100 × exp(gt) follows the constant growth rate g. It does not predict an individual player’s wealth or give the exact median at every round.</p>
{" "}</details>
{" "}</div>
<section className="ergodicity-connection" aria-labelledby="connectionTitle"><h3 id="connectionTitle">How this connects to ergodicity</h3>
<p>For each round, take the logarithm of the wealth multiplier. Its average over many rounds approaches its expected value, −0.052680. This is where averaging over time agrees with averaging across possible outcomes.</p>
{" "}<p>Wealth itself is not stationary: its possible values and their probabilities change over time. The result above applies to log changes, not directly to wealth levels.</p>
{" "}<p>Adding more independent players helps estimate expected wealth at round 100. Letting one player continue for more rounds measures growth over time. These are different calculations.</p>
{" "}</section>
</details>
<div className="stage-nav"><button data-step="6" className="primary">Return to your prediction →</button></div>
</section>
{" "}<section id="results" className="stage" hidden aria-labelledby="resultsHeading"><h2 id="resultsHeading" tabIndex={-1}>A positive average return isn’t the whole answer.</h2>
<p id="personalRecap" className="callout"></p>
<div className="results-grid"><div><span>Theoretical expectation</span><strong>$13,150.13</strong><p>The probability-weighted average after 100 rounds.</p>
</div>
<div><span>Theoretical median</span><strong>$0.52</strong><p>The middle outcome after 100 rounds—not a promised result.</p>
</div>
<div><span>Chance of finishing below $100</span><strong>86.44%</strong><p>For each player under these fixed rules.</p>
</div>
</div>
<p id="resultSample" className="readout"></p>
<p>The long-run compound rate is <strong>−5.13% per round</strong>. That is a limit for repeated play, not the return of every player after 100 tosses.</p>
<h3>What this says about ergodicity</h3>
<p>Ergodicity concerns whether averages over time and across possible outcomes agree for the same quantity. Here, the average <em>log change</em> along a history approaches its expected value. Average wealth across players does not describe one person’s compound growth.</p>
<p>So, would you play? Your answer can depend on your objective, time horizon and exposure. A high expected balance alone does not settle it.</p>
<form id="quizForm" className="check" aria-labelledby="quizTitle"> <h2 id="quizTitle">Check your understanding</h2>
{" "}<p>Choose one answer for each question, then check your answers for explanations. You can change your answers and try again.</p>
{" "}<p className="small">Questions 1–5 are based on the main experiment above; question 6 applies the idea to a new game. Answers are checked in your browser and are not saved or sent anywhere.</p>
{" "}<div id="quizResult" className="quiz-result" role="status" tabIndex={-1} hidden></div>
{" "}<fieldset className="quiz-question" data-correct="b" data-explanation="The proportion of heads over a long sequence approaches the probability of heads on each toss: 50%. A finite sequence need not contain equal numbers of heads and tails." aria-describedby="q1Feedback"> <legend>1. When we toss a fair coin independently many times, which result illustrates ergodicity?</legend> <label className="quiz-option"><input type="radio" name="q1" defaultValue="a" required /><span>The proportion of heads becomes exactly 50% after a fixed number of tosses.</span></label> <label className="quiz-option"><input type="radio" name="q1" defaultValue="b" required /><span>The proportion of heads approaches 50% as the number of tosses grows.</span></label> <label className="quiz-option"><input type="radio" name="q1" defaultValue="c" required /><span>Heads and tails must alternate.</span></label> <p id="q1Feedback" className="quiz-feedback" hidden></p>
{" "}</fieldset>
{" "}<fieldset className="quiz-question" data-correct="c" data-explanation="Returns multiply current wealth: $100 × 1.5 × 0.6 = $90. Reversing the order gives the same result in the original game without stopping." aria-describedby="q2Feedback"> <legend>2. Starting with $100, one round gains 50% and another loses 40%. How much wealth remains?</legend> <label className="quiz-option"><input type="radio" name="q2" defaultValue="a" required /><span>$110</span></label> <label className="quiz-option"><input type="radio" name="q2" defaultValue="b" required /><span>$100</span></label> <label className="quiz-option"><input type="radio" name="q2" defaultValue="c" required /><span>$90</span></label> <p id="q2Feedback" className="quiz-feedback" hidden></p>
{" "}</fieldset>
{" "}<fieldset className="quiz-question" data-correct="a" data-explanation="Expected wealth weights every possible outcome by its probability. Rare, very large fortunes raise it. Each player’s gains and losses compound, and the average log growth is negative, so a high expected wealth can coexist with likely losses." aria-describedby="q3Feedback"> <legend>3. Why can expected wealth rise while most players finish below their starting wealth?</legend> <label className="quiz-option"><input type="radio" name="q3" defaultValue="a" required /><span>Rare, very large fortunes raise the average, while each player’s gains and losses compound.</span></label> <label className="quiz-option"><input type="radio" name="q3" defaultValue="b" required /><span>A positive expected return guarantees that every player eventually gains.</span></label> <label className="quiz-option"><input type="radio" name="q3" defaultValue="c" required /><span>Expected wealth excludes players who lose money.</span></label> <p id="q3Feedback" className="quiz-feedback" hidden></p>
{" "}</fieldset>
{" "}<fieldset className="quiz-question" data-correct="c" data-explanation="At each round, the median is the average of the two middle wealth values. Different players can occupy those positions, so the line does not follow one person through time." aria-describedby="q4Feedback"> <legend>4. What does the median line on the population graph represent?</legend> <label className="quiz-option"><input type="radio" name="q4" defaultValue="a" required /><span>The entire history of the player who finishes in the middle.</span></label> <label className="quiz-option"><input type="radio" name="q4" defaultValue="b" required /><span>The average of the highlighted player’s past wealth levels.</span></label> <label className="quiz-option"><input type="radio" name="q4" defaultValue="c" required /><span>The average of the two middle wealth values among the 1,000 players at each round.</span></label> <p id="q4Feedback" className="quiz-feedback" hidden></p>
{" "}</fieldset>
{" "}<fieldset className="quiz-question" data-correct="b" data-explanation="Each round has the same two possible log changes, with equal probabilities and independent tosses. Their average over time approaches −0.052680. This result concerns log changes; wealth levels have a distribution that changes over time." aria-describedby="q5Feedback"> <legend>5. In this game, which quantity has a time average that approaches its expected value?</legend> <label className="quiz-option"><input type="radio" name="q5" defaultValue="a" required /><span>The amount of wealth a player has after each round.</span></label> <label className="quiz-option"><input type="radio" name="q5" defaultValue="b" required /><span>The logarithm of the wealth multiplier each round.</span></label> <label className="quiz-option"><input type="radio" name="q5" defaultValue="c" required /><span>The population’s median wealth after each round.</span></label> <p id="q5Feedback" className="quiz-feedback" hidden></p>
{" "}</fieldset>
{" "}<fieldset className="quiz-question" data-correct="a" data-explanation="The expected multiplier is ½(1.2) + ½(0.8) = 1, so expected wealth is unchanged. But for one player, a win and a loss give 1.2 × 0.8 = 0.96 in either order: a 4% loss over two rounds. Average log growth is ½ ln(1.2) + ½ ln(0.8) ≈ −0.0204 per round, so a typical player’s balance shrinks even though expected wealth stays the same." aria-describedby="q6Feedback"> <legend>6. A fair coin increases your balance by 20% or reduces it by 20%. Does unchanged expected wealth mean repeated play preserves an individual’s balance?</legend> <label className="quiz-option"><input type="radio" name="q6" defaultValue="a" required /><span>No. The expected multiplier is 1, but a win followed by a loss multiplies a balance by 1.2 × 0.8 = 0.96.</span></label> <label className="quiz-option"><input type="radio" name="q6" defaultValue="b" required /><span>Yes. An expected multiplier of 1 means every player’s balance stays the same.</span></label> <label className="quiz-option"><input type="radio" name="q6" defaultValue="c" required /><span>Yes. Equal gains and losses cancel out, so a win and a loss return the starting balance.</span></label> <p id="q6Feedback" className="quiz-feedback" hidden></p>
{" "}</fieldset>
{" "}<div className="actions"><button type="submit" className="primary">Check answers</button><button type="reset">Start again</button></div>
{" "}</form>
<div className="actions"><button data-step="4">Review this sample</button><button data-step="5" id="seeMaths">See the maths</button><a className="button" href="#extension" id="extensionLink">Try the 10-round stopping rule ↓</a></div>
{" "}<section className="explorer" aria-labelledby="exploreTitle"><h2 id="exploreTitle">More people or more time?</h2>
<p>Optional exploration: change one at a time. These are nested subsets and prefixes of the same 1,000 histories, so earlier tosses stay fixed. Your prediction above still refers to 1,000 players over 100 rounds.</p>
<div className="actions"><label htmlFor="exploreN">Players</label><select id="exploreN" name="players" defaultValue="1000"><option>1</option><option>10</option><option>100</option><option>1000</option></select><label htmlFor="exploreT">Rounds</label><select id="exploreT" name="rounds" defaultValue="100"><option>10</option><option>50</option><option>100</option></select></div>
<div className="panel"><div className="charthead"><h3 id="exploreChartTitle">Hold the histories fixed</h3>
<div className="chart-controls"><div className="scale-group" role="group" aria-label="explore chart scale"><button type="button" data-chart="explore" data-scale="log" aria-pressed="true">Log</button><button type="button" data-chart="explore" data-scale="linear" aria-pressed="false">Linear</button></div>
<details className="chart-help"><summary aria-label="About the explore chart scale">?</summary><p>Log: equal spacing shows equal ratios, like $1 → $10 → $100. Linear: equal spacing shows equal dollar changes. Use the round slider for exact amounts.</p>
</details>
</div>
</div>
<p className="scale-hint">Use Log to compare proportional growth; use Linear to compare dollar differences.</p>
<svg id="exploreChart" className="chart" role="img" aria-labelledby="exploreChartTitle" aria-describedby="exploreTakeaway" viewBox="0 0 860 320"></svg>
<p className="chart-takeaway" id="exploreTakeaway">More players changes the sample statistics. More rounds extends each history. Neither control changes the rules.</p>
<div className="legend"><span className="key player-key">Player 1</span><span className="key median-key">Sample median</span><span className="key mean-key">Sample average</span><span className="key expected-key">Theoretical expectation</span></div>
<p id="exploreReadout" className="readout" aria-live="polite"></p>
<p id="growthReadout" className="small"></p>
</div>
<p className="small">The benchmark is expected log growth: −0.052680 per round (equivalent compound rate −5.13%). A larger finite sample need not move its average closer to expectation on every increase.</p>
</section>
{" "}<section id="extension" className="extension-panel" aria-labelledby="extensionTitle"><div className="section-heading"><h2 id="extensionTitle">What if you have to stop?</h2>
<span className="pill">Optional · 10 rounds</span></div>
<p>This separate demonstration uses just five heads and five tails. With continued play, either order finishes at $59.05.</p>
<div className="new-rule"><h3>Now add a rule</h3>
<p><strong>Stop permanently after a toss takes your balance below $10.</strong> Keep the remaining cash. This is an exit threshold, not losing everything.</p>
</div>
<div className="charthead"><h3 id="stopTitle">Same tosses. Different order.</h3>
<div className="chart-controls"><div className="scale-group" role="group" aria-label="stop chart scale"><button type="button" data-chart="stop" data-scale="log" aria-pressed="true">Log</button><button type="button" data-chart="stop" data-scale="linear" aria-pressed="false">Linear</button></div>
<details className="chart-help"><summary aria-label="About the stop chart scale">?</summary><p>Log: equal spacing shows equal ratios, like $1 → $10 → $100. Linear: equal spacing shows equal dollar changes. Use the round slider for exact amounts.</p>
</details>
</div>
</div>
<p className="scale-hint">Use Log to compare proportional growth; use Linear to compare dollar differences.</p>
<svg id="stopChart" className="chart" role="img" aria-labelledby="stopTitle" aria-describedby="stopTakeaway" viewBox="0 0 860 320"></svg>
<p className="chart-takeaway" id="stopTakeaway">With a stopping rule, early losses can remove the opportunity to benefit from later wins.</p>
<div className="legend"><span className="key player-key">Heads first · stops if below $10</span><span className="key median-key">Tails first · stops if below $10</span><span className="key expected-key">Tails first · keeps playing</span></div>
<div className="scrolltable"><table><caption>10-round stopping comparison</caption><thead><tr><th scope="col">Sequence</th><th scope="col">Continued play</th><th scope="col">Stop below $10</th></tr>
</thead>
<tbody><tr><th scope="row">HHHHHTTTTT</th><td>$59.05</td><td>$59.05 · never exits</td></tr>
<tr><th scope="row">TTTTTHHHHH</th><td>$59.05</td><td>$7.78 · exits at round 5</td></tr>
</tbody>
</table>
</div>
<p>In the main game, a finite number of tosses can make wealth very small but cannot take it to zero. A true absorbing zero-wealth state is a different model, planned for Experiment B.</p>
<p>This illustration draws on Taleb’s discussion of ruin. It does not model a group’s survival or establish the formal conditions for ergodicity.</p>
<a href="/ergolabs/experiment-bhtml-569739d817ec2099">Read the preview: ruin over time →</a></section>
<div className="stage-nav"><a className="button primary" href="/#experiments">See the learning roadmap →</a><a href="/ergolabs/bibliographyhtml-3408dc6a695866e9">Sources &amp; model assumptions</a></div>
</section>
<noscript><p className="callout">Enable JavaScript to run the simulation. The <a href="/ergolabs/bibliographyhtml-3408dc6a695866e9">sources and model assumptions</a> remain available.</p>
</noscript>

        </main>
        <footer className="text-(--muted) leading-[1.9] pt-[22px] [border-top:1px_solid_var(--line)]">ErgoLabs · Educational experiments · No investment recommendations<br /><a href="/">Home</a> · <a href="/ergolabs/bibliographyhtml-3408dc6a695866e9">Bibliography</a><p className="quiet-note">This website was developed with the aid of ChatGPT.</p></footer>
      </div>
    </>
  );
}

/* Ported from the source site's experiment-a.js; drives the static markup above by element id. */
/* eslint-disable @typescript-eslint/no-explicit-any */
function mountExperiment(signal: AbortSignal) {
  const $ = (id: string) => document.getElementById(id) as any;
  const on = (el: EventTarget | null, type: string, fn: (e: any) => void) => el?.addEventListener(type, fn, { signal });
  const money = (v: number) =>
    v > 0 && v < 0.01 ? "$" + v.toPrecision(3) : new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(v);
  const pct = (v: number) => new Intl.NumberFormat("en-US", { style: "percent", maximumFractionDigits: 2 }).format(v);
  const stages = ["intro", "rules", "one", "many", "explanation", "results"];
  const names = ["The game", "Your prediction", "One player", "Compare players", "The explanation", "Results and exploration"];
  let seed = 42, selected = 0, current = 1;
  let runReported = false;
  let paths: number[][] = [];
  let stats: ReturnType<typeof S.summarize> = { means: [], medians: [], loss: 0 };
  let choice: string | null = null, prediction: string | null = null;
  const scales: Record<string, string> = { one: "log", many: "log", explore: "log", stop: "log" };
  const params = new URLSearchParams(location.search), initialSeed = params.get("seed");
  if (initialSeed !== null && /^\d+$/.test(initialSeed) && Number(initialSeed) <= 4294967295) seed = Number(initialSeed);
  if (/^\d+$/.test(params.get("player") || "")) selected = Math.max(0, Math.min(999, Number(params.get("player")) - 1));
  for (const key of Object.keys(scales)) if (params.get(key) === "linear") scales[key] = "linear";
  for (const [id, key, allowed] of [["exploreN", "n", ["1", "10", "100", "1000"]], ["exploreT", "t", ["10", "50", "100"]]] as const)
    if ((allowed as readonly string[]).includes(params.get(key) || "")) $(id).value = params.get(key);
  function syncURL() {
    const u = new URL(location.href);
    u.searchParams.set("seed", String(seed));
    u.searchParams.set("player", String(selected + 1));
    for (const k of Object.keys(scales)) scales[k] === "linear" ? u.searchParams.set(k, "linear") : u.searchParams.delete(k);
    u.searchParams.set("n", $("exploreN").value);
    u.searchParams.set("t", $("exploreT").value);
    try { history.replaceState(history.state, "", u); } catch { /* ignore */ }
  }
  function generate(v: number) { seed = v; runReported = false; paths = S.generate(seed); stats = S.summarize(paths); $("seed").value = seed; $("player").value = selected + 1; syncURL(); }
  function freshSeed() { if (typeof globalThis.crypto?.getRandomValues === "function") return crypto.getRandomValues(new Uint32Array(1))[0]!; return Date.now() >>> 0; }
  type Series = { values: number[]; color: string; width?: number; dash?: boolean; example?: boolean };
  function chart(key: string, series: Series[], { rounds = 100, threshold = 100, round = null as number | null } = {}) {
    const svg = $(key + "Chart"); if (svg.closest("[hidden]")) return;
    const W = Math.max(280, Math.round(svg.parentElement.clientWidth - 2 * parseFloat(getComputedStyle(svg.parentElement).paddingLeft))), H = 320, L = W < 500 ? 61 : 78, R = 16, top = 18, bottom = 46;
    const log = scales[key] === "log"; let lo = threshold, hi = threshold;
    for (const s of series) for (const v of s.values) { lo = Math.min(lo, v); hi = Math.max(hi, v); }
    const min = log ? Math.floor(Math.log10(lo)) : 0; let max = log ? Math.ceil(Math.log10(hi)) : hi * 1.06; if (max <= min) max = min + 1;
    const x = (t: number) => L + (t / rounds) * (W - L - R), y = (v: number) => top + ((max - (log ? Math.log10(v) : v)) / (max - min)) * (H - top - bottom);
    const number = (v: number) => v >= 1e6 ? "$" + (v / 1e6).toFixed(1) + "m" : v >= 1000 ? "$" + (v / 1000).toFixed(1) + "k" : v < 0.01 ? "$" + v.toExponential(0) : money(v);
    let out = ""; const ticks = log ? Math.max(1, Math.ceil((max - min) / 5)) : 0;
    const values = log ? Array.from({ length: Math.floor((max - min) / ticks) + 1 }, (_, i) => 10 ** (min + i * ticks)) : Array.from({ length: 5 }, (_, i) => (max * i) / 4);
    for (const v of values) out += `<line x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}" stroke="#d9dfd5"/><text x="${L - 9}" y="${y(v) + 4}" text-anchor="end">${number(v)}</text>`;
    out += `<line x1="${L}" x2="${W - R}" y1="${y(threshold)}" y2="${y(threshold)}" stroke="#7b8d80" stroke-dasharray="2 5"/>`;
    for (let i = 0; i <= 5; i++) { const t = (rounds * i) / 5; out += `<text x="${x(t)}" y="${H - 25}" text-anchor="middle">${t}</text>`; }
    for (const s of series) { const d = s.values.map((v, t) => (t ? "L" : "M") + x(t).toFixed(2) + " " + y(v).toFixed(2)).join(" "); out += `<path d="${d}" fill="none" stroke="${s.color}" stroke-width="${s.width || 2.5}" ${s.dash ? 'stroke-dasharray="7 5"' : ""} stroke-linejoin="round"/>`; }
    if (round !== null) { out += `<line x1="${x(round)}" x2="${x(round)}" y1="${top}" y2="${H - bottom}" stroke="#213b32" stroke-dasharray="2 3"/>`; for (const s of series.filter((s) => !s.example)) out += `<circle cx="${x(round)}" cy="${y(s.values[round]!)}" r="3.5" fill="${s.color}" stroke="#fffef9"/>`; }
    out += `<text x="${(L + W - R) / 2}" y="${H - 5}" text-anchor="middle">Round · ${log ? "log" : "linear"} wealth axis</text>`;
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`); svg.innerHTML = out;
    document.querySelectorAll<HTMLElement>(`[data-chart="${key}"]`).forEach((b) => b.setAttribute("aria-pressed", String(b.dataset["scale"] === scales[key])));
  }
  const expected = (t: number) => Array.from({ length: t + 1 }, (_, r) => S.expected(r));
  function drawOne() { const p = paths[selected]!; const r = Number($("oneRound").value); chart("one", [{ values: p, color: "#27654e" }], { round: r }); $("oneResult").textContent = `Player ${selected + 1} finishes with ${money(p[100]!)}.`; $("oneRoundLabel").textContent = r; $("oneAtRound").textContent = `Round ${r}: player ${selected + 1} has ${money(p[r]!)}. Starting balance: $100.`; }
  function drawMany() { const p = paths[selected]!; const r = Number($("manyRound").value); const series: Series[] = []; for (let i = 0; i < 10; i++) series.push({ values: paths[i]!, color: "#c3ccc0", width: 1, example: true }); series.push({ values: stats.means, color: "#3569a5" }, { values: stats.medians, color: "#a45129" }, { values: expected(100), color: "#213b32", dash: true }, { values: p, color: "#27654e", width: 2 }); chart("many", series, { round: r }); $("median").textContent = money(stats.medians[100]!); $("mean").textContent = money(stats.means[100]!); $("loss").textContent = pct(stats.loss); $("manyRoundLabel").textContent = r; $("manyAtRound").textContent = `Round ${r}: selected player ${money(p[r]!)}; sample median ${money(stats.medians[r]!)}; sample average ${money(stats.means[r]!)}; theoretical expectation ${money(S.expected(r))}.`; $("runInfo").textContent = `Seed ${seed} · 1,000 players · 100 rounds · Selected player ${selected + 1}`; if ($("dataDetails").open) drawTable(); }
  function drawTable() { $("chartData").innerHTML = stats.means.map((v, r) => `<tr><th scope="row">${r}</th><td>${money(paths[selected]![r]!)}</td><td>${money(stats.medians[r]!)}</td><td>${money(v)}</td><td>${money(S.expected(r))}</td></tr>`).join(""); }
  function drawExplore() { const n = Number($("exploreN").value), t = Number($("exploreT").value), s = S.summarize(paths, n, t); const p0 = paths[0]!; chart("explore", [{ values: s.means, color: "#3569a5" }, { values: s.medians, color: "#a45129" }, { values: expected(t), color: "#213b32", dash: true }, { values: p0.slice(0, t + 1), color: "#27654e", width: 2 }], { rounds: t }); $("exploreReadout").textContent = `${n.toLocaleString("en-US")} player${n === 1 ? "" : "s"}, ${t} rounds: sample median ${money(s.medians[t]!)}; sample average ${money(s.means[t]!)}; theoretical expectation ${money(S.expected(t))}; ${pct(s.loss)} below $100.`; $("growthReadout").textContent = `Player 1 ends at ${money(p0[t]!)}. Their realised average log growth is ${(Math.log(p0[t]! / 100) / t).toFixed(6)} per round. The model’s long-run benchmark is ${S.g.toFixed(6)}.`; }
  function drawStop() { const h = [...Array(5).fill(1.5), ...Array(5).fill(0.6)], t = [...h].reverse(); chart("stop", [{ values: S.sequence(t, false), color: "#213b32", dash: true }, { values: S.sequence(h, true), color: "#27654e" }, { values: S.sequence(t, true), color: "#a45129" }], { rounds: 10, threshold: 10 }); }
  function drawResults() { $("personalRecap").textContent = (choice ? `You initially chose “${choice}”. ` : "You did not record an initial choice. ") + (prediction ? `Your prediction: ${prediction === "unsure" ? "not sure" : `most players ${prediction} $100`}. ` : "You did not record a prediction. ") + "Under the model, each player has an 86.44% chance of finishing below $100 after 100 rounds."; $("resultSample").textContent = `This run (seed ${seed}): ${pct(stats.loss)} of the 1,000 players finished below $100. Sample median ${money(stats.medians[100]!)}; sample average ${money(stats.means[100]!)}.`; drawExplore(); drawStop(); }
  function drawRecap() { const guess = prediction === "unsure" ? "You were not sure whether most players would finish above or below $100." : prediction ? `You predicted most players would finish ${prediction} $100.` : "You did not record a prediction."; const below = stats.loss > 0.5, match = prediction === "above" || prediction === "below" ? ((prediction === "below") === below ? " That matches this run." : " That does not match this run.") : ""; $("predictionRecap").textContent = `${guess} In this run (seed ${seed}), ${pct(stats.loss)} of the 1,000 players finished below $100 after 100 rounds, and the sample median was ${money(stats.medians[100]!)}.${match} Under the model, each player has an 86.44% chance of finishing below $100.`; }
  function render() { if (current === 3) drawOne(); if (current === 4) drawMany(); if (current === 5) drawRecap(); if (current === 6) drawResults(); }
  function show(n: number, focus = false) { current = Math.max(1, Math.min(6, n)); stages.forEach((id, i) => ($(id).hidden = i !== current - 1)); document.querySelectorAll<HTMLElement>(".journey-nav [data-step]").forEach((b) => b.setAttribute("aria-current", Number(b.dataset["step"]) === current ? "step" : "false")); $("stepStatus").textContent = `Step ${current} of 6 · ${names[current - 1]}`; render(); if (focus) { const heading = $(stages[current - 1]!).querySelector("h1,h2"); heading.focus({ preventScroll: true }); heading.scrollIntoView({ block: "start", behavior: "auto" }); } }
  function route() { const hash = location.hash; show(hash === "#results" || hash === "#extension" ? 6 : Number(hash.match(/^#step-([1-6])$/)?.[1] || 1)); if (hash === "#extension") $("extension").scrollIntoView(); }
  function go(n: number) {
    const from = current;
    try { history.pushState(history.state, "", "#step-" + n); } catch { /* ignore */ }
    show(n, true);
    if (from === 1 && n > 1) window.__lovableEvents?.track?.("project.experiment_started", {});
    if (n > from && from >= 1 && from <= 5) {
      window.__lovableEvents?.track?.("project.experiment_step_completed", { step: from, step_name: names[from - 1] });
    }
    if (n === 6 && !runReported) {
      runReported = true;
      window.__lovableEvents?.track?.("project.experiment_run_completed", { seed, players: 1000, rounds: 100 });
    }
  }
  document.querySelectorAll<HTMLElement>("[data-step]").forEach((b) => on(b, "click", () => go(Number(b.dataset["step"]))));
  on($("skipResults"), "click", () => go(6));
  on($("seeMaths"), "click", () => { $("mathDetails").open = true; });
  document.querySelectorAll<HTMLElement>(".opening").forEach((b) => on(b, "click", () => { choice = b.dataset["answer"] ?? null; document.querySelectorAll(".opening").forEach((x) => x.setAttribute("aria-pressed", String(x === b))); $("openingStatus").textContent = `You chose “${choice}”. You can change your mind as you explore.`; }));
  document.querySelectorAll<HTMLElement>(".guess").forEach((b) => on(b, "click", () => { prediction = b.dataset["answer"] ?? null; document.querySelectorAll(".guess").forEach((x) => x.setAttribute("aria-pressed", String(x === b))); $("predictionStatus").textContent = "Prediction recorded. Follow one player when you’re ready."; }));
  for (const key of Object.keys(scales)) document.querySelectorAll<HTMLElement>(`[data-chart="${key}"]`).forEach((b) => on(b, "click", () => { scales[key] = b.dataset["scale"] ?? "log"; syncURL(); render(); }));
  on($("oneRound"), "input", drawOne); on($("manyRound"), "input", drawMany);
  on($("nextPlayer"), "click", () => { selected = (selected + 1) % 1000; $("player").value = selected + 1; syncURL(); drawOne(); });
  on($("selectPlayer"), "click", () => { const v = Number($("player").value); if (!$("player").value || !Number.isInteger(v) || v < 1 || v > 1000) { $("playerStatus").textContent = "Enter a whole player number from 1 to 1,000."; $("player").focus(); return; } selected = v - 1; syncURL(); drawOne(); $("playerStatus").textContent = `Showing player ${v}.`; });
  on($("seedForm"), "submit", (e) => { e.preventDefault(); const v = Number($("seed").value); if (!$("seed").value || !Number.isInteger(v) || v < 0 || v > 4294967295) { $("seedStatus").textContent = "Enter a whole seed from 0 to 4,294,967,295."; return; } selected = 0; generate(v); render(); $("seedStatus").textContent = `Seed ${seed} applied. Player 1 is selected.`; });
  on($("newRun"), "click", () => { selected = 0; generate(freshSeed()); render(); $("seedStatus").textContent = `New seed ${seed} generated. Player 1 is selected.`; });
  on($("dataDetails"), "toggle", () => { if ($("dataDetails").open) drawTable(); });
  for (const id of ["exploreN", "exploreT"]) on($(id), "change", () => { syncURL(); drawExplore(); });
  const questions = [...document.querySelectorAll<HTMLElement>(".quiz-question")];
  function clearQuiz() { for (const q of questions) { q.removeAttribute("data-state"); const f = q.querySelector<HTMLElement>(".quiz-feedback")!; f.hidden = true; f.textContent = ""; } }
  on($("quizForm"), "submit", (e) => { e.preventDefault(); if (!$("quizForm").reportValidity()) return; let correct = 0; for (const q of questions) { const yes = q.querySelector<HTMLInputElement>("input:checked")!.value === q.dataset["correct"]; correct += Number(yes); q.dataset["state"] = yes ? "correct" : "review"; const f = q.querySelector<HTMLElement>(".quiz-feedback")!; f.textContent = (yes ? "Correct. " : "Not quite. ") + q.dataset["explanation"]; f.hidden = false; } window.__lovableEvents?.track?.("project.quiz_answered", { correct, total: questions.length }); $("quizResult").hidden = false; $("quizResult").textContent = `${correct} of ${questions.length} correct. Review the explanations, then change any answer and check again.`; $("quizResult").focus(); });
  on($("quizForm"), "change", () => { if (!$("quizResult").hidden) { clearQuiz(); $("quizResult").textContent = "Answers changed. Check again for updated feedback."; } });
  on($("quizForm"), "reset", () => { clearQuiz(); $("quizResult").hidden = true; });
  const helps = () => document.querySelectorAll<HTMLDetailsElement>(".chart-help");
  helps().forEach((d) => { on(d, "mouseenter", () => (d.open = true)); on(d, "mouseleave", () => { if (!d.contains(document.activeElement)) d.open = false; }); on(d, "focusout", (e) => { if (!d.contains(e.relatedTarget)) d.open = false; }); });
  on(document, "keydown", (e) => { if (e.key === "Escape") helps().forEach((d) => (d.open = false)); });
  on(document, "click", (e) => helps().forEach((d) => { if (!d.contains(e.target)) d.open = false; }));
  on(window, "popstate", route); on(window, "hashchange", route);
  let resize: ReturnType<typeof setTimeout> | undefined;
  on(window, "resize", () => { clearTimeout(resize); resize = setTimeout(render, 100); });
  signal.addEventListener("abort", () => clearTimeout(resize));
  generate(seed); route();
}

ErgoLabs | private redesign

Extract the ZIP and open index.html in a browser. Keep the files together.
This is a static site with no backend. If your browser blocks local files,
open a terminal in the extracted folder and run "py -m http.server 8000"
if Python is installed, then open http://localhost:8000.

What's changed
- The homepage starts with the $100 game, with one clear entry to Experiment A.
- B, D, G, E and F are clearly marked as previews, not playable simulations.
- Experiment A has direct step navigation, shorter explanations, Log/Linear
  controls next to the charts, and labeled results you can read without the plots.
- An optional explorer varies player count and rounds while reusing histories.
- The worked maths, quiz, stopping-rule example and bibliography are retained.

Verification
- JavaScript syntax and internal links/anchors checked across the package.
- Simulation checks passed against the original: four seeds, 4,000 paths;
  model references, nested samples and stopping rules also checked.
- Full browser rendering, keyboard walkthrough and mobile viewport tests were
  not verified because the cloud browser could not open the test site.
- Reviewed using the supplied peer feedback and web-design guidance. Grill Me
  was adapted to a design decision review because Davide asked us to work offline.

# ErgoLabs

Website source with interactive experiments, charts, guided steps, quizzes, analytics, and the student results explainer.

## Run locally

Install Bun, then run:

```sh
bun install
bun run dev
```

## Verify and build

```sh
bun run test --maxWorkers=2
bun run build
```

The AI results explainer requires a server-side `LOVABLE_API_KEY` and access to Lovable AI Gateway. No credentials are included. Analytics reporting requires the Lovable hosting environment.

Unused starter components, retired coming-soon pages, old import records, editor documentation, dependencies, and build output are excluded. Active styles, fonts, simulations, tests, and required configuration are preserved.

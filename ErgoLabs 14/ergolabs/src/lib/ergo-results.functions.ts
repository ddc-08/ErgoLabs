import { createServerFn } from "@tanstack/react-start";
import { GatewayError } from "@lovable.dev/ai-gateway";
import { analyseResult, validateResult, type ResultAnalysis } from "./ergo-results";

export type ExplainOutcome =
  | { ok: true; analysis: ResultAnalysis; explanation: string }
  | { ok: false; error: string };

function describeFailure(error: unknown): string {
  if (error instanceof GatewayError) {
    if (error.httpStatus === 429) return "The explainer is busy right now. Please try again shortly.";
    if (error.httpStatus === 402) return "The explainer is out of credits right now.";
  }
  return "The explainer couldn't finish. Please try again.";
}

export const explainResults = createServerFn({ method: "POST" })
  .inputValidator((input: { rounds: number; heads: number }) => input)
  .handler(async ({ data }): Promise<ExplainOutcome> => {
    const parsed = validateResult(data);
    if (!parsed.ok) return { ok: false, error: parsed.error };

    const analysis = analyseResult(parsed.value);
    try {
      // Server-only module: loaded inside the handler so it never reaches the browser bundle.
      const { explainWithModel } = await import("./ergo-results.server");
      const explanation = await explainWithModel(analysis);
      if (!explanation) return { ok: false, error: describeFailure(undefined) };
      return { ok: true, analysis, explanation };
    } catch (error) {
      return { ok: false, error: describeFailure(error) };
    }
  });

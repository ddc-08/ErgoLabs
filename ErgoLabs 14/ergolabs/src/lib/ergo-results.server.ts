import { generateResponse } from "@lovable.dev/ai-gateway";
import { describeAnalysis, type ResultAnalysis } from "./ergo-results";

const MODEL = "openai/gpt-6.1-sol";

const EXPLAINER_INSTRUCTIONS = `You explain a student's own coin-toss results back to them.

The game they played: start with $100; a fair coin multiplies the current balance by 1.5 on heads
and by 0.6 on tails; rounds are independent.

Every number you need is already calculated and given to you. Use those figures as they are — do not
recompute them, do not invent new ones, and do not report a precision the figures do not carry.

Explain, for an economics student meeting ergodicity for the first time:
- how their observed share of heads compares with the 50% a fair coin gives, and what the usual
  spread around half heads means for a small class sample
- whether their result is unusual, using the probability you were given, and what "unusual" does and
  does not tell them
- why their final balance sits where it does next to the expected wealth, and how the typical
  compound rate of about -5.13% per round comes in

Keep it under 180 words. Use two or three short paragraphs, or a short bullet list. Plain language,
no tables, no headings. This is teaching, not advice: never tell the student what to invest or
whether the game is worth playing.`.trim();

function textFrom(response: unknown): string {
  const output = (response as { output?: unknown })?.output;
  if (!Array.isArray(output)) return "";
  const parts: string[] = [];
  for (const item of output) {
    const content = (item as { content?: unknown })?.content;
    if (!Array.isArray(content)) continue;
    for (const block of content) {
      const piece = block as { type?: unknown; text?: unknown };
      if (piece?.type === "output_text" && typeof piece.text === "string") parts.push(piece.text);
    }
  }
  return parts.join("").trim();
}

export async function explainWithModel(analysis: ResultAnalysis): Promise<string> {
  const response = await generateResponse({
    model: MODEL,
    instructions: EXPLAINER_INSTRUCTIONS,
    input: `Student's results, already calculated:\n${describeAnalysis(analysis)}`,
    max_output_tokens: 700,
  });
  return textFrom(response);
}

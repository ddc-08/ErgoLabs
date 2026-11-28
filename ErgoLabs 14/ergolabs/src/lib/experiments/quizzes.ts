import type { QuizQuestion } from '@/components/experiment/experiment-page';
export const QUIZZES: Record<string, QuizQuestion[]> = {
 E: [
 { question: 'What is the expected-wealth break-even premium for a 5% chance of a 95% loss?', options: ['4.75% per round', '13.91% per round', '95% per round'], correct: 0, explanation: 'The expected loss fraction is 0.05 × 0.95 = 4.75% of pre-round wealth.' },
 { question: 'Why can a 10% premium improve typical long-run wealth?', options: ['Insurance creates new wealth', 'Avoiding rare 95% drops improves log growth despite the premium', 'Losses never occur'], correct: 1, explanation: 'ln(0.9) ≈ −0.1054 is less negative than uninsured growth 0.05 ln(0.05) ≈ −0.1498.' },
 { question: 'At what premium does insurance stop improving log growth?', options: ['4.75%', 'About 13.91%', '50%'], correct: 1, explanation: 'Solve ln(1−p) = 0.05 ln(0.05): p = 1−0.05^0.05 ≈ 13.91%.' },
 { question: 'Does insurance generate profits in this model?', options: ['Yes, always', 'Yes, below the fair premium', 'No; all positive-premium policies decline without income or returns'], correct: 2, explanation: 'Full cover leaves a deterministic multiplier of 1−p each round. This is wealth preservation, not profit.' },
 ],
 F: [
 { question: 'The first head arrives on toss 3. What does the lottery pay?', options: ['$3', '$4', '$8'], correct: 1, explanation: 'The payout is 2^(N−1): toss 1 pays $1, toss 2 pays $2, toss 3 pays $4.' },
 { question: 'What can a finite simulation establish about the ideal expected payout?', options: ['It proves the expectation is infinite', 'It estimates a finite sample average; divergence follows from the analytical series', 'It finds the true finite mean'], correct: 1, explanation: 'Every index N contributes 2^(−N) × 2^(N−1) = ½ to the expectation, so the ideal infinite series diverges.' },
 { question: 'What is held fixed in the log-change calculation?', options: ['Reference wealth and ticket price for each independent complete lottery', 'The wealth carried forward from the last lottery', 'A physical payout cap'], correct: 0, explanation: 'This is a fixed-reference one-round criterion, not a history of repeated fixed-dollar purchases.' },
 { question: 'Is the mathematical zero-log-change price always affordable without borrowing?', options: ['Yes', 'No; cash-only purchases also require ticket cost ≤ wealth', 'Only if the sample mean is large'], correct: 1, explanation: 'The positive-final-wealth domain is cost < wealth+1, while cash-only eligibility is stricter: cost ≤ wealth.' },
 ],
 G: [
 { question: 'Ten equal-wealth members get four heads. What is their pooled multiplier?', options: ['1.05', '0.96', '1.4'], correct: 1, explanation: '0.6 + 0.9 × 4/10 = 0.96. Equal redistribution conserves total wealth.' },
 { question: 'What happens to the pooling benefit when all shocks are shared?', options: ['It grows with group size', 'It vanishes: every group has the solo log growth rate', 'The pool becomes risk-free'], correct: 1, explanation: 'When all members win or lose together, averaging their outcomes does not smooth the multiplier.' },
 { question: 'Is summing separately held wealth equivalent to sharing every round?', options: ['Yes, always', 'No; redistribution resets equal holdings before each new round', 'Only after a loss'], correct: 1, explanation: 'With separate holdings, fortunes accumulate in different hands. Pooling resets equal exposure each round, changing the typical group path.' },
 { question: 'What is the infinite independent-pool log-growth benchmark?', options: ['ln(1.05)', 'ln(0.6)', 'Zero'], correct: 0, explanation: 'Independent outcomes average towards the expected multiplier 1.05. Finite groups remain below ln(1.05), and sharing creates no extra money.' },
 ],
};

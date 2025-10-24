'use server';
/**
 * @fileOverview Summarizes the latest vehicle security news and trends.
 *
 * - summarizeSecurityNews - A function that returns the summarized news.
 * - SummarizeSecurityNewsInput - The input type for the summarizeSecurityNews function.
 * - SummarizeSecurityNewsOutput - The return type for the summarizeSecurityNews function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeSecurityNewsInputSchema = z.object({
  newsArticles: z
    .array(z.string())
    .describe('An array of news articles related to vehicle security.'),
});
export type SummarizeSecurityNewsInput = z.infer<
  typeof SummarizeSecurityNewsInputSchema
>;

const SummarizeSecurityNewsOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'A summary of the latest vehicle security news and trends, highlighting potential threats and new security technologies.'
    ),
});
export type SummarizeSecurityNewsOutput = z.infer<
  typeof SummarizeSecurityNewsOutputSchema
>;

export async function summarizeSecurityNews(
  input: SummarizeSecurityNewsInput
): Promise<SummarizeSecurityNewsOutput> {
  return summarizeSecurityNewsFlow(input);
}

const summarizeSecurityNewsPrompt = ai.definePrompt({
  name: 'summarizeSecurityNewsPrompt',
  input: {schema: SummarizeSecurityNewsInputSchema},
  output: {schema: SummarizeSecurityNewsOutputSchema},
  prompt: `You are an expert in vehicle security. Summarize the following news articles and trends, highlighting potential threats and new security technologies.\n\nNews Articles:\n{{#each newsArticles}}\n- {{{this}}}\n{{/each}}`,
});

const summarizeSecurityNewsFlow = ai.defineFlow(
  {
    name: 'summarizeSecurityNewsFlow',
    inputSchema: SummarizeSecurityNewsInputSchema,
    outputSchema: SummarizeSecurityNewsOutputSchema,
  },
  async input => {
    const {output} = await summarizeSecurityNewsPrompt(input);
    return output!;
  }
);

'use server';
/**
 * @fileOverview Resume las últimas noticias y tendencias de seguridad vehicular.
 *
 * - summarizeSecurityNews - Una función que devuelve las noticias resumidas.
 * - SummarizeSecurityNewsInput - El tipo de entrada para la función summarizeSecurityNews.
 * - SummarizeSecurityNewsOutput - El tipo de retorno para la función summarizeSecurityNews.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeSecurityNewsInputSchema = z.object({
  newsArticles: z
    .array(z.string())
    .describe('Un array de artículos de noticias relacionados con la seguridad vehicular.'),
});
export type SummarizeSecurityNewsInput = z.infer<
  typeof SummarizeSecurityNewsInputSchema
>;

const SummarizeSecurityNewsOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'Un resumen de las últimas noticias y tendencias de seguridad vehicular, destacando amenazas potenciales y nuevas tecnologías de seguridad.'
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
  prompt: `Eres un experto en seguridad vehicular. Resume los siguientes artículos de noticias y tendencias, destacando las amenazas potenciales y las nuevas tecnologías de seguridad.\n\nArtículos de Noticias:\n{{#each newsArticles}}\n- {{{this}}}\n{{/each}}`,
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

'use server';
/**
 * @fileOverview Flujo de análisis de amenazas y recomendaciones de seguridad personalizadas impulsado por IA.
 *
 * - getPersonalizedSecurityRecommendations - Una función que toma los detalles del vehículo y la ubicación como entrada y devuelve recomendaciones de seguridad personalizadas.
 * - PersonalizedSecurityRecommendationsInput - El tipo de entrada para la función getPersonalizedSecurityRecommendations.
 * - PersonalizedSecurityRecommendationsOutput - El tipo de retorno para la función getPersonalizedSecurityRecommendations.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedSecurityRecommendationsInputSchema = z.object({
  vehicleType: z.string().describe('El tipo de vehículo (p. ej., coche, camión, SUV, motocicleta).'),
  vehicleMake: z.string().describe('La marca del vehículo (p. ej., Toyota, Ford, Honda).'),
  vehicleModel: z.string().describe('El modelo del vehículo (p. ej., Camry, F-150, Civic).'),
  vehicleYear: z.number().describe('El año de fabricación del vehículo.'),
  location: z.string().describe('La ubicación donde el vehículo se estaciona habitualmente (p. ej., ciudad, estado).'),
  specificConcerns: z
    .string()
    .optional()
    .describe(
      'Cualquier preocupación de seguridad específica que tenga el usuario (p. ej., robo, vandalismo, allanamientos).'
    ),
});
export type PersonalizedSecurityRecommendationsInput = z.infer<
  typeof PersonalizedSecurityRecommendationsInputSchema
>;

const PersonalizedSecurityRecommendationsOutputSchema = z.object({
  threatAnalysis: z.string().describe('Un análisis de las posibles amenazas de seguridad basado en los detalles del vehículo y la ubicación.'),
  recommendations: z.array(
    z.string().describe('Una lista de recomendaciones de seguridad personalizadas para el vehículo.')
  ),
  reasoning: z.string().describe('El razonamiento detrás del análisis de amenazas y las recomendaciones.'),
});
export type PersonalizedSecurityRecommendationsOutput = z.infer<
  typeof PersonalizedSecurityRecommendationsOutputSchema
>;

export async function getPersonalizedSecurityRecommendations(
  input: PersonalizedSecurityRecommendationsInput
): Promise<PersonalizedSecurityRecommendationsOutput> {
  return personalizedSecurityRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedSecurityRecommendationsPrompt',
  input: {schema: PersonalizedSecurityRecommendationsInputSchema},
  output: {schema: PersonalizedSecurityRecommendationsOutputSchema},
  prompt: `Eres un experto en seguridad impulsado por IA especializado en seguridad de vehículos.

  Basado en los detalles del vehículo y la ubicación proporcionada, analiza las amenazas potenciales y proporciona recomendaciones de seguridad personalizadas.

  Tipo de Vehículo: {{{vehicleType}}}
  Marca del Vehículo: {{{vehicleMake}}}
  Modelo del Vehículo: {{{vehicleModel}}}
  Año del Vehículo: {{{vehicleYear}}}
  Ubicación: {{{location}}}
  Preocupaciones Específicas: {{{specificConcerns}}}

  Analiza las amenazas potenciales para este vehículo en esta ubicación, considerando factores como las tasas de criminalidad, los métodos de robo comunes y la vulnerabilidad del modelo del vehículo.

  Proporciona una lista de recomendaciones de seguridad específicas y accionables para mitigar estas amenazas. Las recomendaciones deben incluir productos específicos, medidas de seguridad y mejores prácticas.

  Explica el razonamiento detrás de tu análisis de amenazas y recomendaciones, justificando por qué cada recomendación es apropiada para el vehículo y la ubicación dados.
  Asegúrate de que las recomendaciones estén adaptadas al vehículo y la ubicación específicos, abordando los desafíos de seguridad únicos que presentan.
  `,
});

const personalizedSecurityRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedSecurityRecommendationsFlow',
    inputSchema: PersonalizedSecurityRecommendationsInputSchema,
    outputSchema: PersonalizedSecurityRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

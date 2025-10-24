'use server';
/**
 * @fileOverview AI-powered threat analysis and personalized security recommendations flow.
 *
 * - getPersonalizedSecurityRecommendations - A function that takes vehicle details and location as input and returns personalized security recommendations.
 * - PersonalizedSecurityRecommendationsInput - The input type for the getPersonalizedSecurityRecommendations function.
 * - PersonalizedSecurityRecommendationsOutput - The return type for the getPersonalizedSecurityRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedSecurityRecommendationsInputSchema = z.object({
  vehicleType: z.string().describe('The type of vehicle (e.g., car, truck, SUV, motorcycle).'),
  vehicleMake: z.string().describe('The make of the vehicle (e.g., Toyota, Ford, Honda).'),
  vehicleModel: z.string().describe('The model of the vehicle (e.g., Camry, F-150, Civic).'),
  vehicleYear: z.number().describe('The year the vehicle was manufactured.'),
  location: z.string().describe('The location where the vehicle is typically parked (e.g., city, state).'),
  specificConcerns: z
    .string()
    .optional()
    .describe(
      'Any specific security concerns the user has (e.g., theft, vandalism, break-ins).'
    ),
});
export type PersonalizedSecurityRecommendationsInput = z.infer<
  typeof PersonalizedSecurityRecommendationsInputSchema
>;

const PersonalizedSecurityRecommendationsOutputSchema = z.object({
  threatAnalysis: z.string().describe('An analysis of potential security threats based on the vehicle details and location.'),
  recommendations: z.array(
    z.string().describe('A list of personalized security recommendations for the vehicle.')
  ),
  reasoning: z.string().describe('The reasoning behind the threat analysis and recommendations.'),
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
  prompt: `You are an AI-powered security expert specializing in vehicle security.

  Based on the vehicle details and location provided, analyze potential threats and provide personalized security recommendations.

  Vehicle Type: {{{vehicleType}}}
  Vehicle Make: {{{vehicleMake}}}
  Vehicle Model: {{{vehicleModel}}}
  Vehicle Year: {{{vehicleYear}}}
  Location: {{{location}}}
  Specific Concerns: {{{specificConcerns}}}

  Analyze the potential threats to this vehicle in this location, considering factors such as crime rates, common theft methods, and vulnerability of the vehicle model.

  Provide a list of specific, actionable security recommendations to mitigate these threats. Recommendations should include specific products, security measures, and best practices.

  Explain the reasoning behind your threat analysis and recommendations, justifying why each recommendation is appropriate for the given vehicle and location.
  Ensure that the recommendations are tailored to the specific vehicle and location, addressing the unique security challenges they present.
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

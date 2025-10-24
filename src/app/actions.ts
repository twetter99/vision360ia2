'use server';

import {
  getPersonalizedSecurityRecommendations,
  type PersonalizedSecurityRecommendationsInput,
} from '@/ai/flows/personalized-security-recommendations';

export async function getRecommendations(
  input: PersonalizedSecurityRecommendationsInput
) {
  try {
    const result = await getPersonalizedSecurityRecommendations(input);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'No se pudieron obtener las recomendaciones.' };
  }
}

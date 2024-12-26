import { GoogleAuth } from 'google-auth-library';
import { google } from 'googleapis';

const auth = new GoogleAuth({
  scopes: ['https://www.googleapis.com/auth/cloud-platform']
});

const generativeAI = google.generativeai({
  version: 'v1beta1',
  auth: auth
});

export async function generateResponse(prompt: string): Promise<string> {
  try {
    const response = await generativeAI.text.generate({
      requestBody: {
        prompt: prompt,
        maxTokens: 100
      }
    });
    return response.data.choices[0].text;
  } catch (error) {
    console.error('Error generating response:', error);
    throw new Error('Failed to generate response');
  }
}

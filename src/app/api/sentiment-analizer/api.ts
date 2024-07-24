// utils/api.ts
import axios from 'axios';

const API_URL = 'https://api-inference.huggingface.co/models/finiteautomata/beto-sentiment-analysis';
const API_KEY = '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'; // Reemplaza con tu clave de API

interface SentimentAnalysisRequest {
  inputs: string;
}

interface SentimentAnalysisResponse {
  label: string;
  score: number;
}

export const analyzeSentiment = async (text: string): Promise<SentimentAnalysisResponse[]> => {
  const data: SentimentAnalysisRequest = { inputs: text };

  const response = await axios.post<SentimentAnalysisResponse[]>(API_URL, data, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};
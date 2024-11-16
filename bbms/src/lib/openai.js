// src/lib/openai.js
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY, // Use a prefix for React environment variables
});

export default openai;

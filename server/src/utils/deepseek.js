import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const deepseek = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: "https://api.deepseek.com"
});

export default deepseek;
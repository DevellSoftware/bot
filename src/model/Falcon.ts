import { HuggingFaceInference } from "langchain/llms";
import { Model } from "./Model.ts";
import dotenv from "dotenv";

export class Falcon extends Model {
  lm: HuggingFaceInference;

  constructor() {
    super();

    dotenv.config();

    this.lm = new HuggingFaceInference({
      // model: "tiiuae/falcon-7b",
      model: "tiiuae/falcon-7b-instruct",
      apiKey: process.env.HUGGING_FACE_KEY, // In Node.js defaults to process.env.HUGGINGFACEHUB_API_KEY
      temperature: 0.7,
      maxTokens: 700,
    });
  }

  getLM() {
    return this.lm;
  }
}

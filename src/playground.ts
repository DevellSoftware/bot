//import { OpenAI } from "langchain/llms/openai";
import { BufferMemory, ChatMessageHistory } from "langchain/memory";
import { AIMessage, HumanMessage } from "langchain/schema";
import { HuggingFaceInference } from "langchain/llms/hf";
import { LLMChain, PromptTemplate } from "langchain";
import { ConversationChain } from "langchain/chains";

//const OPENAI_API_KEY = "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";

const HUGGING_FACE_KEY = "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";

const model = new HuggingFaceInference({
  //model: "meta-llama/Llama-2-7b",
  // model: "tiiuae/falcon-7b",
  model: "tiiuae/falcon-7b-instruct",
  //model: "tiiuae/falcon-7b",
  apiKey: HUGGING_FACE_KEY, // In Node.js defaults to process.env.HUGGINGFACEHUB_API_KEY
  temperature: 0.7,
  maxTokens: 700,
});

/*
const llm = new OpenAI({
  openAIApiKey: OPENAI_API_KEY,
  temperature: 0.9,
});
*/

const startMessages = [new HumanMessage("Your name is Alice.")];

const memory = new BufferMemory({
  chatHistory: new ChatMessageHistory(startMessages),
});

const prompt = PromptTemplate.fromTemplate(`
  You are a helpful AI assistant and provide the answers to the questions of your users.

  {question}
  Your answer:
`);

const chain = new ConversationChain({
  llm: model,
  memory,
  verbose: true,
  prompt,
});

(async () => {
  try {
    const result = await chain.call({
      question: "What is my name?",
    });
    console.log(result);
  } catch (e) {
    console.log(e);
  }
})();

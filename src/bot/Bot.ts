import { ConversationChain } from "langchain/chains";
import { Model } from "../model/Model.js";
import { BufferMemory } from "langchain/memory";
import { PromptTemplate } from "langchain";

export class Bot {
  chain: ConversationChain;
  memory: BufferMemory;

  constructor(model: Model) {
    this.memory = new BufferMemory();

    this.chain = new ConversationChain({
      llm: model.getLM(),
      memory: this.memory,
      verbose: true,
      prompt: PromptTemplate.fromTemplate(`
        You are a helpful AI assistant and provide the answers to the questions of your users.

        {question}
        Your answer:
      `),
    });
  }

  tell(message: string) {
    this.memory.chatHistory.addUserMessage(message);
  }

  async ask(question: string) {
    return await this.chain.call({ question });
  }
}

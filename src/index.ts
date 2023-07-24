import { Bot } from "./bot/Bot.ts";
import { Llama2 } from "./model/Llama2.ts";

const model = new Llama2();

const bot = new Bot(model);

bot.tell("Your name is Alice.");

(async () => {
  try {
    const result = await bot.ask("What is my name?");
    console.log(result);
  } catch (e) {
    console.log(e);
  }
})();

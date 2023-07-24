import { BaseLanguageModel } from "langchain/base_language";

export abstract class Model {
  abstract getLM(): BaseLanguageModel;
}

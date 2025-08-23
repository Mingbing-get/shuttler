import { VariableSchema } from "./variableSchema";

export declare namespace FunctionSchema {
  export interface Desc {
    isPromise?: boolean;
    params: { name: string; type: VariableSchema.Desc }[];
    parsePromiseResult?: VariableSchema.Desc;
  }
}

export declare namespace VariableSchema {
  export interface BaseVariable<T> {
    type: T;
    required?: boolean;
    label?: string;
  }

  export interface Number extends BaseVariable<"number"> {
    min?: number;
    max?: number;
  }

  export interface String extends BaseVariable<"string"> {
    minLength?: number;
    maxLength?: number;
  }

  export interface Boolean extends BaseVariable<"boolean"> {
    trueText?: string;
    falseText?: string;
  }

  export interface Date extends BaseVariable<"date"> {
    format?: string;
  }

  export interface DateTime extends BaseVariable<"dateTime"> {
    format?: string;
  }

  export interface Any extends BaseVariable<"any"> {}

  export interface Unknown extends BaseVariable<"unknown"> {}

  export interface Empty extends BaseVariable<"empty"> {}

  export interface Option extends BaseVariable<"option"> {
    options: {
      label?: string;
      value: string;
      disabled?: boolean;
    }[];
  }

  export interface Object extends BaseVariable<"object"> {
    prototype: Record<string, Desc>;
  }

  export interface Array extends BaseVariable<"array"> {
    items: Desc;
  }

  export interface Circular extends BaseVariable<"circular"> {
    path: string[];
  }

  export type Desc =
    | Number
    | String
    | Boolean
    | Date
    | DateTime
    | Any
    | Unknown
    | Empty
    | Option
    | Object
    | Array
    | Circular;

  type ExtractByType<
    T extends { type: string },
    K extends T["type"],
  > = T extends { type: K } ? T : never;

  export type FindDescByType<T extends Desc["type"]> = ExtractByType<Desc, T>;
}

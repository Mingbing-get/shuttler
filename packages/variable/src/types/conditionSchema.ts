export namespace ConditionSchema {
  export type SimpleValue = string | number | boolean

  export interface FormulaValue {
    _type: 'fx'
    code: string
  }

  export interface BaseCondition<T extends string> {
    id: string
    keyPath: string[]
    op: T
  }

  export interface HasValueCondition<T extends string, V> extends BaseCondition<T> {
    value: V | FormulaValue
  }

  export interface AndCondition {
    id: string
    op: 'and'
    children: Desc[]
  }
  export interface OrCondition {
    id: string
    op: 'or'
    children: Desc[]
  }

  export interface NullCondition extends BaseCondition<'isNull'> {}
  export interface NotNullCondition extends BaseCondition<'isNotNull'> {}

  export type EqCondition = HasValueCondition<'eq', SimpleValue>
  export type NeqCondition = HasValueCondition<'neq', SimpleValue>
  export type GtCondition = HasValueCondition<'gt', number>
  export type LtCondition = HasValueCondition<'lt', number>
  export type GteCondition = HasValueCondition<'gte', number>
  export type LteCondition = HasValueCondition<'lte', number>

  export type LikeCondition = HasValueCondition<'like', string>
  export type NotLikeCondition = HasValueCondition<'notLike', string>

  export type IncludesCondition = HasValueCondition<'includes', SimpleValue>
  export type NotIncludesCondition = HasValueCondition<'notIncludes', SimpleValue>
  export type InCondition = HasValueCondition<'in', SimpleValue[]>
  export type NotInCondition = HasValueCondition<'notIn', SimpleValue[]>
  export type HasAnyOfCondition = HasValueCondition<'hasAnyOf', SimpleValue[]>
  export type NotAnyOfCondition = HasValueCondition<'notAnyOf', SimpleValue[]>

  export type Desc =
    | AndCondition
    | OrCondition
    | NullCondition
    | NotNullCondition
    | EqCondition
    | NeqCondition
    | GtCondition
    | LtCondition
    | GteCondition
    | LteCondition
    | LikeCondition
    | NotLikeCondition
    | IncludesCondition
    | NotIncludesCondition
    | InCondition
    | NotInCondition
    | HasAnyOfCondition
    | NotAnyOfCondition

  export type Normal = Exclude<Desc, AndCondition | OrCondition>

  export type HasChildren = AndCondition | OrCondition
}

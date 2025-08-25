export interface Dependency {
  refType:
    | 'file'
    | 'enum'
    | 'modal'
    | 'modalField'
    | 'styleVar'
    | 'flow'
    | 'faas'
    | 'page'
    | 'component'
    | 'globalVar'
    | 'pageEventFlow'
    | 'pageFunction'
    | 'pageVariable'
    | 'pageEvent'
    | 'variable'
    | 'className'
    | 'style'
  refPath: string[]
  sourceType: string
  sourcePath: { value: string; label: string }[]
}

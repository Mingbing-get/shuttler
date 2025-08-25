export interface IconProps extends Omit<React.SVGAttributes<SVGElement>, 'className' | 'viewBox' | 'children'> {
  style?: React.CSSProperties
  type?: string
  spin?: boolean
  className?: string | string[]
}

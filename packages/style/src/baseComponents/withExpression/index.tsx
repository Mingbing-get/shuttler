import { FunctionComponent, useCallback, useMemo } from 'react'
import classnames from 'classnames'

import { FxIcon } from '../../icons'
import StyleExpressionRender from '../styleExpressionRender'
import { StyleVar } from '../../type'
import { isStyleExpression } from '../../utils'

import './index.scss'

interface WithExpressFunctionBaseProps {
  value?: any
  disabled?: boolean
  onChange?: (value?: any) => void
}

function getDefaultValueByType(type: StyleVar.Type) {
  if (type === 'linearGradient') return { colorList: [] }

  if (type === 'radialGradient') return { colorList: [] }
}

export default function withExpress<V extends WithExpressFunctionBaseProps>(Render: FunctionComponent<V>, type: StyleVar.Type, alignTop?: boolean) {
  return (props: V) => {
    const { value, disabled, onChange } = props

    const isExpression = useMemo(() => isStyleExpression(value), [value])

    const handleToggle = useCallback(() => {
      onChange?.(isExpression ? getDefaultValueByType(type) : ({ type: 'style_express' } as any))
    }, [isExpression, type, onChange])

    return (
      <div className={classnames('with-express-render', alignTop && 'align-top')}>
        {!disabled && (
          <span
            className={classnames('with-express-toggle', isExpression && 'is-show-express')}
            onClick={handleToggle}>
            <FxIcon />
          </span>
        )}
        <div className="with-express-content">
          {isExpression ? (
            <StyleExpressionRender
              {...(props as any)}
              type={type}
            />
          ) : (
            <Render {...props} />
          )}
        </div>
      </div>
    )
  }
}

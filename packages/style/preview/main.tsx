import { useCallback, useMemo, useState } from 'react'
import { Tabs } from '@arco-design/web-react'
import {
  StyleSetter,
  StyleDefine,
  StyleConvert,
  StyleVarGroup,
  StyleVarGroupSetter,
  ClassNameSetter,
  ClassName,
} from '..'

export default function Main() {
  const [style, setStyle] = useState<StyleDefine>()
  const [groups, setGroups] = useState<StyleVarGroup[]>([
    { id: 'default', alias: { zh: '默认' }, vars: {}, active: true },
  ])
  const [classNames, setClassNames] = useState<Record<string, ClassName>>()

  const activeGroup = useMemo(() => {
    return groups.find((group) => group.active)
  }, [groups])

  const handleCompute = useCallback(() => {
    const res = new StyleConvert().toString(style, activeGroup?.vars)
    console.log(res)
  }, [style, activeGroup])

  return (
    <div
      style={{
        padding: '0 1rem 1rem',
        margin: '2rem auto 0',
        width: 350,
        height: '80vh',
        overflowY: 'auto',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: 4,
      }}
    >
      <button onClick={handleCompute}>计算样式值</button>
      <Tabs>
        <Tabs.TabPane key="style" title="样式">
          <StyleSetter value={style} onChange={setStyle} styleVarMap={activeGroup?.vars} />
        </Tabs.TabPane>
        <Tabs.TabPane key="styleVar" title="样式变量">
          <StyleVarGroupSetter groups={groups} onChange={setGroups} />
        </Tabs.TabPane>
        <Tabs.TabPane key="className" title="样式名">
          <ClassNameSetter
            classNames={classNames}
            styleVarMap={activeGroup?.vars}
            onChange={setClassNames}
          />
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}

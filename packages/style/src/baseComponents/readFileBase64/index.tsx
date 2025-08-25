import { useMemo } from 'react'
import { IconPlus } from '@arco-design/web-react/icon'
import { Upload, UploadProps } from '@arco-design/web-react'
import { useEffectCallback } from '@shuttler/helper'

import { toBase64 } from './utils'

import './index.scss'

interface Props {
  style?: React.CSSProperties
  className?: string
  disabled?: boolean
  value?: string
  onChange?: (value?: string) => void
}

export default function ReadFileBase64({ value, style, disabled, className, onChange }: Props) {
  const fileList = useMemo(() => {
    if (!value) return

    return [
      {
        uid: 'url',
        url: value,
      },
    ]
  }, [value])

  const handleChange = useEffectCallback(
    async (fileList?: UploadProps['fileList']) => {
      if (!fileList?.length) {
        onChange?.()
      } else {
        const originFile = fileList[0].originFile
        if (!originFile) return

        const base64 = await toBase64(originFile)
        onChange?.(base64)
      }
    },
    [onChange],
  )

  return (
    <div className={className} style={{ ...style, display: 'flex', flexWrap: 'nowrap' }}>
      <Upload
        disabled={disabled}
        limit={1}
        imagePreview
        listType="picture-card"
        fileList={fileList}
        onChange={handleChange}
        renderUploadItem={(originNode) => <div className="read-base64-upload">{originNode}</div>}
      >
        <IconPlus />
      </Upload>
    </div>
  )
}

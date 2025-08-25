import { StyleRenderConfig } from './type'
import {
  FieldRender,
  SpaceInput,
  DirectionLengthInput,
  DirectionConstInput,
  DirectionColorInput,
  AxiosConstInput,
  AxiosLengthInput,
  AxiosArraySpaceInput,
  ColorInput,
  ConstInput,
  LengthInput,
  BorderInput,
  BoxShadowInput,
  CursorInput,
  BackgroundInput,
  TransformInput,
  TransitionInput,
  FilterInput,
  PositionInput,
  NumberInput,
  FontFamilyInput,
} from './components'
import proLabelConfig from './proLabelConfig'
import {
  FlexIcon,
  InlineFlexIcon,
  GridIcon,
  InlineGridIcon,
  DirectionRowIcon,
  DirectionRowReverseIcon,
  DirectionRowDenseIcon,
  JustifyLeftIcon,
  JustifyRightIcon,
  JustifyCenterIcon,
  JustifyStretchIcon,
  SpaceBetweenIcon,
  SpaceAroundIcon,
  AlignStartIcon,
  AlignCenterIcon,
  AlignEndIcon,
  AlignStretchIcon,
  SolidLineIcon,
  DashedLineIcon,
  DottedLineIcon,
  DoubleLineIcon,
  WrapIcon,
  NowrapIcon,
} from './icons'

const defaultConfig: StyleRenderConfig = {
  groupLabelMap: {
    layout: '布局',
    size: '大小',
    space: '间距',
    border: '边框',
    position: '位置',
    decoration: '装饰',
    font: '字体',
    transform: '变换',
    other: '其他',
  },
  fieldRender: {
    // layout
    display: {
      groupKey: 'layout',
      label: proLabelConfig.display,
      Render: ({ label, style, ...props }) => (
        <FieldRender
          label={label}
          canClear={!!props.value}
          onClear={props.onChange}
          inputFiled={
            <ConstInput
              {...props}
              displayAs="radio"
              options={[
                {
                  value: 'flex',
                  label: '弹性布局',
                  icon: <FlexIcon />,
                },
                {
                  value: 'inline-flex',
                  label: '行内弹性布局',
                  icon: <InlineFlexIcon />,
                },
                {
                  value: 'grid',
                  label: '网格布局',
                  icon: <GridIcon />,
                },
                {
                  value: 'inline-grid',
                  label: '行内网格布局',
                  icon: <InlineGridIcon />,
                },
              ]}
            />
          }
        />
      ),
    },
    flexDirection: {
      groupKey: 'layout',
      label: proLabelConfig.flexDirection,
      Render: ({ label, style, ...props }) => (
        <FieldRender
          label={label}
          canClear={!!props.value}
          onClear={props.onChange}
          hidden={!['flex', 'inline-flex'].includes(style?.display || '')}
          inputFiled={
            <ConstInput
              {...props}
              defaultValue="row"
              displayAs="radio"
              options={[
                {
                  value: 'row',
                  label: '横向',
                  icon: <DirectionRowIcon />,
                },
                {
                  value: 'column',
                  label: '纵向',
                  icon: <DirectionRowIcon style={{ rotate: '90deg' }} />,
                },
                {
                  value: 'row-reverse',
                  label: '横向反转',
                  icon: <DirectionRowReverseIcon />,
                },
                {
                  value: 'column-reverse',
                  label: '纵向反转',
                  icon: <DirectionRowReverseIcon style={{ rotate: '90deg' }} />,
                },
              ]}
            />
          }
        />
      ),
    },
    flexWrap: {
      groupKey: 'layout',
      label: proLabelConfig.flexWrap,
      Render: ({ label, style, ...props }) => (
        <FieldRender
          label={label}
          canClear={!!props.value}
          onClear={props.onChange}
          hidden={
            !['flex', 'inline-flex'].includes(style?.display || '') ||
            !['row', 'row-reverse'].includes(style?.flexDirection || 'row')
          }
          inputFiled={
            <ConstInput
              {...props}
              displayAs="radio"
              options={[
                {
                  value: 'wrap',
                  label: '换行',
                  icon: <WrapIcon />,
                },
                {
                  value: 'nowrap',
                  label: '不换行',
                  icon: <NowrapIcon />,
                },
              ]}
            />
          }
        />
      ),
    },
    gap: {
      groupKey: 'layout',
      label: proLabelConfig.gap,
      Render: ({ label, style, ...props }) => (
        <FieldRender
          label={label}
          canClear={!!props.value}
          onClear={props.onChange}
          hidden={!['flex', 'inline-flex'].includes(style?.display || '')}
          inputFiled={<LengthInput {...props} />}
        />
      ),
    },
    gridAutoFlow: {
      groupKey: 'layout',
      label: proLabelConfig.gridAutoFlow,
      Render: ({ label, style, ...props }) => (
        <FieldRender
          label={label}
          canClear={!!props.value}
          onClear={props.onChange}
          hidden={!['grid', 'inline-grid'].includes(style?.display || '')}
          inputFiled={
            <ConstInput
              {...props}
              defaultValue="row"
              displayAs="radio"
              options={[
                {
                  value: 'row',
                  label: '横向',
                  icon: <DirectionRowIcon />,
                },
                {
                  value: 'column',
                  label: '纵向',
                  icon: <DirectionRowIcon style={{ rotate: '90deg' }} />,
                },
                {
                  value: 'row dense',
                  label: '横向紧凑',
                  icon: <DirectionRowDenseIcon />,
                },
                {
                  value: 'column dense',
                  label: '纵向紧凑',
                  icon: <DirectionRowDenseIcon style={{ rotate: '90deg' }} />,
                },
              ]}
            />
          }
        />
      ),
    },
    justifyContent: {
      groupKey: 'layout',
      label: proLabelConfig.justifyContent,
      Render: ({ label, style, ...props }) => (
        <FieldRender
          label={label}
          canClear={!!props.value}
          onClear={props.onChange}
          hidden={!['flex', 'inline-flex', 'grid', 'inline-grid'].includes(style?.display || '')}
          inputFiled={
            <ConstInput
              {...props}
              defaultValue="start"
              displayAs="radio"
              options={[
                {
                  value: 'start',
                  label: '起始对其',
                  icon: <JustifyLeftIcon />,
                },
                {
                  value: 'center',
                  label: '居中对齐',
                  icon: <JustifyCenterIcon />,
                },
                {
                  value: 'end',
                  label: '结束对其',
                  icon: <JustifyRightIcon />,
                },
                {
                  value: 'stretch',
                  label: '铺满',
                  icon: <JustifyStretchIcon />,
                },
                {
                  value: 'space-between',
                  label: '中间留白',
                  icon: <SpaceBetweenIcon />,
                },
                {
                  value: 'space-around',
                  label: '四周留白',
                  icon: <SpaceAroundIcon />,
                },
              ]}
            />
          }
        />
      ),
    },
    alignItems: {
      groupKey: 'layout',
      label: proLabelConfig.alignItems,
      Render: ({ label, style, ...props }) => (
        <FieldRender
          label={label}
          canClear={!!props.value}
          onClear={props.onChange}
          hidden={!['flex', 'inline-flex', 'grid', 'inline-grid'].includes(style?.display || '')}
          inputFiled={
            <ConstInput
              {...props}
              defaultValue="start"
              displayAs="radio"
              options={[
                {
                  value: 'start',
                  label: '起始对其',
                  icon: <AlignStartIcon />,
                },
                {
                  value: 'center',
                  label: '居中对齐',
                  icon: <AlignCenterIcon />,
                },
                {
                  value: 'end',
                  label: '结束对其',
                  icon: <AlignEndIcon />,
                },
                {
                  value: 'stretch',
                  label: '铺满',
                  icon: <AlignStretchIcon />,
                },
              ]}
            />
          }
        />
      ),
    },
    gridTemplate: {
      groupKey: 'layout',
      label: proLabelConfig.gridTemplate,
      Render: ({ label, style, ...props }) => (
        <FieldRender
          label={label}
          canClear={!!props.value}
          onClear={props.onChange}
          hidden={!['grid', 'inline-grid'].includes(style?.display || '')}
          inputFiled={<AxiosArraySpaceInput {...props} supportFr />}
        />
      ),
    },
    gridGap: {
      groupKey: 'layout',
      label: proLabelConfig.gridGap,
      Render: ({ label, style, ...props }) => (
        <FieldRender
          label={label}
          canClear={!!props.value}
          onClear={props.onChange}
          hidden={!['grid', 'inline-grid'].includes(style?.display || '')}
          inputFiled={<AxiosLengthInput {...props} />}
        />
      ),
    },
    flex: {
      groupKey: 'layout',
      label: proLabelConfig.flex,
      Render: ({ label, style, onChangeStyle, onMergeStyle, ...props }) => (
        <FieldRender
          label={label}
          canClear={!!props.value}
          onClear={props.onChange}
          inputFiled={<NumberInput {...props} />}
        />
      ),
    },
    // size
    width: {
      groupKey: 'size',
      label: proLabelConfig.width,
      Render: ({ label, style, ...props }) => (
        <FieldRender
          label={label}
          canClear={!!props.value}
          onClear={props.onChange}
          inputFiled={<SpaceInput {...props} />}
        />
      ),
    },
    minWidth: {
      groupKey: 'size',
      label: proLabelConfig.minWidth,
      Render: ({ label, style, ...props }) => (
        <FieldRender
          label={label}
          canClear={!!props.value}
          onClear={props.onChange}
          inputFiled={<SpaceInput {...props} />}
        />
      ),
    },
    maxWidth: {
      groupKey: 'size',
      label: proLabelConfig.maxWidth,
      Render: ({ label, style, ...props }) => (
        <FieldRender
          label={label}
          canClear={!!props.value}
          onClear={props.onChange}
          inputFiled={<SpaceInput {...props} />}
        />
      ),
    },
    height: {
      groupKey: 'size',
      label: proLabelConfig.height,
      Render: ({ label, style, ...props }) => (
        <FieldRender
          label={label}
          canClear={!!props.value}
          onClear={props.onChange}
          inputFiled={<SpaceInput {...props} />}
        />
      ),
    },
    minHeight: {
      groupKey: 'size',
      label: proLabelConfig.minHeight,
      Render: ({ label, style, ...props }) => (
        <FieldRender
          label={label}
          canClear={!!props.value}
          onClear={props.onChange}
          inputFiled={<SpaceInput {...props} />}
        />
      ),
    },
    maxHeight: {
      groupKey: 'size',
      label: proLabelConfig.maxHeight,
      Render: ({ label, style, ...props }) => (
        <FieldRender
          label={label}
          canClear={!!props.value}
          onClear={props.onChange}
          inputFiled={<SpaceInput {...props} />}
        />
      ),
    },
    // space
    margin: {
      groupKey: 'space',
      label: proLabelConfig.margin,
      Render: ({ label, style, ...props }) => (
        <FieldRender
          label={label}
          canClear={!!props.value}
          onClear={props.onChange}
          inputFiled={<DirectionLengthInput {...props} />}
        />
      ),
    },
    padding: {
      groupKey: 'space',
      label: proLabelConfig.padding,
      Render: ({ label, style, ...props }) => (
        <FieldRender
          label={label}
          canClear={!!props.value}
          onClear={props.onChange}
          inputFiled={<DirectionLengthInput {...props} />}
        />
      ),
    },
    // decoration
    color: {
      groupKey: 'decoration',
      label: proLabelConfig.color,
      Render: ({ label, style, ...props }) => (
        <FieldRender
          label={label}
          canClear={!!props.value}
          onClear={props.onChange}
          inputFiled={<ColorInput {...props} />}
        />
      ),
    },
    opacity: {
      groupKey: 'decoration',
      label: proLabelConfig.opacity,
      Render: ({ label, style, onChangeStyle, onMergeStyle, ...props }) => (
        <FieldRender
          label={label}
          canClear={!!props.value}
          onClear={props.onChange}
          inputFiled={<NumberInput {...props} min={0} max={1} step={0.1} />}
        />
      ),
    },
    background: {
      groupKey: 'decoration',
      label: proLabelConfig.background,
      Render: ({ label, style, ...props }) => (
        <FieldRender
          label={label}
          canClear={!!props.value}
          onClear={props.onChange}
          inputFiled={<BackgroundInput {...props} />}
        />
      ),
    },
    backgroundClip: {
      groupKey: 'decoration',
      label: proLabelConfig.backgroundClip,
      Render: ({ label, style, ...props }) => (
        <FieldRender
          label={label}
          canClear={!!props.value}
          onClear={props.onChange}
          inputFiled={
            <ConstInput
              {...props}
              defaultValue="border-box"
              displayAs="radio"
              options={[
                {
                  value: 'border-box',
                  label: '边框',
                },
                {
                  value: 'padding-box',
                  label: '内边距',
                },
                {
                  value: 'content-box',
                  label: '内容',
                },
                {
                  value: 'text',
                  label: '文本',
                },
              ]}
            />
          }
        />
      ),
    },
    filter: {
      groupKey: 'decoration',
      label: proLabelConfig.filter,
      Render: ({ label, style, ...props }) => (
        <FieldRender
          label={label}
          canClear={!!props.value}
          onClear={props.onChange}
          inputFiled={<FilterInput {...props} />}
        />
      ),
    },
    // border
    borderWidth: {
      groupKey: 'border',
      label: proLabelConfig.borderWidth,
      Render: ({ label, style, ...props }) => (
        <FieldRender
          label={label}
          canClear={!!props.value}
          onClear={props.onChange}
          inputFiled={<DirectionLengthInput {...props} />}
        />
      ),
    },
    borderStyle: {
      groupKey: 'border',
      label: proLabelConfig.borderStyle,
      Render: ({ label, style, ...props }) => (
        <FieldRender
          label={label}
          canClear={!!props.value}
          onClear={props.onChange}
          inputFiled={
            <DirectionConstInput
              {...props}
              options={[
                { value: 'solid', label: '实线', icon: <SolidLineIcon /> },
                { value: 'dashed', label: '虚线', icon: <DashedLineIcon /> },
                { value: 'dotted', label: '点线', icon: <DottedLineIcon /> },
                { value: 'double', label: '双实线', icon: <DoubleLineIcon /> },
              ]}
            />
          }
        />
      ),
    },
    borderColor: {
      groupKey: 'border',
      label: proLabelConfig.borderColor,
      Render: ({ label, style, ...props }) => (
        <FieldRender
          label={label}
          canClear={!!props.value}
          onClear={props.onChange}
          inputFiled={<DirectionColorInput {...props} />}
        />
      ),
    },
    borderRadius: {
      groupKey: 'border',
      label: proLabelConfig.borderRadius,
      Render: ({ label, style, ...props }) => (
        <FieldRender
          label={label}
          canClear={!!props.value}
          onClear={props.onChange}
          inputFiled={<DirectionLengthInput {...props} />}
        />
      ),
    },
    outline: {
      groupKey: 'border',
      label: proLabelConfig.outline,
      Render: ({ label, style, ...props }) => (
        <FieldRender
          label={label}
          canClear={!!props.value}
          onClear={props.onChange}
          inputFiled={<BorderInput {...props} />}
        />
      ),
    },
    // position
    position: {
      groupKey: 'position',
      label: proLabelConfig.position,
      Render: ({ label, style, ...props }) => (
        <FieldRender
          label={label}
          canClear={!!props.value}
          onClear={() => {
            const newStyle = { ...style }

            delete newStyle.position
            delete newStyle.top
            delete newStyle.right
            delete newStyle.bottom
            delete newStyle.left

            props.onChangeStyle?.(newStyle)
          }}
          inputFiled={
            <PositionInput
              disabled={props.disabled}
              value={props.value}
              styleDefine={style}
              onChangeStyle={props.onChangeStyle}
            />
          }
        />
      ),
    },
    zIndex: {
      groupKey: 'position',
      label: proLabelConfig.zIndex,
      Render: ({ label, style, onChangeStyle, onMergeStyle, ...props }) => (
        <FieldRender
          label={label}
          canClear={!!props.value}
          onClear={props.onChange}
          inputFiled={<NumberInput {...props} step={1} precision={0} />}
        />
      ),
    },
    //font
    fontSize: {
      groupKey: 'font',
      label: proLabelConfig.fontSize,
      Render: ({ label, style, ...props }) => (
        <FieldRender
          label={label}
          canClear={!!props.value}
          onClear={props.onChange}
          inputFiled={<LengthInput {...props} />}
        />
      ),
    },
    fontWeight: {
      groupKey: 'font',
      label: proLabelConfig.fontWeight,
      Render: ({ label, style, ...props }) => (
        <FieldRender
          label={label}
          canClear={!!props.value}
          onClear={props.onChange}
          inputFiled={
            <ConstInput
              {...props}
              displayAs="radio"
              options={[
                {
                  value: 'normal',
                  label: '普通',
                },
                {
                  value: 'bold',
                  label: '加粗',
                },
              ]}
            />
          }
        />
      ),
    },
    fontStyle: {
      groupKey: 'font',
      label: proLabelConfig.fontStyle,
      Render: ({ label, style, ...props }) => (
        <FieldRender
          label={label}
          canClear={!!props.value}
          onClear={props.onChange}
          inputFiled={
            <ConstInput
              {...props}
              displayAs="radio"
              options={[
                {
                  value: 'normal',
                  label: '普通',
                },
                {
                  value: 'italic',
                  label: '斜体',
                },
              ]}
            />
          }
        />
      ),
    },
    fontFamily: {
      groupKey: 'font',
      label: proLabelConfig.fontFamily,
      Render: ({ label, style, ...props }) => (
        <FieldRender
          label={label}
          canClear={!!props.value}
          onClear={props.onChange}
          inputFiled={<FontFamilyInput {...props} />}
        />
      ),
    },
    // transform
    transform: {
      groupKey: 'transform',
      label: proLabelConfig.transform,
      Render: ({ label, style, ...props }) => (
        <FieldRender
          label={label}
          canClear={!!props.value}
          onClear={props.onChange}
          inputFiled={<TransformInput {...props} />}
        />
      ),
    },
    transition: {
      groupKey: 'transform',
      label: proLabelConfig.transition,
      Render: ({ label, style, ...props }) => (
        <FieldRender
          label={label}
          canClear={!!props.value}
          onClear={props.onChange}
          inputFiled={<TransitionInput {...props} />}
        />
      ),
    },
    // other
    boxShadow: {
      groupKey: 'other',
      label: proLabelConfig.boxShadow,
      Render: ({ label, style, ...props }) => (
        <FieldRender
          label={label}
          canClear={!!props.value}
          onClear={props.onChange}
          inputFiled={<BoxShadowInput {...props} />}
        />
      ),
    },
    boxSizing: {
      groupKey: 'other',
      label: proLabelConfig.boxSizing,
      Render: ({ label, style, ...props }) => (
        <FieldRender
          label={label}
          canClear={!!props.value}
          onClear={props.onChange}
          inputFiled={
            <ConstInput
              {...props}
              displayAs="radio"
              options={[
                {
                  value: 'content-box',
                  label: '内容模型',
                },
                {
                  value: 'border-box',
                  label: '边框模型',
                },
              ]}
            />
          }
        />
      ),
    },
    cursor: {
      groupKey: 'other',
      label: proLabelConfig.cursor,
      Render: ({ label, style, ...props }) => (
        <FieldRender
          label={label}
          canClear={!!props.value}
          onClear={props.onChange}
          inputFiled={<CursorInput {...props} />}
        />
      ),
    },
    overflow: {
      groupKey: 'other',
      label: proLabelConfig.overflow,
      Render: ({ label, style, ...props }) => (
        <FieldRender
          label={label}
          canClear={!!props.value}
          onClear={props.onChange}
          inputFiled={
            <AxiosConstInput
              {...props}
              displayAs="radio"
              options={[
                {
                  value: 'hidden',
                  label: '隐藏',
                },
                {
                  value: 'visible',
                  label: '显示',
                },
                {
                  value: 'auto',
                  label: '自动',
                },
                {
                  value: 'scroll',
                  label: '滚动',
                },
              ]}
            />
          }
        />
      ),
    },
  },
}

export default defaultConfig

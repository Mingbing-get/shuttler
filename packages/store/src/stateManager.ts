import { generateId } from '@shuttler/helper'
import EventManager from '@shuttler/helper/src/event'

import ElementManager from './elementManager'
import { ShuttlerState } from './types'

interface EventMap {
  changeRoot: {
    id: string
    editor: ShuttlerState.RootEditor
  }
}

export default class StateManager extends EventManager<EventMap> {
  readonly elementManager: ElementManager

  private state: ShuttlerState.Desc = {
    editorMap: {},
    elementMap: {},
  }
  private rootId: string

  constructor(elementManager?: ElementManager) {
    super()

    this.elementManager = elementManager || new ElementManager()

    // 初始化 root 编辑器
    this.rootId = generateId()

    const rootEditor: ShuttlerState.RootEditor = {
      type: 'root',
      elements: [],
    }

    this.state.editorMap = {
      [this.rootId]: rootEditor,
    }
  }

  resetState(state: ShuttlerState.Desc) {
    this.state.editorMap = state.editorMap
    this.state.elementMap = state.elementMap

    for (const id in this.state.editorMap) {
      const editor = this.state.editorMap[id]
      if (!this.isRootEditor(editor)) continue

      this.rootId = id
      this.emit('changeRoot', {
        id,
        editor,
      })
      break
    }
  }

  getRootId() {
    return this.rootId
  }

  getRoot() {
    return this.state.editorMap[this.rootId] as ShuttlerState.RootEditor
  }

  getEditor(id: string) {
    return this.state.editorMap[id]
  }

  getElement(id: string) {
    return this.state.elementMap[id]
  }

  isRootEditor(editor: ShuttlerState.Editor): editor is ShuttlerState.RootEditor {
    return editor.type === 'root'
  }

  isModalEditor(editor: ShuttlerState.Editor): editor is ShuttlerState.ModalEditor {
    return editor.type === 'modal'
  }

  isSlotEditor(editor: ShuttlerState.Editor): editor is ShuttlerState.SlotEditor {
    return editor.type === 'slot'
  }
}

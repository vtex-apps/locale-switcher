import React, { useRef } from 'react'
import classnames from 'classnames'
import { useCssHandles } from 'vtex.css-handles'

import useEnhancedEffect from './modules/useEnhancedEffect'
import ownerDocument from './modules/ownerDocument'

interface Props {
  children: React.ReactNode
}

const CSS_HANDLES = ['list'] as const

type ChangeFocusFn = (
  list: HTMLUListElement,
  currentFocus: Element | null | undefined
) => Element | null

const nextItem: ChangeFocusFn = (list, currentFocus) => {
  if (list === currentFocus) {
    return list.firstChild as Element
  }
  if (currentFocus?.nextElementSibling) {
    return currentFocus.nextElementSibling
  }
  return list.firstChild as Element
}

const previousItem: ChangeFocusFn = (list, currentFocus) => {
  if (list === currentFocus) {
    return list.lastChild as Element
  }
  if (currentFocus?.previousElementSibling) {
    return currentFocus.previousElementSibling
  }
  return list.lastChild as Element
}

function moveFocus(
  list: HTMLUListElement,
  currentFocus: HTMLElement | null | undefined,
  changeFocusFn: ChangeFocusFn
) {
  let passedThroughFirst = false
  let nextFocus = changeFocusFn(list, currentFocus)
  while (nextFocus) {
    // Prevent infinite loop
    if (nextFocus === list.firstChild) {
      if (passedThroughFirst) {
        return false
      }
      passedThroughFirst = true
    }

    if (!nextFocus.hasAttribute('tabindex') || (nextFocus as any).disabled) {
      nextFocus = changeFocusFn(list, nextFocus)
    } else {
      ;(nextFocus as HTMLElement).focus()
      return true
    }
  }
}

export default function SwitcherListV2(props: Props) {
  const { children } = props
  const handles = useCssHandles(CSS_HANDLES)
  const listRef = useRef<HTMLUListElement>(null)

  useEnhancedEffect(() => {
    listRef.current?.focus()
  }, [])

  const classes = classnames(handles.list, 'list ma0 pa0 outline-0')

  const handleKeyDown: React.KeyboardEventHandler = e => {
    const list = listRef.current as HTMLUListElement
    const { key } = e
    const currentFocus = ownerDocument(list).activeElement as HTMLElement

    if (key === 'ArrowDown') {
      e.preventDefault()
      moveFocus(list, currentFocus, nextItem)
    } else if (key === 'ArrowUp') {
      e.preventDefault()
      moveFocus(list, currentFocus, previousItem)
    } else if (key === 'Home') {
      e.preventDefault()
      moveFocus(list, null, nextItem)
    } else if (key === 'End') {
      e.preventDefault()
      moveFocus(list, null, previousItem)
    }
  }

  return (
    <ul
      role="menu"
      ref={listRef}
      tabIndex={-1}
      className={classes}
      onKeyDown={handleKeyDown}
    >
      {children}
    </ul>
  )
}

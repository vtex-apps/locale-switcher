import React, { useCallback } from 'react'
import classnames from 'classnames'
import { useRuntime } from 'vtex.render-runtime'
import { useCssHandles } from 'vtex.css-handles'
import { PopoverContext } from 'vtex.popover-layout'

type DisplayMode = 'default' | 'none'

interface Props {
  children: React.ReactNode
  label?: string
  localeId: string
  display?: DisplayMode
}

const CSS_HANDLES = ['listItem', 'itemLabel', 'contentWrapper']

const { usePopoverDispatch } = PopoverContext

export default function SwitcherListItem(props: Props) {
  const { children, label, localeId, display = 'default' } = props
  const handles = useCssHandles(CSS_HANDLES)
  const { emitter } = useRuntime()
  const dispatch = usePopoverDispatch()

  const handleClick = useCallback(() => {
    emitter.emit('localesChanged', localeId)

    if (dispatch) {
      dispatch({ type: 'CLOSE_POPOVER' })
    }
  }, [localeId, emitter, dispatch])

  const handleKeyDown: React.KeyboardEventHandler = useCallback(
    e => {
      if (e.key !== 'Enter') {
        return
      }
      e.stopPropagation()
      handleClick()
    },
    [handleClick]
  )

  if (display === 'none') {
    return null
  }

  const classes = classnames(
    handles.listItem,
    'ph6 pv3 hover-bg-muted-5 pointer outline-0'
  )

  return (
    <li
      tabIndex={0}
      role="menuitem"
      className={classes}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {children && <div className={handles.contentWrapper}>{children}</div>}
      {label && <span className={handles.itemLabel}>{label}</span>}
    </li>
  )
}

import React, { useCallback } from 'react'
import classnames from 'classnames'
import { defineMessages } from 'react-intl'
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

const CSS_HANDLES = ['listItem', 'itemLabel', 'contentWrapper'] as const

const { usePopoverDispatch } = PopoverContext

function SwitcherListItem(props: Props) {
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

  const hasChildren = React.Children.toArray(children).length > 0

  const classes = classnames(
    handles.listItem,
    'ph6 pv3 hover-bg-muted-5 pointer outline-0',
    {
      flex: hasChildren,
    }
  )

  return (
    <li
      tabIndex={0}
      role="menuitem"
      className={classes}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {hasChildren && <div className={handles.contentWrapper}>{children}</div>}
      {label && <span className={handles.itemLabel}>{label}</span>}
    </li>
  )
}

defineMessages({
  title: {
    id: 'admin/editor.locale-switcher.title',
  },
  displayTitle: {
    id: 'admin/editor.locale-switcher.display.title',
  },
  displayDescription: {
    id: 'admin/editor.locale-switcher.display.description',
  },
  displayDefault: {
    id: 'admin/editor.locale-switcher.display.default',
  },
  displayNone: {
    id: 'admin/editor.locale-switcher.display.none',
  },
  labelTitle: {
    id: 'admin/editor.locale-switcher.label.title',
  },
  labelDescription: {
    id: 'admin/editor.locale-switcher.label.description',
  },
})

SwitcherListItem.schema = {
  title: 'admin/editor.locale-switcher.title',
}

export default SwitcherListItem

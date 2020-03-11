import React from 'react'
import { Spinner } from 'vtex.styleguide'
import classnames from 'classnames'

interface Props {
  handles: Record<string, string>
}

export default function Loading(props: Props) {
  const { handles } = props

  const classes = classnames(
    handles.loadingContainer,
    'absolute z-5 list top-1 pa6 mh0 mt4 bg-base flex items-center justify-center'
  )

  return (
    <div className={classes}>
      <Spinner color="currentColor" size={26} />
    </div>
  )
}

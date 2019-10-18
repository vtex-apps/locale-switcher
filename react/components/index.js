import React, { useState, useEffect, useMemo } from 'react'
import { graphql } from 'react-apollo'
import { useRuntime } from 'vtex.render-runtime'
import { IconGlobe } from 'vtex.store-icons'
import Locales from './queries/locales.gql'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = ['container', 'button', 'buttonText', 'list', 'listElement']

function getLabel(localeId) {
  return localeId.split('-')[0]
}

function getSupportedLanguages(data) {
  if (data.loading || data.error || !data.languages || !data.languages.supported) {
    return []
  }

  const supportedLanguages = data.languages.supported.reduce((acc, lang) => {
    if (!lang.includes('-')) {
      return acc
    }

    return acc.concat({
      text: getLabel(lang),
      localeId: lang
    })
  }, [])

  return supportedLanguages
}

const LocaleSwitcher = ({ data }) => {
  const supportedLangs = useMemo(() => getSupportedLanguages(data), [data])
  const { culture, emitter } = useRuntime()
  const [openLocaleSelector, setOpenLocaleSelector] = useState(false)
  const [selectedLocale, setSelectedLocale] = useState(null)
  const handles = useCssHandles(CSS_HANDLES)

  useEffect(() => {
    const localeObj = supportedLangs.find(
      ({ localeId }) => getLabel(localeId) === getLabel(culture.locale)
    )
    const selectedLocale = localeObj || supportedLangs && supportedLangs[0]

    setSelectedLocale(selectedLocale)
  }, [supportedLangs, culture.locale])

  const handleLocaleClick = id => {
    emitter.emit('localesChanged', id)
    setOpenLocaleSelector(false)
    setSelectedLocale(findLocale(id))
  }

  const handleMouseDown = e => {
    e.preventDefault()
  }

  if (supportedLangs.length === 0 || !selectedLocale) {
    return null
  }

  const containerClasses = `${handles.container} w3 flex items-center justify-end ml2 mr3 relative`
  const buttonClasses = `${handles.button} link pa0 bg-transparent bn flex items-center pointer mr3 c-on-base`
  const buttonTextClasses = `${handles.buttonText} pl2 t-action--small order-1`
  const listClasses = `${handles.list} absolute z-5 list top-1 w3 ph0 mh0 mv4 bg-base`
  const listElementClasses = `${handles.listelement} t-action--small pointer f5 pa3 hover-bg-muted-5 tc`

  return (
    <div className={containerClasses}>
      <button
        className={buttonClasses}
        onBlur={() => setOpenLocaleSelector(false)}
        onClick={() => setOpenLocaleSelector(!openLocaleSelector)}
      >
        <IconGlobe />
        <span className={buttonTextClasses}>{selectedLocale.text}</span>
      </button>
      <ul
        hidden={!openLocaleSelector}
        className={listClasses}
      >
        {supportedLangs
        .filter(({ localeId }) => localeId !== selectedLocale.localeId)
        .map(({ localeId, text }) => (
          <li
            key={localeId}
            onMouseDown={handleMouseDown}
            className={listElementClasses}
            onClick={() => handleLocaleClick(localeId)}
          >
            {text}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default graphql(Locales)(LocaleSwitcher)

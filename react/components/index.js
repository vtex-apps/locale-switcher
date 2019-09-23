import React, { useState, useEffect, useMemo } from 'react'
import { graphql } from 'react-apollo'
import { useRuntime } from 'vtex.render-runtime'
import { IconGlobe } from 'vtex.store-icons'
import Locales from './queries/locales.gql'

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

  return (
    <div className="w3 flex items-center justify-end ml2 mr3 relative">
      <button
        onClick={() => setOpenLocaleSelector(!openLocaleSelector)}
        onBlur={() => setOpenLocaleSelector(false)}
        className="link pa0 bg-transparent bn flex items-center pointer mr3 c-on-base"
      >
        <IconGlobe />
        <span className="pl2 t-action--small order-1">{selectedLocale.text}</span>
      </button>
      <ul
        hidden={!openLocaleSelector}
        className="absolute z-5 list top-1 w3 ph0 mh0 mv4 bg-base"
      >
        {supportedLangs
        .filter(({ localeId }) => localeId !== selectedLocale.localeId)
        .map(({ localeId, text }) => (
          <li
            className="t-action--small pointer f5 pa3 hover-bg-muted-5 tc"
            onClick={() => handleLocaleClick(localeId)}
            onMouseDown={handleMouseDown}
            key={localeId}
          >
            {text}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default graphql(Locales)(LocaleSwitcher)

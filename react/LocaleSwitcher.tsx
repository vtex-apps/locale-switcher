import React, { useState, FC } from 'react'
import { useQuery } from 'react-apollo'
import { useRuntime } from 'vtex.render-runtime'
import { IconGlobe } from 'vtex.store-icons'
import { useCssHandles } from 'vtex.css-handles'

import Locales from './graphql/locales.gql'

const CSS_HANDLES = [
  'container',
  'relativeContainer',
  'button',
  'buttonText',
  'list',
  'listElement',
  'localeIdText',
]

interface LocalesQuery {
  languages: {
    default: string
    supported: string[]
  }
  currentBinding: {
    supportedLocales: string[]
  } | null
}

interface SupportedLanguage {
  text: string
  localeId: string
}

function getLabel(localeId: string) {
  return localeId.split('-')[0]
}

function getLocale(supportedLangs: SupportedLanguage[], locale: string) {
  const localeObj = supportedLangs.find(
    ({ localeId }) => getLabel(localeId) === getLabel(locale)
  )
  return (
    localeObj ??
    (supportedLangs?.[0] || {
      text: getLabel(locale),
      localeId: locale,
    })
  )
}

function getSupportedLangs(langs: string[]) {
  return langs.reduce((acc: SupportedLanguage[], lang: string) => {
    if (!lang.includes('-')) {
      return acc
    }

    return acc.concat({
      text: getLabel(lang),
      localeId: lang,
    })
  }, [])
}

const LocaleSwitcher: FC = () => {
  const { data, loading, error } = useQuery<LocalesQuery>(Locales)
  const { culture, emitter } = useRuntime()
  const [openLocaleSelector, setOpenLocaleSelector] = useState(false)

  const supportedLanguages =
    data?.currentBinding?.supportedLocales ?? data?.languages?.supported ?? []
  const supportedLangs = getSupportedLangs(supportedLanguages)

  const [selectedLocale, setSelectedLocale] = useState(() =>
    getLocale(supportedLangs, culture?.locale)
  )
  const handles = useCssHandles(CSS_HANDLES)

  const handleLocaleClick = (id: SupportedLanguage['localeId']) => {
    setOpenLocaleSelector(false)
    setSelectedLocale(getLocale(supportedLangs, id))
    emitter.emit('localesChanged', id)
  }

  if (loading || error || supportedLangs.length === 0) {
    return null
  }

  const containerClasses = `${handles.container} w3 flex items-center justify-end ml2 mr3 relative`
  const buttonClasses = `${handles.button} link pa0 bg-transparent bn flex items-center pointer mr3 c-on-base`
  const buttonTextClasses = `${handles.buttonText} pl2 t-action--small order-1`
  const listClasses = `${handles.list} absolute z-5 list top-1 w3 ph0 mh0 mt4 bg-base`
  const listElementClasses = `${handles.listElement} t-action--small pointer f5 pa3 hover-bg-muted-5 tc`

  return (
    <div className={containerClasses}>
      <div className={`${handles.relativeContainer} relative`}>
        <button
          className={buttonClasses}
          onBlur={() => setOpenLocaleSelector(false)}
          onClick={() => setOpenLocaleSelector(!openLocaleSelector)}
        >
          <IconGlobe />
          <span className={buttonTextClasses}>{selectedLocale.text}</span>
        </button>
        <ul hidden={!openLocaleSelector} className={listClasses}>
          {supportedLangs
            .filter(({ localeId }) => localeId !== selectedLocale.localeId)
            .map(({ localeId, text }) => (
              <li key={localeId} className={listElementClasses}>
                <span
                  role="link"
                  tabIndex={-1}
                  className={`${handles.localeIdText} w-100`}
                  onMouseDown={e => e.preventDefault()}
                  onClick={() => handleLocaleClick(localeId)}
                  onKeyDown={() => handleLocaleClick(localeId)}
                >
                  {text}
                </span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default LocaleSwitcher

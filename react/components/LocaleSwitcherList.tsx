import React from 'react'
import { useQuery } from 'react-apollo'
import { SupportedLanguage } from 'langs'
import { useCssHandles } from 'vtex.css-handles'

import Spinner from './Spinner'
import getLabel from '../modules/getLabel'
import LOCALES from '../graphql/locales.gql'
import getSupportedLangs from '../modules/getSupportedLangs'

interface Props {
  open?: boolean
  selectedLocale: SupportedLanguage
  onItemClick: (selectedLang: SupportedLanguage) => void
}

interface LocalesQuery {
  languages: {
    default: string
    supported: string[]
  }
  currentBinding: {
    supportedLocales: string[]
  } | null
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

const CSS_HANDLES = [
  'list',
  'listElement',
  'localeIdText',
  'loadingContainer',
] as const

export default function LocaleSwitcherList(props: Props) {
  const { open = false, onItemClick, selectedLocale } = props
  const handles = useCssHandles(CSS_HANDLES)
  const { data, loading, error } = useQuery<LocalesQuery>(LOCALES)

  const supportedLanguages =
    data?.currentBinding?.supportedLocales ?? data?.languages?.supported ?? []
  const supportedLangs = getSupportedLangs(supportedLanguages)

  if (loading && open) {
    return <Spinner handles={handles} />
  }

  if (error || supportedLangs.length === 0) {
    return null
  }

  const handleItemClick = (id: SupportedLanguage['localeId']) => {
    onItemClick(getLocale(supportedLangs, id))
  }

  const listClasses = `${handles.list} absolute z-5 list top-1 w3 ph0 mh0 mt4 bg-base`
  const listElementClasses = `${handles.listElement} t-action--small pointer f5 pa3 hover-bg-muted-5 tc`

  return (
    <ul hidden={!open} className={listClasses}>
      {supportedLangs
        .filter(({ localeId }) => localeId !== selectedLocale.localeId)
        .map(({ localeId, text }) => (
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
          <li
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
            role="link"
            tabIndex={-1}
            key={localeId}
            className={listElementClasses}
            onClick={() => handleItemClick(localeId)}
            onKeyDown={() => handleItemClick(localeId)}
            onMouseDown={e => e.preventDefault()}
          >
            <span className={`${handles.localeIdText} w-100`}>{text}</span>
          </li>
        ))}
    </ul>
  )
}

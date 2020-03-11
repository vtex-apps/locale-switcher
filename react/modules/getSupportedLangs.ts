import { SupportedLanguage } from 'langs'

import getLabel from './getLabel'

export default function getSupportedLangs(langs: string[]) {
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

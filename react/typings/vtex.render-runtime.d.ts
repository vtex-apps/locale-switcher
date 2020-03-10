/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* Typings for `render-runtime` */
declare module 'vtex.render-runtime' {
  import { Component, ComponentType, ReactElement, ReactType } from 'react'

  export interface NavigationOptions {
    page: string
    params?: any
  }

  export interface RenderContextProps {
    runtime: {
      navigate: (options: NavigationOptions) => void
    }
  }

  interface ExtensionPointProps {
    id: string
    [key: string]: any
  }

  export const ExtensionPoint: ComponentType<ExtensionPointProps>

  interface ChildBlockProps {
    id: string
  }

  export interface Culture {
    availableLocales: string[]
    locale: string
    language: string
    country: string
    currency: string
  }

  interface RenderContext {
    culture: Culture
    emitter: any
  }

  export const ChildBlock: ComponentType<ChildBlockProps>
  export const useChildBlock = function({ id: string }): object {}

  export const Helmet: ReactElement
  export const Link: ReactType
  export const NoSSR: ReactElement
  export const RenderContextConsumer: ReactElement
  export const canUseDOM: boolean
  export const useRuntime: () => RenderContext
  export const withRuntimeContext: <TOriginalProps extends {}>(
    Component: ComponentType<TOriginalProps & RenderContextProps>
  ) => ComponentType<TOriginalProps>
}

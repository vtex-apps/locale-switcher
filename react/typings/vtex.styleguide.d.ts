/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'vtex.styleguide' {
  import { ComponentType } from 'react'

  export const Input: ComponentType<Props>
  export const Spinner: ComponentType<Props>

  interface Props {
    [key: string]: any
  }
}

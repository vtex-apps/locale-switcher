declare module 'vtex.css-handles' {
  export function useCssHandles<ClassKey extends string = string>(
    handles: readonly ClassKey[]
  ): Record<ClassKey, string>
}

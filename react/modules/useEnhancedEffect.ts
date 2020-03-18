import { canUseDOM } from 'vtex.render-runtime'
import { useLayoutEffect, useEffect } from 'react'

const useEnhancedEffect = canUseDOM ? useLayoutEffect : useEffect

export default useEnhancedEffect

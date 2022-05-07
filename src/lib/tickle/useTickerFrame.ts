import { RenderCallback, useFrame } from "@react-three/fiber"
import { clamp } from "three/src/math/MathUtils"
import { useTicker } from "./Ticker"

export const useTickerFrame = (fn: RenderCallback, priority?: number) => {
  const { maxDelta, timeScale } = useTicker()

  useFrame((state, inDelta) => {
    const delta = clamp(inDelta * timeScale, 0, maxDelta)

    /* Run intended callback */
    fn(state, delta)
  }, priority)
}

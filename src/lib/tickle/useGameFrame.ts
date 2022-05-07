import { RenderCallback, useFrame } from "@react-three/fiber"
import { clamp } from "three/src/math/MathUtils"

export const useGameFrame = (fn: RenderCallback, priority?: number) => {
  useFrame((state, inDelta) => {
    /* Clamp delta. TODO: scale it, etc. */
    const delta = clamp(inDelta, 0, 1)

    /* Run intended callback */
    fn(state, delta)
  }, priority)
}

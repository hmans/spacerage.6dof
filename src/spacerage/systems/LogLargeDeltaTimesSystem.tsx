import { FC } from "react"
import { useGameFrame } from "../../lib/tickle"

export const LogLargeDeltaTimesSystem: FC = () => {
  useGameFrame((_, dt) => {
    if (dt > 1) console.warn("Extremely large deltaTime detected:", dt)
  })

  return null
}

import { FC } from "react"
import { useTickerFrame } from "../../lib/tickle"

export const LogLargeDeltaTimesSystem: FC = () => {
  useTickerFrame((_, dt) => {
    if (dt > 1) console.warn("Extremely large deltaTime detected:", dt)
  })

  return null
}

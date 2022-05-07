import { useFrame } from "@react-three/fiber"
import { FC } from "react"

export const LogLargeDeltaTimesSystem: FC = () => {
  useFrame((_, dt) => {
    if (dt > 1) console.warn("Extremely large deltaTime detected:", dt)
  })

  return null
}

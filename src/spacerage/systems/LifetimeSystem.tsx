import { useFrame } from "@react-three/fiber"
import { FC } from "react"
import { ECS } from "../ecs"
import { Update } from "../Update"

export const LifetimeSystem: FC = () => {
  const withLifetime = ECS.world.archetype("lifetime")

  useFrame((_, dt) => {
    for (const entity of withLifetime.entities) {
      entity.lifetime += dt
    }
  }, Update.Early)

  return null
}

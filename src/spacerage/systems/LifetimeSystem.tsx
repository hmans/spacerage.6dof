import { FC } from "react"
import { useGameFrame } from "../../lib/tickle"
import { ECS } from "../ecs"
import { Update } from "../Update"

export const LifetimeSystem: FC = () => {
  const { entities } = ECS.world.archetype("lifetime")

  useGameFrame((_, dt) => {
    for (const entity of entities) {
      entity.lifetime += dt
    }
  }, Update.Early)

  return null
}

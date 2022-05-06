import { useFrame } from "@react-three/fiber"
import { FC } from "react"
import { ECS } from "../ecs"
import { Update } from "../Update"

export const MaxLifetimeSystem: FC = () => {
  const { entities } = ECS.world.archetype("maxLifetime", "lifetime")

  useFrame(() => {
    for (const entity of entities) {
      if (entity.lifetime >= entity.maxLifetime) {
        ECS.world.destroyEntity(entity)
      }
    }
  }, Update.Default)

  return null
}

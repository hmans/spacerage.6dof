import { useFrame } from "@react-three/fiber"
import { ECS } from "../ecs"
import { Update } from "../Update"

export const Systems = () => {
  const { entities } = ECS.useArchetype("transform")

  useFrame((_, dt) => {}, Update.Default)

  return null
}

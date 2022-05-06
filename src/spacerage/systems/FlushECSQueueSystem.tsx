import { useFrame } from "@react-three/fiber"
import { FC } from "react"
import { ECS } from "../ecs"
import { Update } from "../Update"

export const FlushECSQueueSystem: FC = () => {
  useFrame(() => {
    ECS.world.queue.flush()
  }, Update.Late)

  return null
}

import { FC } from "react"
import { useGameFrame } from "../../lib/tickle"
import { ECS } from "../ecs"
import { Update } from "../Update"

export const FlushECSQueueSystem: FC = () => {
  useGameFrame(() => {
    ECS.world.queue.flush()
  }, Update.Late)

  return null
}

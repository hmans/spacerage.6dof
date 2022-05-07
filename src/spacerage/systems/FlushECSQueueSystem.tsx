import { FC } from "react"
import { useTickerFrame } from "../../lib/tickle"
import { ECS } from "../ecs"
import { Update } from "../Update"

export const FlushECSQueueSystem: FC = () => {
  useTickerFrame(() => {
    ECS.world.queue.flush()
  }, Update.Late)

  return null
}

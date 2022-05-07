import { ParticleWorld } from "../entities"

export const flushQueueSystem = (world: ParticleWorld) => {
  return () => {
    world.queue.flush()
  }
}

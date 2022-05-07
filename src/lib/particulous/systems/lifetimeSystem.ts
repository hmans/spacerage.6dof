import { ParticleWorld } from "../entities"

export const lifetimeSystem = (world: ParticleWorld) => {
  const { entities } = world.archetype("lifetime")

  return (dt: number) => {
    for (const entity of entities) {
      if (entity.age >= entity.lifetime) {
        world.queue.destroyEntity(entity)
      }
    }
  }
}

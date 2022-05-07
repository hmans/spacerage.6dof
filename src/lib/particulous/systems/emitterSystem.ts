import { defaultEntity, ParticleWorld } from "../entities"

export const emitterSystem = (world: ParticleWorld) => {
  const { entities } = world.archetype("emitter")

  return () => {
    for (const { emitter, transform } of entities) {
      if (Math.random() > 0.8)
        world.createEntity(defaultEntity(), emitter.factory())

      /* TODO: apply emitter's position, so the particle is spawned relative to it. */
    }
  }
}

import { ParticleWorld } from "../entities"

export const animationSystem = (world: ParticleWorld) => {
  const { entities } = world.archetype("lifetime")

  return (dt: number) => {
    for (const entity of entities) {
      /* Determine lifetime 0..1 */
      const t = entity.age / entity.lifetime

      /* Animate particles */
      if (entity.particle) {
        if (entity.alphaOverLifetime) {
          entity.particle.alpha = entity.alphaOverLifetime(t)
        }
      }
    }
  }
}

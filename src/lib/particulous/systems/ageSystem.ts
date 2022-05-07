import { ParticleWorld } from "../entities"

export const ageSystem = (world: ParticleWorld) => {
  const { entities } = world.archetype("age")

  return (dt: number) => {
    for (const entity of entities) {
      entity.age += dt
    }
  }
}

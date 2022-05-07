import { ParticleWorld } from "../entities"

export const ageSystem = (world: ParticleWorld) => {
  const { entities } = world

  return (dt: number) => {
    for (const entity of entities) {
      entity.age += dt
    }
  }
}

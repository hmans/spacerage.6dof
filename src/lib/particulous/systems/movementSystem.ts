import { Vector3 } from "three"
import { ParticleWorld } from "../entities"

const tmpVec3 = new Vector3()

export const movementSystem = (world: ParticleWorld) => {
  const { entities } = world.archetype("transform", "acceleration", "velocity")

  return (dt: number) => {
    for (const { transform, acceleration, velocity } of entities) {
      /* Apply acceleration to velocity */
      velocity.add(acceleration)

      /* Reset acceleration */
      acceleration.multiplyScalar(0)

      /* Apply velocity to position */
      transform.position.add(tmpVec3.copy(velocity).multiplyScalar(dt))
    }
  }
}

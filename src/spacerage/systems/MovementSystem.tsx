import { Vector3 } from "three"
import { useTickerFrame } from "../../lib/tickle"
import { ECS } from "../ecs"
import { Update } from "../Update"

const tmpVector3 = new Vector3()

export const MovementSystem = () => {
  /* We don't need this component to rerender when entities appear or disappear, so
  we're using `archetype` instead of `useArchetype` here. */
  const { entities } = ECS.world.archetype("transform", "velocity")

  useTickerFrame((_, dt) => {
    for (const { transform, velocity } of entities) {
      transform.position.add(tmpVector3.copy(velocity).multiplyScalar(dt))
    }
  }, Update.Default) // TODO: fixed

  return null
}

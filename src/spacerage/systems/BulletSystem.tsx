import RAPIER from "@dimforge/rapier3d-compat"
import { useFrame } from "@react-three/fiber"
import { FC } from "react"
import { Vector3 } from "three"
import { collisions, usePhysics } from "../../lib/physics3d"
import { ECS } from "../ecs"
import { Layers } from "../Layers"
import { Update } from "../Update"

const ray = new RAPIER.Ray(
  new RAPIER.Vector3(0, 0, 0),
  new RAPIER.Vector3(0, 0, 0)
)

const tmpVector3 = new Vector3()

export const BulletSystem: FC = () => {
  const bullets = ECS.world.archetype("isBullet", "velocity", "transform")
  const { world } = usePhysics()

  useFrame(() => {
    for (const bullet of bullets.entities) {
      /* Perform hit test */
      ray.origin = bullet.transform.position

      ray.dir = tmpVector3
        .set(0, 0, -1)
        .applyQuaternion(bullet.transform.quaternion)

      const hit = world.castRay(
        ray,
        10,
        true,
        collisions(Layers.Bullets, Layers.Asteroids)
      )

      if (hit) {
        /* Destroy bullet */
        ECS.world.queue.destroyEntity(bullet)
      }
    }
  }, Update.Default)

  return null
}

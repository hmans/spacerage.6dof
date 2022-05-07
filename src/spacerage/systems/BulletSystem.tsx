import RAPIER from "@dimforge/rapier3d-compat"
import { FC } from "react"
import { Vector3 } from "three"
import { collisions, usePhysics } from "../../lib/physics3d"
import { useTickerFrame } from "../../lib/tickle"
import { spawnParticleEffect } from "../actions/spawnParticleEffect"
import { ECS } from "../ecs"
import { Layers } from "../Layers"
import { Update } from "../Update"
import { transform } from "../util/transform"

const ray = new RAPIER.Ray(
  new RAPIER.Vector3(0, 0, 0),
  new RAPIER.Vector3(0, 0, 0)
)

const tmpVector3 = new Vector3()

export const BulletSystem: FC = () => {
  const { entities } = ECS.world.archetype("isBullet", "velocity", "transform")
  const { world } = usePhysics()

  useTickerFrame(() => {
    for (const bullet of entities) {
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
        const point = ray.pointAt(hit.toi)

        /* Destroy bullet */
        ECS.world.queue.destroyEntity(bullet)

        /* Spawn particle effect */
        spawnParticleEffect(
          transform(point as Vector3, bullet.transform.quaternion)
        )

        /* Push the object we've hit */
        const collider = world.getCollider(hit.colliderHandle)
        const rigidBody = world.getRigidBody(collider.parent()!)

        rigidBody.applyImpulseAtPoint(
          tmpVector3
            .set(0, 0, -2000)
            .applyQuaternion(bullet.transform.quaternion),
          point,
          true
        )
      }
    }
  }, Update.Default)

  return null
}

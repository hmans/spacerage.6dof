import { plusMinus } from "randomish"
import { Object3D, Vector3 } from "three"
import { ECS } from "../ecs"
import { players } from "./firePlayerWeapons"

export const spawnBullet = (offset: Vector3, jitter = 5) => {
  const player = players.first
  if (!player) return

  const spawnTransform = new Object3D()

  spawnTransform.position
    .copy(offset)
    .applyQuaternion(player.transform.quaternion)
    .add(player.transform.position)

  spawnTransform.quaternion.copy(player.transform.quaternion)

  ECS.world.createEntity({
    isBullet: true,

    spawnTransform,

    velocity: new Vector3(
      plusMinus(jitter),
      plusMinus(jitter),
      -400
    ).applyQuaternion(player.transform.quaternion),

    lifetime: 0,
    maxLifetime: 1
  })
}

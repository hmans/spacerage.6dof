import { plusMinus } from "randomish"
import { Object3D, Vector3 } from "three"
import { ECS } from "../ecs"

const players = ECS.world.archetype("isPlayer", "transform")

const turrets = [new Vector3(-2.75, 0, 0), new Vector3(+2.75, 0, 0)]

export const firePlayerWeapons = () => {
  for (const turret of turrets) {
    spawnBullet(turret)
  }
}

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

import { plusMinus } from "randomish"
import { Vector3 } from "three"
import { ECS } from "../ecs"

const players = ECS.world.archetype("isPlayer", "transform")

const turrets = [new Vector3(-3, 0, -1), new Vector3(+3, 0, -1)]

export const firePlayerWeapons = () => {
  for (const turret of turrets) {
    spawnBullet(turret)
  }
}

export const spawnBullet = (offset: Vector3, jitter = 10) => {
  const player = players.first
  if (!player) return

  ECS.world.createEntity({
    isBullet: true,

    initialPosition: new Vector3()
      .copy(offset)
      .applyQuaternion(player.transform.quaternion)
      .add(player.transform.position),

    velocity: new Vector3(
      plusMinus(jitter),
      plusMinus(jitter),
      -1000
    ).applyQuaternion(player.transform?.quaternion)
  })
}

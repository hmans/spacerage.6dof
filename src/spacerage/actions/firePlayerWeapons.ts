import { Vector3 } from "three"
import { ECS } from "../ecs"
import { spawnBullet } from "./spawnBullet"

export const players = ECS.world.archetype("isPlayer", "transform")

const turrets = [new Vector3(-2.75, 0, 0), new Vector3(+2.75, 0, 0)]

export const firePlayerWeapons = () => {
  for (const turret of turrets) {
    spawnBullet(turret)
  }
}

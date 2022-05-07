import { Object3D } from "three"
import { ECS } from "../ecs"

export const spawnParticleEffect = (spawnTransform: Object3D) => {
  ECS.world.createEntity({
    isParticleEffect: true,
    spawnTransform,
    lifetime: 0,
    maxLifetime: 1.5
  })
}

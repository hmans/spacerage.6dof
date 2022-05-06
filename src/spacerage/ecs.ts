import { Tag } from "miniplex"
import { createECS } from "miniplex-react"
import { Object3D, Vector3 } from "three"

type Entity = {
  isPlayer?: Tag
  isAsteroid?: Tag
  isCamera?: Tag
  isBullet?: Tag

  transform?: Object3D

  velocity?: Vector3
  spawnTransform?: Object3D
}

export const ECS = createECS<Entity>()

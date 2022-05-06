import { Tag } from "miniplex"
import { createECS } from "miniplex-react"
import { Object3D } from "three"

type Entity = {
  isPlayer: Tag
  isAsteroid: Tag
  transform: Object3D
}

export const ECS = createECS<Entity>()

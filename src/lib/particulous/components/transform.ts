import { Object3D } from "three"

export type TransformComponent = {
  transform: Object3D
}

export const transform = (): TransformComponent => ({
  transform: new Object3D()
})

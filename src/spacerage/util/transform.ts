import { Object3D, Quaternion, Vector3 } from "three"

export const transform = (
  position: Vector3,
  quaternion?: Quaternion,
  scale?: Vector3
) => {
  const object = new Object3D()
  if (position) object.position.copy(position)
  if (quaternion) object.quaternion.copy(quaternion)
  if (scale) object.scale.copy(scale)
  return object
}

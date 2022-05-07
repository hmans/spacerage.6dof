import { Vector3 } from "three"

export type VelocityComponentData = Vector3

export type VelocityComponent = {
  velocity: VelocityComponentData
}

export const velocity = (
  velocity: VelocityComponentData = new Vector3()
): VelocityComponent => ({
  velocity
})

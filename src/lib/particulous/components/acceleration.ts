import { Vector3 } from "three"

export type AccelerationComponent = {
  acceleration: Vector3
}

export const acceleration = (): AccelerationComponent => ({
  acceleration: new Vector3()
})

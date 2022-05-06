import RAPIER from "@dimforge/rapier3d-compat"
import { extend, Object3DProps } from "@react-three/fiber"
import { Object3D } from "three"

export class PhysicsObject3D extends Object3D {
  rigidBody?: RAPIER.RigidBody
}

export type PhysicsObject3DProps = Object3DProps & {
  rigidBody?: RAPIER.RigidBody
}
extend({ PhysicsObject3D })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      physicsObject3D: PhysicsObject3DProps
    }
  }
}

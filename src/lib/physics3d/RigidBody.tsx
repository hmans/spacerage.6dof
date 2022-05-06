import RAPIER from "@dimforge/rapier3d-compat"
import { Object3DProps } from "@react-three/fiber"
import React, {
  createContext,
  forwardRef,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState
} from "react"
import mergeRefs from "react-merge-refs"
import { Object3D, Quaternion, Vector3 } from "three"
import { PhysicsEntity, usePhysics } from "./PhysicsWorld"

type RigidBodyState = {
  rigidBody: RAPIER.RigidBody
  entity: PhysicsEntity
}

type RigidBodyAttributes = {
  additionalMass?: number
  allowSleep?: boolean
}

type RigidBodyProps = {
  children?: ReactNode
} & RigidBodyAttributes &
  Object3DProps

const RigidBodyContext = createContext<RigidBodyState>(null!)

export const useRigidBody = () => useContext(RigidBodyContext)

export const RigidBody = forwardRef<Object3D, RigidBodyProps>(
  ({ children, additionalMass, allowSleep = false, ...props }, ref) => {
    const o3d = useRef<Object3D>(null!)
    const { world, ecs } = usePhysics()

    const [state, setState] = useState<RigidBodyState>()

    useEffect(() => {
      const desc = RAPIER.RigidBodyDesc.dynamic().setCanSleep(allowSleep)

      /* Inherit existing transform */
      const pos = new Vector3()
      const quat = new Quaternion()
      o3d.current.getWorldPosition(pos)
      desc.setTranslation(pos.x, pos.y, pos.z)
      o3d.current.getWorldQuaternion(quat)
      desc.setRotation(quat)

      desc.setLinearDamping(1)
      desc.setAngularDamping(1)

      /* Create RigidBody */
      const rigidBody = world.createRigidBody(desc)

      /* Register entity */
      const entity = ecs.createEntity({ transform: o3d.current, rigidBody })

      setState({ rigidBody, entity })

      return () => {
        ecs.destroyEntity(entity)
        world.removeRigidBody(rigidBody)
        setState(undefined)
      }
    }, [world])

    return (
      <object3D ref={mergeRefs([ref, o3d])} {...props}>
        {state && (
          <RigidBodyContext.Provider value={state}>
            {children}
          </RigidBodyContext.Provider>
        )}
      </object3D>
    )
  }
)

import * as RAPIER from "@dimforge/rapier3d-compat"
import { Object3DProps } from "@react-three/fiber"
import React, {
  forwardRef,
  ReactNode,
  useCallback,
  useEffect,
  useRef
} from "react"
import mergeRefs from "react-merge-refs"
import {
  BufferGeometry,
  Float32BufferAttribute,
  Matrix4,
  Object3D,
  Quaternion,
  Vector3
} from "three"
import { collisions } from "./collisions"
import { CollisionCallback, usePhysics } from "./PhysicsWorld"
import { useRigidBody } from "./RigidBody"

type ColliderProps = {
  children?: ReactNode
  collisionGroups?: number
  onCollisionStart?: CollisionCallback
}

export const Collider = forwardRef<
  Object3D,
  ColliderProps &
    Omit<Object3DProps, "args"> & {
      factory: (...args: any[]) => RAPIER.ColliderDesc | null
      args?: any[]
    }
>(
  (
    {
      factory,
      collisionGroups = collisions(1, 1),
      onCollisionStart,
      args = [],
      ...props
    },
    ref
  ) => {
    const { world, collisionCallbacks } = usePhysics()
    const { rigidBody } = useRigidBody()

    useEffect(() => {
      const desc = factory(...args)

      if (!desc)
        throw new Error(`Could not build a collider with descriptor: ${desc}`)

      desc
        .setCollisionGroups(collisionGroups)
        .setActiveEvents(RAPIER.ActiveEvents.COLLISION_EVENTS)

      const collider = world.createCollider(desc, rigidBody.handle)

      if (onCollisionStart)
        collisionCallbacks[collider.handle] = onCollisionStart

      return () => {
        if (collider) {
          if (world.colliders.contains(collider.handle))
            world.removeCollider(collider, true)

          delete collisionCallbacks[collider.handle]
        }
      }
    }, [rigidBody, world])

    return <object3D {...props} ref={ref} />
  }
)

export const BoxCollider = forwardRef<Object3D, ColliderProps & Object3DProps>(
  (props, ref) => (
    <Collider
      factory={RAPIER.ColliderDesc.cuboid}
      args={[2, 2, 2]}
      ref={ref}
      {...props}
    />
  )
)

export const SphereCollider = forwardRef<
  Object3D,
  ColliderProps & Object3DProps
>((props, ref) => (
  <Collider
    factory={RAPIER.ColliderDesc.ball}
    args={[0.5]}
    ref={ref}
    {...props}
  />
))

export const ConvexHullCollider = forwardRef<
  Object3D,
  ColliderProps & Object3DProps & { geometry: BufferGeometry }
>(({ geometry, ...props }, ref) => {
  const object = useRef<Object3D>(null!)
  const { entity } = useRigidBody()

  const factory = useCallback(() => {
    /* Get points from mesh geometry */
    const points = geometry.attributes.position.array as Float32Array

    const position = new Vector3()
    const rotation = new Quaternion()
    const scale = new Vector3()

    object.current.matrixWorld.decompose(position, rotation, scale)

    const relativeMatrix = new Matrix4().compose(
      new Vector3(),
      rotation.multiply(entity.transform.quaternion.clone().invert()),
      scale
    )

    /* TODO: use position to offset the collider */

    /* Scale points */
    const scaledPoints = multiplyByMatrix(
      points,
      relativeMatrix
    ) as Float32Array

    /* Create convex hull */
    return RAPIER.ColliderDesc.convexHull(scaledPoints)
  }, [geometry])

  return (
    <Collider
      factory={factory}
      args={[]}
      ref={mergeRefs([object, ref])}
      {...props}
    />
  )
})

export const scalePoints = (
  points: Float32Array,
  scale: { x: number; y: number; z: number }
) => {
  const scaledPoints = points.slice()

  for (let i = 0; i < scaledPoints.length; i += 3) {
    scaledPoints[i] *= scale.x
    scaledPoints[i + 1] *= scale.y
    scaledPoints[i + 2] *= scale.z
  }

  return scaledPoints
}

export const multiplyByMatrix = (points: Float32Array, matrix: Matrix4) => {
  const buffer = new Float32BufferAttribute(points, 3)
  buffer.applyMatrix4(matrix)
  return buffer.array
}

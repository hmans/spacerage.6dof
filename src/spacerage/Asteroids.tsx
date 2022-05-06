import { useGLTF } from "@react-three/drei"
import { plusMinus } from "randomish"
import { useMemo } from "react"
import { Mesh, Quaternion } from "three"
import { ConvexHullCollider, RigidBody } from "../lib/physics3d"
import { ECS } from "./ecs"

export const Asteroids = () => (
  <ECS.ManagedEntities initial={100} tag="isAsteroid">
    <Asteroid />
  </ECS.ManagedEntities>
)

const Asteroid = () => {
  const gltf = useGLTF("/models/asteroid03.gltf")
  const mesh = useMemo(() => gltf.scene.clone().children[0] as Mesh, [gltf])

  return (
    <ECS.Component name="transform">
      <RigidBody>
        <ConvexHullCollider geometry={mesh.geometry}>
          <primitive
            object={mesh}
            position={[plusMinus(1000), plusMinus(1000), plusMinus(1000)]}
            quaternion={new Quaternion().random()}
            scale={1 + Math.pow(Math.random(), 3) * 10}
          />
        </ConvexHullCollider>
      </RigidBody>
    </ECS.Component>
  )
}

import { useGLTF } from "@react-three/drei"
import { Tag } from "miniplex"
import { useMemo } from "react"
import { Mesh } from "three"
import { ConvexHullCollider, RigidBody } from "../lib/physics3d"
import { ECS } from "./ecs"

export const Player = () => {
  const gltf = useGLTF("/models/spaceship25.gltf")
  const mesh = useMemo(() => gltf.scene.children[0] as Mesh, [gltf])

  return (
    <ECS.Entity>
      <ECS.Component name="isPlayer" data={Tag} />

      <ECS.Component name="transform">
        <RigidBody>
          <ConvexHullCollider geometry={mesh.geometry}>
            <primitive object={mesh} rotation-x={-Math.PI / 2}>
              <pointLight intensity={2.5} position-y={3} />
            </primitive>
          </ConvexHullCollider>
        </RigidBody>
      </ECS.Component>
    </ECS.Entity>
  )
}

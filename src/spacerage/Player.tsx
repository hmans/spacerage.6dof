import { Tag } from "miniplex"
import { useInstancedGLTF } from "../lib/instanza/useInstancedGLTF"
import { ConvexHullCollider, RigidBody } from "../lib/physics3d"
import { ECS } from "./ecs"

export const Player = () => {
  const Asset = useInstancedGLTF("/models/spaceship25.gltf")

  return (
    <Asset.Root>
      <ECS.Entity>
        <ECS.Component name="isPlayer" data={Tag} />

        <ECS.Component name="transform">
          <RigidBody>
            <ConvexHullCollider
              geometry={Asset.mesh.geometry}
              rotation-x={-Math.PI / 2}
            >
              <Asset.Instance>
                <pointLight intensity={2.5} position-y={3} />
              </Asset.Instance>
            </ConvexHullCollider>
          </RigidBody>
        </ECS.Component>
      </ECS.Entity>
    </Asset.Root>
  )
}

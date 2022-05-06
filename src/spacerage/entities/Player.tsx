import { Tag } from "miniplex"
import { useInstancedGLTF } from "../../lib/instanza/useInstancedGLTF"
import { collisions, ConvexHullCollider, RigidBody } from "../../lib/physics3d"
import { ECS } from "../ecs"
import { Layers } from "../Layers"

export const Player = () => {
  const Asset = useInstancedGLTF("/models/spaceship25.gltf")

  return (
    <Asset.Root>
      <ECS.Entity>
        <ECS.Component name="isPlayer" data={Tag} />

        <ECS.Component name="transform">
          <RigidBody position-z={200}>
            <ConvexHullCollider
              geometry={Asset.mesh.geometry}
              rotation-x={-Math.PI / 2}
              collisionGroups={collisions(Layers.Player, Layers.Asteroids)}
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

import { plusMinus } from "randomish"
import { Quaternion } from "three"
import { useInstancedGLTF } from "../lib/instanza/useInstancedGLTF"
import { ConvexHullCollider, RigidBody } from "../lib/physics3d"
import { ECS } from "./ecs"

export const Asteroids = () => {
  const Asset = useInstancedGLTF("/models/asteroid03.gltf")

  return (
    <Asset.Root>
      <ECS.ManagedEntities initial={100} tag="isAsteroid">
        {() => (
          <ECS.Component name="transform">
            <RigidBody>
              <ConvexHullCollider geometry={Asset.mesh.geometry}>
                <Asset.Instance
                  position={[plusMinus(1000), plusMinus(1000), plusMinus(1000)]}
                  quaternion={new Quaternion().random()}
                  scale={1 + Math.pow(Math.random(), 3) * 10}
                />
              </ConvexHullCollider>
            </RigidBody>
          </ECS.Component>
        )}
      </ECS.ManagedEntities>
    </Asset.Root>
  )
}

import { plusMinus } from "randomish"
import { FC } from "react"
import { Quaternion } from "three"
import {
  InstancedGLTF,
  useInstancedGLTF
} from "../../lib/instanza/useInstancedGLTF"
import { ConvexHullCollider, RigidBody } from "../../lib/physics3d"
import { ECS } from "../ecs"

export const Asteroids = () => {
  const Asset = useInstancedGLTF("/models/asteroid03.gltf")

  return (
    <Asset.Root>
      <ECS.ManagedEntities initial={1000} tag="isAsteroid">
        <Asteroid Asset={Asset} />
      </ECS.ManagedEntities>
    </Asset.Root>
  )
}

const Asteroid: FC<{ Asset: InstancedGLTF }> = ({ Asset }) => (
  <ECS.Component name="transform">
    <RigidBody
      position={[plusMinus(1000), plusMinus(1000), plusMinus(1000)]}
      quaternion={new Quaternion().random()}
      scale={1 + Math.pow(Math.random(), 3) * 10}
      allowSleep
    >
      <ConvexHullCollider geometry={Asset.mesh.geometry}>
        <Asset.Instance />
      </ConvexHullCollider>
    </RigidBody>
  </ECS.Component>
)
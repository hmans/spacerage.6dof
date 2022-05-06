import { useGLTF } from "@react-three/drei"
import { plusMinus } from "randomish"
import { Quaternion } from "three"
import { ECS } from "./ecs"

export const Asteroids = () => (
  <ECS.ManagedEntities initial={2000} tag="isAsteroid">
    <Asteroid />
  </ECS.ManagedEntities>
)

const Asteroid = () => {
  const gltf = useGLTF("/models/asteroid03.gltf")

  /* If you need access to the ECS entity, you could use the `useEntity` hook here. */

  return (
    <ECS.Component name="transform">
      <primitive
        object={gltf.scene.clone()}
        position={[plusMinus(1000), plusMinus(1000), plusMinus(1000)]}
        quaternion={new Quaternion().random()}
        scale={1 + Math.pow(Math.random(), 3) * 10}
      />
    </ECS.Component>
  )
}

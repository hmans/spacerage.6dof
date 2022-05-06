import { useGLTF } from "@react-three/drei"
import { plusMinus } from "randomish"
import { ECS } from "./ecs"

export const Asteroids = () => (
  <ECS.ManagedEntities initial={500} tag="isAsteroid">
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
      />
    </ECS.Component>
  )
}

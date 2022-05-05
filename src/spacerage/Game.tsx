import { Canvas, useFrame } from "@react-three/fiber"
import { ECS } from "./ecs"

export const Game = () => {
  return (
    <Canvas>
      <ECS.Entity>
        <ECS.Component name="transform">
          <mesh>
            <boxBufferGeometry />
            <meshBasicMaterial color="hotpink" />
          </mesh>
        </ECS.Component>
      </ECS.Entity>

      <Systems />
    </Canvas>
  )
}

const Systems = () => {
  const { entities } = ECS.useArchetype("transform")

  useFrame((_, dt) => {
    for (const { transform } of entities) {
      transform.rotation.x = transform.rotation.y += 1.5 * dt
    }
  })

  return null
}

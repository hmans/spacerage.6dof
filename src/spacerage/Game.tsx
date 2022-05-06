import { OrbitControls } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { plusMinus } from "randomish"
import { useMemo } from "react"
import { Matrix4 } from "three"
import { makeInstancedMesh } from "../lib/instanza/makeInstancedMesh"
import { ECS } from "./ecs"
import { Update } from "./Update"

const Swarm = () => {
  const Blob = useMemo(() => makeInstancedMesh(), [])
  const blobs = useMemo(() => Blob.ECS.world.archetype("matrix4"), [Blob])

  useFrame(() => {
    for (const { matrix4 } of blobs.entities) {
      // matrix4.setPosition(plusMinus(3), plusMinus(3), plusMinus(3))
    }
  })

  return (
    <Blob.Root instanceLimit={100000}>
      <boxGeometry args={[0.1, 0.1, 0.1]} />
      <meshBasicMaterial color="orange" />

      <Blob.ThinInstance
        count={5000}
        entityFactory={() => {
          const matrix4 = new Matrix4()
          matrix4.setPosition(plusMinus(3), plusMinus(3), plusMinus(3))
          return { matrix4 }
        }}
      />
    </Blob.Root>
  )
}

export const Game = () => {
  return (
    <Canvas>
      <Swarm />

      <ECS.Entity>
        <ECS.Component name="transform">
          <mesh>
            <boxBufferGeometry />
            <meshBasicMaterial color="hotpink" />
          </mesh>
        </ECS.Component>
      </ECS.Entity>

      <OrbitControls />

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
  }, Update.Default)

  return null
}

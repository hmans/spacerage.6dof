import { Canvas, useFrame } from "@react-three/fiber"
import { plusMinus } from "randomish"
import { useMemo } from "react"
import { Matrix4, Object3D, Vector3 } from "three"
import { makeInstancedMesh } from "../lib/makeInstancedMesh"
import { ECS } from "./ecs"
import { Update } from "./Update"

const Swarm = () => {
  const Blob = useMemo(() => makeInstancedMesh(), [])

  return (
    <Blob.Root>
      <sphereGeometry args={[0.1]} />
      <meshBasicMaterial color="orange" />

      <Blob.ThinInstance
        count={1000}
        entityFactory={() => {
          const m4 = new Matrix4()
          m4.setPosition(plusMinus(3), plusMinus(3), plusMinus(3))
          return {
            matrix4: m4
          }
        }}
      />
    </Blob.Root>
  )
}

export const Game = () => {
  return (
    <Canvas>
      <Swarm />

      {/* <ECS.Entity>
        <ECS.Component name="transform">
          <mesh>
            <boxBufferGeometry />
            <meshBasicMaterial color="hotpink" />
          </mesh>
        </ECS.Component>
      </ECS.Entity> */}

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

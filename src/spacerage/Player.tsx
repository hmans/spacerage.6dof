import { useGLTF } from "@react-three/drei"
import { Tag } from "miniplex"
import { ECS } from "./ecs"

export const Player = () => {
  const gltf = useGLTF("/models/spaceship25.gltf")

  return (
    <ECS.Entity>
      <ECS.Component name="isPlayer" data={Tag} />

      <ECS.Component name="transform">
        <primitive object={gltf.scene} rotation-x={-Math.PI / 2} />
      </ECS.Component>
    </ECS.Entity>
  )
}

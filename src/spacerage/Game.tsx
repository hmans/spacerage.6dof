import { OrbitControls } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { PhysicsWorld } from "../lib/physics3d"
import { Asteroids } from "./Asteroids"
import { Camera } from "./Camera"
import { ECS } from "./ecs"
import { Player } from "./Player"
import { RenderPipeline } from "./RenderPipeline"
import { Skybox } from "./Skybox"
import { Update } from "./Update"

export const Game = () => {
  return (
    <Canvas flat gl={{ logarithmicDepthBuffer: true }}>
      <RenderPipeline />
      <Systems />
      <Skybox />
      <OrbitControls />

      <PhysicsWorld>
        <Camera />
        <Player />
        <Asteroids />
      </PhysicsWorld>

      <ambientLight intensity={0.2} />
      <directionalLight intensity={2} position={[300, 100, -200]} />
    </Canvas>
  )
}

const Systems = () => {
  const { entities } = ECS.useArchetype("transform")

  useFrame((_, dt) => {}, Update.Default)

  return null
}

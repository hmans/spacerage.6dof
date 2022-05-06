import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { PhysicsWorld } from "../lib/physics3d"
import { Asteroids } from "./entities/Asteroids"
import { Camera } from "./entities/Camera"
import { Player } from "./entities/Player"
import { RenderPipeline } from "./RenderPipeline"
import { Skybox } from "./Skybox"
import { Systems } from "./systems/Systems"

export const Game = () => {
  return (
    <Canvas flat gl={{ logarithmicDepthBuffer: true }}>
      <RenderPipeline />
      <Systems />
      <Skybox />
      {/* <OrbitControls /> */}

      <PhysicsWorld gravity={[0, 0, 0]}>
        <Camera />
        <Player />
        <Asteroids />
      </PhysicsWorld>

      <ambientLight intensity={0.2} />
      <directionalLight intensity={2} position={[300, 100, -200]} />
    </Canvas>
  )
}

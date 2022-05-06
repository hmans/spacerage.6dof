import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { PhysicsWorld } from "../lib/physics3d"
import { Asteroids } from "./entities/Asteroids"
import { Bullets } from "./entities/Bullets"
import { Camera } from "./entities/Camera"
import { Player } from "./entities/Player"
import { RenderPipeline } from "./RenderPipeline"
import { Skybox } from "./Skybox"
import { Systems } from "./systems/Systems"

export const Game = () => {
  return (
    <Canvas flat gl={{ logarithmicDepthBuffer: true }}>
      <fog args={["#000", 0, 800]} attach="fog" />

      <PhysicsWorld gravity={[0, 0, 0]}>
        <RenderPipeline />
        <Skybox />
        {/* <OrbitControls /> */}

        <Camera />
        <Player />
        <Asteroids />
        <Bullets />

        <Systems />

        <ambientLight intensity={0.2} />
        <directionalLight intensity={2} position={[300, 100, -200]} />
      </PhysicsWorld>
    </Canvas>
  )
}

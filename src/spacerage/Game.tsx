import { Canvas } from "@react-three/fiber"
import { LinearEncoding } from "three"
import { PhysicsWorld } from "../lib/physics3d"
import { Ticker } from "../lib/tickle"
import { Asteroids } from "./entities/Asteroids"
import { Bullets } from "./entities/Bullets"
import { Camera } from "./entities/Camera"
import { Player } from "./entities/Player"
import { RenderPipeline } from "./RenderPipeline"
import { Skybox } from "./Skybox"
import { Systems } from "./systems/Systems"
import { TestParticles } from "./TestParticles"
import { Update } from "./Update"

export const Game = () => (
  <Canvas
    flat
    gl={{
      logarithmicDepthBuffer: true,
      outputEncoding: LinearEncoding,
      alpha: false,
      stencil: false,
      antialias: true
    }}
  >
    <fog args={["#000", 0, 800]} attach="fog" />
    <ambientLight intensity={0.2} />
    <directionalLight intensity={2} position={[300, 100, -200]} />
    <RenderPipeline />
    <Skybox />

    <Ticker timeScale={1} maxDelta={1} defaultPriority={Update.Default}>
      <PhysicsWorld gravity={[0, 0, 0]}>
        <Camera />
        <Player />
        <Asteroids />
        <Bullets />

        <TestParticles />

        <Systems />
      </PhysicsWorld>
    </Ticker>
  </Canvas>
)

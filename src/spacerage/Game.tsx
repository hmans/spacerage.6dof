import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Perf } from "r3f-perf"
import { LinearEncoding } from "three"
import { Instancicles } from "../lib/instancicles/Instancicles"
import { PhysicsWorld } from "../lib/physics3d"
import { Ticker } from "../lib/tickle"
import { Asteroids } from "./entities/Asteroids"
import { Bullets } from "./entities/Bullets"
import { Camera } from "./entities/Camera"
import { ParticleEffects } from "./entities/ParticleEffects"
import { Player } from "./entities/Player"
import { RenderPipeline } from "./RenderPipeline"
import { Skybox } from "./Skybox"
import { Systems } from "./systems/Systems"
import { Update } from "./Update"

export const Game = () => (
  <Canvas
    flat
    gl={{
      logarithmicDepthBuffer: true,
      outputEncoding: LinearEncoding,
      alpha: false,
      depth: false,
      stencil: false,
      antialias: false
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
        {/* <OrbitControls /> */}
        <Player />
        <Asteroids />
        <Bullets />
        <ParticleEffects />

        <Systems />
        <Perf matrixUpdate />
      </PhysicsWorld>
    </Ticker>
  </Canvas>
)

import { Effects, OrbitControls } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { plusMinus } from "randomish"
import { useMemo } from "react"
import { Matrix4 } from "three"
import { makeInstancedMesh } from "../lib/instanza/makeInstancedMesh"
import { Camera } from "./Camera"
import { ECS } from "./ecs"
import { RenderPipeline } from "./RenderPipeline"
import { Skybox } from "./Skybox"
import { Update } from "./Update"

export const Game = () => {
  return (
    <Canvas flat>
      <RenderPipeline />

      <Camera />

      <Skybox />

      <OrbitControls />

      <Systems />
    </Canvas>
  )
}

const Systems = () => {
  const { entities } = ECS.useArchetype("transform")

  useFrame((_, dt) => {}, Update.Default)

  return null
}

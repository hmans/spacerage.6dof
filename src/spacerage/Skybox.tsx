import { useThree } from "@react-three/fiber"
import { useEffect } from "react"
import { CubeTextureLoader } from "three"

export const Skybox = () => {
  const { scene } = useThree()

  useEffect(() => {
    const urls = [
      "/textures/skybox/right.png",
      "/textures/skybox/left.png",
      "/textures/skybox/top.png",
      "/textures/skybox/bottom.png",
      "/textures/skybox/front.png",
      "/textures/skybox/back.png"
    ]

    const cube = new CubeTextureLoader().load(urls)

    scene.background = cube
  }, [])

  return null
}

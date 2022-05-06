import { useGLTF } from "@react-three/drei"

export const Player = () => {
  const gltf = useGLTF("/models/spaceship25.gltf")

  return (
    <>
      <primitive object={gltf.scene} />
    </>
  )
}

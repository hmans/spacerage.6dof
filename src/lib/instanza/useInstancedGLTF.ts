import { useGLTF } from "@react-three/drei"
import { Mesh } from "three"
import { useInstancedMesh } from "./useInstancedMesh"

export const useInstancedGLTF = (url: string) => {
  const gltf = useGLTF(url)
  const mesh = gltf.scene.children[0] as Mesh

  return {
    ...useInstancedMesh({ geometry: mesh.geometry, material: mesh.material }),
    mesh
  }
}

export type InstancedGLTF = ReturnType<typeof useInstancedGLTF>

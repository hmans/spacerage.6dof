import { useMemo } from "react"
import { createInstancedMesh } from "./createInstancedMesh"

export const useInstancedMesh = (
  ...args: Parameters<typeof createInstancedMesh>
) => useMemo(() => createInstancedMesh(...args), [])

import { PerspectiveCamera } from "@react-three/drei"
import { Tag } from "miniplex"
import { ECS } from "../ecs"

export const Camera = () => (
  <ECS.Entity>
    <ECS.Component name="isCamera" data={Tag} />
    <ECS.Component name="transform">
      <PerspectiveCamera position={[0, 3, 12]} makeDefault />
    </ECS.Component>
  </ECS.Entity>
)

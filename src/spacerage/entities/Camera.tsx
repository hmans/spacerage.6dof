import { PerspectiveCamera } from "@react-three/drei"
import { ECS } from "../ecs"

export const Camera = () => (
  <ECS.Entity>
    <ECS.Component name="transform">
      <PerspectiveCamera position={[0, 0, 100]} makeDefault />
    </ECS.Component>
  </ECS.Entity>
)
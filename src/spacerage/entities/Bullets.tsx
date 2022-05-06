import { createInstancedMesh } from "../../lib/instanza/createInstancedMesh"
import { ECS } from "../ecs"

const Asset = createInstancedMesh()

export const Bullets = () => {
  return (
    <Asset.Root>
      <boxGeometry />
      <meshStandardMaterial
        color="orange"
        emissive="orange"
        emissiveIntensity={2}
      />

      <ECS.ManagedEntities initial={1} tag="isBullet">
        <Bullet />
      </ECS.ManagedEntities>
    </Asset.Root>
  )
}

const Bullet = () => {
  const entity = ECS.useEntity()

  return (
    <ECS.Component name="transform">
      <Asset.Instance position={entity.initialPosition} />
    </ECS.Component>
  )
}

import { createInstancedMesh } from "../../lib/instanza/createInstancedMesh"
import { ECS } from "../ecs"

const Asset = createInstancedMesh()

export const Bullets = () => {
  return (
    <Asset.Root>
      <boxGeometry args={[0.5, 0.5, 2]} />
      <meshStandardMaterial
        color="orange"
        emissive="orange"
        emissiveIntensity={2}
      />

      <ECS.ManagedEntities initial={0} tag="isBullet">
        <Bullet />
      </ECS.ManagedEntities>
    </Asset.Root>
  )
}

const Bullet = () => {
  const entity = ECS.useEntity()

  return (
    <ECS.Component name="transform">
      <primitive object={entity.spawnTransform}>
        <Asset.Instance />
      </primitive>
    </ECS.Component>
  )
}

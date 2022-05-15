import { createInstancedMesh } from "../../lib/instanza/createInstancedMesh"
import { ECS } from "../ecs"

const Asset = createInstancedMesh()

export const Bullets = () => (
  <Asset.Root>
    <boxGeometry args={[0.4, 0.4, 1.5]} />
    <meshStandardMaterial
      color="yellow"
      emissive="yellow"
      emissiveIntensity={2}
    />

    <ECS.ManagedEntities initial={0} tag="isBullet">
      <Bullet />
    </ECS.ManagedEntities>
  </Asset.Root>
)

const Bullet = () => {
  const entity = ECS.useEntity()

  return (
    <ECS.Component name="transform">
      <object3D {...entity.spawnTransform}>
        <Asset.Instance />
      </object3D>
    </ECS.Component>
  )
}

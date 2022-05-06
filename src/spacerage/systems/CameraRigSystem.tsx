import { useFrame } from "@react-three/fiber"
import { FC } from "react"
import { Vector3 } from "three"
import { ECS } from "../ecs"
import { Update } from "../Update"

const tmpVector3 = new Vector3()

export const CameraRigSystem: FC = () => {
  const player = ECS.useArchetype("isPlayer").first
  const camera = ECS.useArchetype("isCamera").first

  useFrame(() => {
    if (!player || !camera) return

    const target = tmpVector3
      .set(0, 3, 10)
      .applyQuaternion(player.transform.quaternion)
      .add(player.transform.position)

    camera.transform.position.lerp(target, 0.1)
    camera.transform.quaternion.slerp(player.transform.quaternion, 0.1)
  }, Update.Late)

  return null
}

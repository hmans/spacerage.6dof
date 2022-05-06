import { BulletSystem } from "./BulletSystem"
import { CameraRigSystem } from "./CameraRigSystem"
import { MovementSystem } from "./MovementSystem"
import { PlayerControllerSystem } from "./PlayerControllerSystem"

export const Systems = () => (
  <>
    <PlayerControllerSystem />
    <MovementSystem />
    <BulletSystem />
    <CameraRigSystem />
  </>
)

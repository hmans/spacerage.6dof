import { BulletSystem } from "./BulletSystem"
import { CameraRigSystem } from "./CameraRigSystem"
import { FlushECSQueueSystem } from "./FlushECSQueueSystem"
import { LifetimeSystem } from "./LifetimeSystem"
import { MaxLifetimeSystem } from "./MaxLifetimeSystem"
import { MovementSystem } from "./MovementSystem"
import { PlayerControllerSystem } from "./PlayerControllerSystem"

export const Systems = () => (
  <>
    <LifetimeSystem />
    <MaxLifetimeSystem />

    <PlayerControllerSystem />
    <MovementSystem />
    <BulletSystem />
    <CameraRigSystem />

    <FlushECSQueueSystem />
  </>
)

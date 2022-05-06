import { CameraRigSystem } from "./CameraRigSystem"
import { PlayerControllerSystem } from "./PlayerControllerSystem"

export const Systems = () => (
  <>
    <PlayerControllerSystem />
    <CameraRigSystem />
  </>
)

import {
  BooleanControl,
  Controller,
  GamepadDevice,
  KeyboardDevice,
  processors,
  TouchDevice,
  VectorControl
} from "@hmans/controlfreak"
import { FC, useEffect, useMemo } from "react"
import { Vector3 } from "three"
import { PhysicsObject3D } from "../../lib/physics3d"
import { useTickerFrame } from "../../lib/tickle"
import { firePlayerWeapons } from "../actions/firePlayerWeapons"
import { ECS } from "../ecs"
import { Update } from "../Update"

export const PlayerControllerSystem: FC = () => {
  const controller = useController()
  const state = useMemo(
    () => ({ move: { x: 0, y: 0 }, fire: false, lastFiredAt: 0 }),
    []
  )
  const player = ECS.useArchetype("isPlayer").first

  /* Fetch Input */
  useTickerFrame(() => {
    controller.update()
    state.move = controller.controls.move.value
    state.fire = controller.controls.fire.value
  }, Update.Early)

  /* Perform movement.
     TODO: should be within fixed update */
  useTickerFrame(() => {
    if (!player) return

    /* Get rigidBody */
    const rigidBody = (player.transform as PhysicsObject3D).rigidBody!

    /* Reset forces and torques */
    rigidBody["rawSet"].rbResetTorques(rigidBody.handle, true) // https://github.com/dimforge/rapier.js/pull/106
    rigidBody.resetForces(true)

    /* Apply rotation */
    rigidBody.addTorque(
      new Vector3(-state.move.y * 140, 0, -state.move.x * 300).applyQuaternion(
        player.transform.quaternion
      ),
      true
    )

    /* Apply movement */
    rigidBody.addForce(
      new Vector3(0, 0, -300).applyQuaternion(player.transform.quaternion),
      true
    )

    /* Firing */
    const t = performance.now()
    if (state.fire && t > state.lastFiredAt + 65) {
      state.lastFiredAt = t
      firePlayerWeapons()
    }
  }, Update.Default)

  return null
}

const useController = () => {
  const controller = useMemo(createController, [])

  useEffect(() => {
    controller.start()
    return () => controller.stop()
  })

  return controller
}

const createController = () => {
  const controller = new Controller()
  const keyboard = new KeyboardDevice()
  const gamepad = new GamepadDevice()
  const touch = new TouchDevice()

  controller.addDevice(keyboard)
  controller.addDevice(gamepad)
  controller.addDevice(touch)

  controller
    .addControl("move", VectorControl)
    .addStep(keyboard.compositeVector("KeyW", "KeyS", "KeyA", "KeyD"))
    .addStep(gamepad.axisVector(0, 1))
    .addStep(processors.clampVector(1))
    .addStep(processors.deadzone(0.15))

  controller
    .addControl("fire", BooleanControl)
    .addStep(keyboard.whenKeyPressed(["Space", "Enter"]))
    .addStep(gamepad.whenButtonPressed(0))

  controller.onDeviceChange.add((d) => console.log("new device:", d))

  return controller
}

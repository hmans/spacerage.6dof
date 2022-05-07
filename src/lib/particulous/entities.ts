import { World } from "miniplex"
import {
  acceleration,
  AccelerationComponent,
  age,
  AgeComponent,
  AlphaOverLifetimeComponent,
  LifetimeComponent,
  ParticleComponent,
  transform,
  TransformComponent,
  velocity,
  VelocityComponent
} from "./components"
import { EmitterComponent } from "./components/emitter"

type RequiredComponents = AgeComponent &
  TransformComponent &
  VelocityComponent &
  AccelerationComponent

type OptionalComponents = ParticleComponent &
  EmitterComponent &
  LifetimeComponent &
  AlphaOverLifetimeComponent

export type Entity = RequiredComponents & Partial<OptionalComponents>

export type ParticleWorld = World<Entity>

export const defaultEntity = (): Entity => ({
  ...age(),
  ...transform(),
  ...velocity(),
  ...acceleration()
})

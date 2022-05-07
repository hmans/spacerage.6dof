import { Entity } from "../entities"

export type EmitterComponentData = {
  factory: () => Partial<Entity>
  maxParticles?: number
}

export type EmitterComponent = {
  emitter: EmitterComponentData
}

export const emitter = (emitter: EmitterComponentData): EmitterComponent => ({
  emitter
})

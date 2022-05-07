import { Color, ColorRepresentation } from "three"

export type ParticleComponent = {
  particle: {
    color: Color
    size: number
    alpha: number
  }
}

export const particle = (
  color?: ColorRepresentation,
  size = 1,
  alpha = 1
): ParticleComponent => ({ particle: { color: new Color(color), size, alpha } })

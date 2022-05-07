import { Interpolant, KeyframeTrack } from "three"

type LifetimeValue<T> = (t: number) => T

export type AlphaOverLifetimeComponentData = LifetimeValue<number>

export type AlphaOverLifetimeComponent = {
  alphaOverLifetime: AlphaOverLifetimeComponentData
}

export const alphaOverLifetime = (
  input: AlphaOverLifetimeComponentData | KeyframeTrack
): AlphaOverLifetimeComponent => {
  let alphaOverLifetime

  if (input instanceof KeyframeTrack) {
    const interpolant = (input as any).createInterpolant() as Interpolant
    alphaOverLifetime = (t: number) => interpolant.evaluate(t)
  } else {
    alphaOverLifetime = input
  }

  return {
    alphaOverLifetime
  }
}

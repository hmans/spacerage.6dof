export type LifetimeComponentData = number

export type LifetimeComponent = {
  lifetime: LifetimeComponentData
}

export const lifetime = (
  lifetime: LifetimeComponentData = 1
): LifetimeComponent => ({ lifetime })

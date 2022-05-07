import { extend } from "@react-three/fiber"
import { between } from "randomish"
import { FC, useEffect, useRef } from "react"
import { NumberKeyframeTrack, Vector3 } from "three"
import { ParticleEffect, ParticleMaterial } from "../../lib/particulous"
import {
  alphaOverLifetime,
  emitter,
  lifetime,
  particle,
  velocity
} from "../../lib/particulous/components"
import { useTickerFrame } from "../../lib/tickle"
import { ECS } from "../ecs"

extend({ ParticleMaterial })

export const ParticleEffects: FC = () => {
  return (
    <ECS.ManagedEntities tag="isParticleEffect" initial={0}>
      <Effect />
    </ECS.ManagedEntities>
  )
}

export const Effect: FC = () => {
  const effect = useRef<ParticleEffect>(null!)
  const entity = ECS.useEntity()

  const maxParticles = between(3, 10)

  useEffect(() => {
    effect.current.create(
      emitter({
        maxParticles,
        factory: () => ({
          ...particle(0xffeeaa),
          ...velocity(
            new Vector3().randomDirection().multiplyScalar(Math.random())
          ),
          ...lifetime(2 + Math.random() * 0.5),
          ...alphaOverLifetime(new NumberKeyframeTrack("alpha", [0, 1], [1, 0]))
        })
      })
    )
  }, [])

  useTickerFrame((_, dt) => effect.current.update(dt))

  return (
    <ECS.Component name="transform">
      <primitive object={entity.spawnTransform}>
        <particleEffect ref={effect} args={[maxParticles]}>
          <particleMaterial />
        </particleEffect>
      </primitive>
    </ECS.Component>
  )
}

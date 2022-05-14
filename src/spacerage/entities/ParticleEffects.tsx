import { extend } from "@react-three/fiber"
import { between } from "randomish"
import { FC, useEffect, useRef } from "react"
import { NumberKeyframeTrack, Vector3 } from "three"
import {
  Instancicles,
  InstanciclesRef
} from "../../lib/instancicles/Instancicles"
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
  const entity = ECS.useEntity()
  const ref = useRef<InstanciclesRef>(null!)

  useEffect(() => {
    ref.current.spawnParticle(20)
  }, [])

  return (
    <ECS.Component name="transform">
      <primitive object={entity.spawnTransform}>
        <Instancicles ref={ref} />
      </primitive>
    </ECS.Component>
  )
}

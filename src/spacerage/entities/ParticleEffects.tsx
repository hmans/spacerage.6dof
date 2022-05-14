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
  const sparks = useRef<InstanciclesRef>(null!)
  const smoke = useRef<InstanciclesRef>(null!)

  useEffect(() => {
    sparks.current.spawnParticle(between(3, 10))
    smoke.current.spawnParticle(between(10, 100))
  }, [])

  return (
    <ECS.Component name="transform">
      <primitive object={entity.spawnTransform} scale={0.3}>
        <object3D scale={2}>
          <Instancicles ref={smoke} color="#222" />
        </object3D>
        <Instancicles ref={sparks} color="orange" scale={1} />
      </primitive>
    </ECS.Component>
  )
}

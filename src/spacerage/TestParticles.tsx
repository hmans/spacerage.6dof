import { extend, useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { NumberKeyframeTrack, Vector3 } from "three"
import {
  alphaOverLifetime,
  lifetime,
  particle,
  velocity
} from "../lib/particulous/components"
import { emitter } from "../lib/particulous/components/emitter"
import { ParticleEffect } from "../lib/particulous/ParticleEffect"
import { ParticleMaterial } from "../lib/particulous/ParticleMaterial"

extend({ ParticleMaterial, ParticleEffect })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      particleEffect: any
      particleMaterial: any
    }
  }
}

export function TestParticles() {
  const effect = useRef<ParticleEffect>(null!)

  useEffect(() => {
    effect.current.create(
      emitter({
        factory: () => ({
          ...particle(),
          ...velocity(
            new Vector3().randomDirection().multiplyScalar(Math.random())
          ),
          ...lifetime(2 + Math.random() * 0.5),
          ...alphaOverLifetime(new NumberKeyframeTrack("alpha", [0, 1], [1, 0]))
        })
      })
    )
  }, [])

  useFrame((_, dt) => effect.current.update(dt))

  return (
    <particleEffect ref={effect}>
      <particleMaterial />
    </particleEffect>
  )
}

import { extend } from "@react-three/fiber"
import { between } from "randomish"
import { FC, useEffect, useRef } from "react"
import {
  Instancicles,
  InstanciclesRef
} from "../../lib/instancicles/Instancicles"
import { ParticleMaterial } from "../../lib/particulous"
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
  const whiteSmoke = useRef<InstanciclesRef>(null!)

  useEffect(() => {
    sparks.current.spawnParticle(between(3, 10))
    smoke.current.spawnParticle(between(5, 30))

    setTimeout(
      () => whiteSmoke.current.spawnParticle(between(1, 5)),
      between(80, 200)
    )
  }, [])

  return (
    <ECS.Component name="transform">
      <object3D {...entity.spawnTransform}>
        <Instancicles ref={whiteSmoke} color="#666">
          <sphereBufferGeometry args={[4, 8, 8]} />
        </Instancicles>

        <Instancicles ref={smoke} color="#222">
          <boxGeometry />
        </Instancicles>

        <Instancicles ref={sparks} color="orange">
          <boxGeometry />
        </Instancicles>
      </object3D>
    </ECS.Component>
  )
}

import { between } from "randomish"
import { FC, useEffect, useRef } from "react"
import {
  Instancicles,
  InstanciclesRef
} from "../../lib/instancicles/Instancicles"
import { ECS } from "../ecs"
import CustomShaderMaterialImpl from "three-custom-shader-material/vanilla"
import { ParticlesMaterial } from "../../lib/instancicles/ParticlesMaterial"

export const ParticleEffects: FC = () => {
  const whiteSmokeMaterial = useRef<CustomShaderMaterialImpl>(null!)
  const smokeMaterial = useRef<CustomShaderMaterialImpl>(null!)
  const sparksMaterial = useRef<CustomShaderMaterialImpl>(null!)

  return (
    <>
      <ParticlesMaterial color="#666" ref={whiteSmokeMaterial} />
      <ParticlesMaterial color="#222" ref={smokeMaterial} />
      <ParticlesMaterial color="orange" ref={sparksMaterial} />

      <ECS.ManagedEntities tag="isParticleEffect" initial={0}>
        <Effect
          materials={{ whiteSmokeMaterial, smokeMaterial, sparksMaterial }}
        />
      </ECS.ManagedEntities>
    </>
  )
}

export const Effect: FC = ({ materials }) => {
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
        <Instancicles
          ref={whiteSmoke}
          material={materials.whiteSmokeMaterial.current}
        >
          <sphereBufferGeometry args={[4, 8, 8]} />
        </Instancicles>

        <Instancicles ref={smoke} material={materials.smokeMaterial.current}>
          <boxGeometry />
        </Instancicles>

        <Instancicles ref={sparks} material={materials.sparksMaterial.current}>
          <boxGeometry />
        </Instancicles>
      </object3D>
    </ECS.Component>
  )
}

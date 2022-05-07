import { extend, ShaderMaterialProps } from "@react-three/fiber"
import { Color, NormalBlending, ShaderMaterial, TextureLoader } from "three"
import fragmentShader from "./shaders/fragmentShader.glsl"
import vertexShader from "./shaders/vertexShader.glsl"

export class ParticleMaterial extends ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        color: { value: new Color(0xffffff) },
        pointTexture: {
          value: new TextureLoader().load("/textures/particle.png")
        }
      },
      vertexShader,
      fragmentShader,
      blending: NormalBlending,
      depthTest: true,
      transparent: false
    })
  }
}

extend({ ParticleMaterial })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      particleMaterial: ShaderMaterialProps
    }
  }
}

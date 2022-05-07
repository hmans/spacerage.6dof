import { Color, NormalBlending, ShaderMaterial, TextureLoader } from "three"

import vertexShader from "./shaders/vertexShader.glsl"
import fragmentShader from "./shaders/fragmentShader.glsl"

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
      depthTest: false,
      transparent: true
    })
  }
}

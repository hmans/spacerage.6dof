import { World } from "miniplex"
import { BufferAttribute, BufferGeometry } from "three"
import { Entity } from "./entities"
import {
  ageSystem,
  lifetimeSystem,
  animationSystem,
  emitterSystem,
  movementSystem,
  flushQueueSystem
} from "./systems"

export class ParticleGeometry extends BufferGeometry {
  positions: Float32Array
  colors: Float32Array
  alphas: Float32Array
  sizes: Float32Array

  /* The ECS world this effect is using. */
  world = new World<Entity>()

  /* A collection of archetypes we'll be using here and there. */
  archetypes = {
    particles: this.world.archetype("particle")
  }

  /* A default list of systems we will be executing on every update. This
       is where users can hook in their own logic! */
  systems = [
    ageSystem(this.world),
    lifetimeSystem(this.world),
    animationSystem(this.world),
    emitterSystem(this.world),
    movementSystem(this.world),
    flushQueueSystem(this.world)
  ]

  constructor(public maxParticles: number = 5000) {
    super()

    this.positions = new Float32Array(maxParticles * 3)
    this.colors = new Float32Array(maxParticles * 3)
    this.alphas = new Float32Array(maxParticles)
    this.sizes = new Float32Array(maxParticles)

    this.setAttribute("position", new BufferAttribute(this.positions, 3))
    this.setAttribute("color", new BufferAttribute(this.colors, 3))
    this.setAttribute("size", new BufferAttribute(this.sizes, 1))
    this.setAttribute("alpha", new BufferAttribute(this.alphas, 1))
  }

  updateGeometry() {
    const { entities } = this.archetypes.particles

    /* Positions */
    for (let i = 0; i < entities.length; i++) {
      const entity = entities[i]
      const i3 = i * 3

      this.positions[i3] = entity.transform.position.x
      this.positions[i3 + 1] = entity.transform.position.y
      this.positions[i3 + 2] = entity.transform.position.z

      this.colors[i3] = entity.particle.color.r
      this.colors[i3 + 1] = entity.particle.color.g
      this.colors[i3 + 2] = entity.particle.color.b

      this.sizes[i] = entity.particle.size

      this.alphas[i] = entity.particle.alpha
    }

    this.attributes.position.needsUpdate = true
    this.attributes.color.needsUpdate = true
    this.attributes.size.needsUpdate = true
    this.attributes.alpha.needsUpdate = true

    /* Apply attribute arrays to geometry */
    this.computeBoundingSphere()
  }

  updateSystems(dt: number) {
    for (const system of this.systems) {
      system(dt)
    }
  }
}

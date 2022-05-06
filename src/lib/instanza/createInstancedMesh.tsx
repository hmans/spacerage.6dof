import { InstancedMeshProps, Object3DProps, useFrame } from "@react-three/fiber"
import { IEntity, RegisteredEntity, Tag, World } from "miniplex"
import { createECS } from "miniplex-react"
import React, { FC, forwardRef, useEffect, useRef, useState } from "react"
import {
  BufferGeometry,
  DynamicDrawUsage,
  Group,
  InstancedMesh,
  Material,
  Matrix4,
  Object3D,
  Usage
} from "three"
import { Update } from "../../spacerage/Update"
import mergeRefs from "react-merge-refs"

export type InstanceComponents = {
  instance: Tag
  matrix4: Matrix4
  visible: boolean
}

export type InstanceEntity<CustomComponents = IEntity> = CustomComponents &
  InstanceComponents

export const createInstancedMesh = <Custom extends IEntity = IEntity>({
  systemFactory,
  material,
  geometry,
  usage = DynamicDrawUsage
}: {
  systemFactory?: (world: World<InstanceEntity<Custom>>) => (dt: number) => void
  material?: Material | Material[]
  geometry?: BufferGeometry
  usage?: Usage
} = {}) => {
  /* We're using Miniplex as a state container. */
  const ECS = createECS<InstanceEntity<Custom>>()

  /* If a system factory has been passed, prepare the custom system. */
  const system = systemFactory && systemFactory(ECS.world)

  /* This component renders the InstancedMesh itself and continuously updates it
     from the data in the ECS. */
  const Root: FC<
    InstancedMeshProps & {
      instanceLimit?: number
    }
  > = ({ instanceLimit = 10000, ...props }) => {
    const instancedMesh = useRef<InstancedMesh>(null!)

    useEffect(() => {
      instancedMesh.current.instanceMatrix.setUsage(usage)
    }, [])

    const { entities } = ECS.useArchetype("matrix4", "visible")

    function updateInstanceMatrix() {
      const imesh = instancedMesh.current
      const l = entities.length
      let count = 0

      for (let i = 0; i < l; i++) {
        const { matrix4, visible } = entities[i]

        if (visible) {
          imesh.setMatrixAt(i, matrix4)
          count++
        }
      }

      imesh.instanceMatrix.needsUpdate = true
      imesh.count = count
    }

    useFrame((_, dt) => {
      system?.(dt)
      updateInstanceMatrix()
    }, Update.Late)

    return (
      <instancedMesh
        {...props}
        ref={instancedMesh}
        args={[geometry, material, instanceLimit]}
      />
    )
  }

  const useEntities = (
    count = 1,
    entityFactory: () => InstanceEntity<Custom>
  ) => {
    const [entities] = useState(() => {
      const entities = new Array<InstanceEntity<Custom>>()

      for (let i = 0; i < count; i++) {
        entities.push({
          ...(entityFactory ? entityFactory() : ({} as InstanceEntity<Custom>))
        })
      }

      return entities
    })

    useEffect(() => {
      for (const entity of entities) {
        ECS.world.createEntity(entity)
      }

      return () => {
        for (const entity of entities) {
          ECS.world.destroyEntity(
            entity as RegisteredEntity<InstanceEntity<Custom>>
          )
        }
      }
    })

    return entities
  }

  const useInstances = (
    count = 1,
    entityFactory?: () => Partial<InstanceEntity<Custom>>
  ) =>
    useEntities(count, () => ({
      instance: Tag,
      matrix4: new Matrix4(),
      visible: true,
      ...(entityFactory ? (entityFactory() as any) : {})
    }))

  const Instance = forwardRef<Group, Object3DProps>((props, ref) => {
    const instance = useInstances(1)[0]
    const localRef = useRef<Object3D>(null!)

    useEffect(() => {
      instance.matrix4 = localRef.current.matrixWorld
    })

    return (
      <object3D
        matrix={instance.matrix4}
        {...props}
        ref={mergeRefs([localRef, ref])}
      />
    )
  })

  const ThinInstance: FC<{
    count?: number
    entityFactory?: () => Partial<InstanceEntity<Custom>>
  }> = ({ count = 1, entityFactory }) => {
    useInstances(count, entityFactory)
    return null
  }

  return {
    ECS,
    useInstances,
    Root,
    Instance,
    ThinInstance
  }
}

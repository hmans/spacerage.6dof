import { Canvas } from "@react-three/fiber";

export const Game = () => {
  return (
    <Canvas>
      <mesh>
        <boxBufferGeometry />
        <meshBasicMaterial color="hotpink" />
      </mesh>
    </Canvas>
  );
};

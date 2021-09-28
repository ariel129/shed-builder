import React, { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useSpring, a } from "@react-spring/three";
import { useGLTF } from "@react-three/drei";
import { CameraControls } from "./CameraControls";

const Model = ({ isDraggable }) => {
  const meshRef = useRef();
  const objectRef = useRef();
  const objectColor = useRef();

  return isDraggable ? <a.mesh ref={objectRef} /> : <a.mesh ref={meshRef} />;
};

const View = ({ type, position = -6.5 }) => {
  const groupRef = useRef();
  const { nodes, materials } = useGLTF(type);

  const [rotation, setRotation] = useState(true);

  useFrame(() => (groupRef.current.rotation.y = position));

  return (
    <group ref={groupRef}>
      {Object.values(nodes).map((item, index) => {
        let material = materials[item.name];

        return (
          <mesh
            key={index}
            visible={true}
            geometry={item.geometry}
            material={material}
          />
        );
      })}

      <CameraControls rotation={rotation} />
    </group>
  );
};

const Builder = ({ directInsensity, ambientInsensity, type }) => {
  return type ? (
    <Canvas style={{ display: "flex", height: "100vh" }}>
      <directionalLight intensity={directInsensity} />
      <ambientLight intensity={ambientInsensity} />
      <Suspense fallback="loading">
        <View type={type} />
      </Suspense>
    </Canvas>
  ) : (
    <div>Import files!</div>
  );
};

export default Builder;

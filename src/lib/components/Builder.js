import React, { useState, useEffect, useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useSpring, a } from "@react-spring/three";
import { useGLTF, Html, useProgress } from "@react-three/drei";
import { useGesture } from "react-use-gesture";
import * as THREE from "three";

import { CameraControls } from "./CameraControls";

const Loader = () => {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
};

const Model = ({
  isDraggable,
  visible,
  geometry,
  material,
  color,
  nodes,
  setRotation,
}) => {
  const meshRef = useRef();
  const objectRef = useRef();
  const objectColor = useRef();

  const [spring, set] = useSpring(() => ({
    scale: [1, 1, 1],
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  }));
  const { size, viewport, camera } = useThree();
  const aspect = size.width / viewport.width;

  // eslint-disable-next-line
  const [selected, setSelected] = useState(false);
  const [bounds, setBounds] = React.useState({ left: -100, right: 100 });

  const checkForCameraDirection = () => {
    const { x, y, z } = camera.rotation;

    if (x === 0 && y > 1.57 && z === 0) {
      return "FRONT";
    }

    if (x < -3.14 && y === 0 && z < -3.14) {
      return "RIGHT";
    }
  };

  const bind = useGesture(
    {
      onDrag: ({ event, down, offset: [x, y], _bounds }) => {
        setRotation(false);
        event.stopPropagation();
        if (checkForCameraDirection() === "FRONT") {
          set({ position: [0, 0, -x / aspect], immediate: false });
        } else {
          set({ position: [-x / aspect, 0, 0], immediate: false });
        }
        objectColor.current = "lightgray";
      },
      onDragEnd: () => {
        setRotation(true);
        objectColor.current = "white";
      },
      onDragStart: () => {
        const container = new THREE.Box3()?.setFromObject(nodes.Container_Body);
        const childObject = new THREE.Box3()?.setFromObject(objectRef.current);

        if (checkForCameraDirection() === "FRONT") {
          const parentMin = container.getSize(container.max);
          const childObjectMin = childObject.getSize(childObject.max);
          const midPoint = (parentMin.z + childObjectMin.z) / 2;

          const result = ((parentMin.z - midPoint) * aspect) / 2;
          setBounds({ left: -Math.abs(result), right: Math.abs(result) });
        } else {
          const parentMin = container.getSize(container.max);
          const childObjectMin = childObject.getSize(childObject.max);
          const midPoint = (parentMin.x + childObjectMin.x) / 1.8;

          const result = (parentMin.x - midPoint) * aspect;
          setBounds({ left: -Math.abs(result), right: Math.abs(result) });
        }
      },
      onHover: (state) => {
        setSelected(true);
      },
    },
    {
      drag: {
        enabled: true,
        bounds: bounds,
      },
    }
  );

  return isDraggable ? (
    <a.mesh
      ref={objectRef}
      visible={visible}
      geometry={geometry}
      material={material}
      onPointerOver={(e) => console.log("hover")}
      onPointerOut={(e) => console.log("unhover")}
      parentObject={nodes.Container_Body}
      material-color={objectColor.current}
      {...spring}
      {...bind()}
    />
  ) : (
    <a.mesh
      ref={meshRef}
      visible={visible}
      geometry={geometry}
      material={material}
      material-color={color}
    />
  );
};

const View = ({ type, data, position = -6.5 }) => {
  const groupRef = useRef();
  const { nodes, materials } = useGLTF(type);

  const [rotation, setRotation] = useState(true);

  useFrame(() => (groupRef.current.rotation.y = position));

  useEffect(() => {}, []);

  return (
    <group ref={groupRef}>
      {Object.values(nodes).map((node, index) => {
        let isMaterial = materials[node.name];
        let isVisible = false;
        let isDraggable = false;
        let isColor = "silver";

        let isEqual = data.find((items) => items.name === node.name);

        if (node.name === isEqual?.name) {
          isVisible = isEqual.visible;
          isMaterial = isEqual.material ? materials[isEqual.name] : isMaterial;
          isColor = isEqual.color ? isEqual.color : isColor;
          isDraggable = isEqual.draggable ? isEqual.draggable : isDraggable;
        }

        return (
          <Model
            key={index}
            visible={isVisible}
            geometry={node.geometry}
            material={isMaterial}
            draggable={isDraggable}
            color={isColor}
            nodes={nodes}
            setRotation={setRotation}
          />
        );
      })}

      <CameraControls rotation={rotation} />
    </group>
  );
};

const Builder = ({ directInsensity, ambientInsensity, type, data }) => {
  console.log(232);
  return type ? (
    <Canvas style={{ display: "flex", height: "100vh" }}>
      <directionalLight intensity={directInsensity} />
      <ambientLight intensity={ambientInsensity} />
      <Suspense fallback={<Loader />}>
        <View type={type} data={data} />
      </Suspense>
    </Canvas>
  ) : (
    <div>Import files!</div>
  );
};

export default Builder;

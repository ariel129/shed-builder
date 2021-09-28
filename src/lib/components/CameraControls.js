import React, { useState, useRef } from "react";
import { useThree, useFrame, extend } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

extend({ OrbitControls });

export const CameraControls = ({ rotation }) => {
  const [resetCam, setResetCam] = useState(true);

  const {
    camera,
    gl: { domElement },
  } = useThree();

  const controls = useRef();

  if (rotation && resetCam) {
    camera.position.z = 2.0;
    camera.position.x = 8.5;
    camera.position.y = 0;
    if (rotation) {
      setResetCam();
    }
  }

  useFrame(() => controls.current.update());

  return (
    <orbitControls
      ref={controls}
      args={[camera, domElement]}
      autoRotate={false}
      enableZoom={true}
      enableRotate={rotation}
    />
  );
};

import { OrbitControls, PerspectiveCamera, useHelper } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/three";
import { Suspense, useRef, useState } from "react";
import styled from "styled-components";
import * as THREE from "three";
import { CameraHelper } from "three";

const Title = styled.h1`
  padding: 10px;
`;

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
  aspects: window.innerWidth / window.innerHeight,
};

const Plane = () => {
  return (
    <group>
      <mesh rotation={[0, 0, 0]}>
        <planeBufferGeometry attach="geometry" args={[20, 20]} />
        <gridHelper args={[20, 20]} rotation={[0, 0, 0]} />
        <meshStandardMaterial
          attach="material"
          color="white"
          side="doubleSide"
          visible={false}
        />

        <axesHelper args={[100]} />
      </mesh>
    </group>
  );
};

// const Box = () => {
//   const [isClicked, setIsClicked] = useState(false);
//   const { scale } = useSpring({
//     scale: isClicked ? 1.5 : 1,
//     config: { mass: 5, tension: 500, friction: 80 },
//   });
//   return (
//     <animated.mesh
//       scale={scale}
//       onClick={() => setIsClicked(!isClicked)}
//       position={[0, 1, 0]}
//     >
//       <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
//       <meshStandardMaterial attach="material" color="blue" visible={true} />
//     </animated.mesh>
//   );
// };

const cursor = {
  x: 0,
  y: 0,
};

const mesh = {
  position: null,
};

const Box = () => {
  const box = useRef();
  mesh.position = box;
  return (
    <mesh ref={box}>
      <meshStandardMaterial color="hotpink" />
      <boxGeometry args={[1, 1, 1, 5, 5, 5]} />
    </mesh>
  );
};

const Camera = () => {
  const camera = useRef();
  const cameraRef = useRef();
  const BoxRef = useRef();

  const RefonClick = () => {
    console.log("clicked");
    const { x, y, z } = cameraRef.current.position;
    cameraRef.current.position.set(x, y, z + 1);

    camera.current.position.z = z;
    camera.current.lookAt(cameraRef.current.position);
  };

  document.onkeydown = (e) => {
    switch (e.keyCode) {
      case 37:
        cameraRef.current.position.x = cameraRef.current.position.x -= 0.5;
        break;
      case 39:
        cameraRef.current.position.x = cameraRef.current.position.x += 0.5;
        break;
      case 38:
        cameraRef.current.position.z = cameraRef.current.position.z -= 0.5;
        break;
      case 40:
        cameraRef.current.position.z = cameraRef.current.position.z += 0.5;
        break;
      default:
    }
    const { x, y, z } = cameraRef.current.position;
    cameraRef.current.position.set(x, y, z);
    camera.current.position.x = x;
    camera.current.position.z = z;
    camera.current.position.y = y;

    if (camera.current && cameraRef.position.current) {
      camera.current.position.y = y;
      camera.current.position.z = z;
      camera.current.position.x = x;
      camera.current.lookAt(cameraRef.position.current.position);
    }
  };

  return (
    <perspectiveCamera
      ref={camera}
      fov={75}
      aspect={sizes.width / sizes.height}
      near={0.1}
      far={100}
    >
      <Box />
      <group position={[0, 0, 0]}>
        <mesh ref={cameraRef} onClick={RefonClick}>
          <boxBufferGeometry
            attach="geometry"
            args={[3, 3, 3]}
            position={(1, 0, 0)}
          />
          <meshStandardMaterial attach="material" color="white" />
        </mesh>

        <Box />
        <mesh ref={BoxRef} position={[0, 0, -3]}>
          <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
          <meshStandardMaterial attach="material" color="red" visible={true} />
        </mesh>
        <Plane />
      </group>
    </perspectiveCamera>
  );
};

function App() {
  return (
    <Canvas shadows>
      <Camera />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />
    </Canvas>
  );
}

export default App;

import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, CameraControls } from "@react-three/drei";
import DaySky from "./components/DaySky";
import Lights from "./components/Lights";
import Scene from "./components/Scene";
import UI from "./UI/UI";
import CameraPresets from "./UI/CameraPresets";
import OrientationWarning from "./components/OrientationWarning";

function App() {
  const controlsRef = useRef(null);

  const handlePresetClick = (position, target) => {
    if (controlsRef.current) {
      controlsRef.current.setLookAt(
        position[0],
        position[1],
        position[2],
        target[0],
        target[1],
        target[2],
        true, // smooth transition
      );
    }
  };

  return (
    <>
      <OrientationWarning />
      <Canvas
        camera={{ position: [0, 2000, 3000], fov: 50, near: 10, far: 10000 }}
        gl={{ antialias: true }}
      >
        <Lights />
        <DaySky />
        <Scene />
        <CameraControls
          ref={controlsRef}
          makeDefault
          minDistance={500}
          maxDistance={8000}
          maxPolarAngle={Math.PI / 2.1}
        />
        {/* Environment */}
        <Environment preset="city" />
      </Canvas>
      <UI />
      <CameraPresets onPresetClick={handlePresetClick} />
    </>
  );
}

export default App;

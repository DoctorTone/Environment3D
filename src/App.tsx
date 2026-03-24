import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { INTERACTIONS, TARGET_POSITION } from "./state/Config";
import DaySky from "./components/DaySky";
import Lights from "./components/Lights";
import ResponsiveCamera from "./components/ResponsiveCamera";
import Scene from "./components/Scene";
import UI from "./UI/UI";

function App() {
  return (
    <>
      <Canvas
        camera={{ position: [0, 1200, 1500], fov: 50, near: 10, far: 10000 }}
        gl={{ antialias: true }}
      >
        {/* <ResponsiveCamera /> */}
        <Lights />
        <DaySky />
        <Scene />
        <OrbitControls
          makeDefault
          enablePan={INTERACTIONS.PAN}
          enableRotate={INTERACTIONS.ROTATE}
          enableDamping={true}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
          target={[TARGET_POSITION.X, TARGET_POSITION.Y, TARGET_POSITION.Z]}
          minDistance={500}
          maxDistance={10000}
        />
        {/* Environment */}
        <Environment preset="city" />
      </Canvas>
      <UI />
    </>
  );
}

export default App;

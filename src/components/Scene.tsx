import Buildings from "./Buildings";
import Ground from "./Ground";
import { useThree } from "@react-three/fiber";

const Scene = () => {
  const { camera, controls } = useThree();

  // DEBUG
  console.log("Cam = ", camera.position);
  console.log("Controls = ", controls);
  return (
    <>
      <Buildings />
      <Ground />
    </>
  );
};

export default Scene;

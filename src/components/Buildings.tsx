import { useMemo } from "react";
import { Instances, Instance } from "@react-three/drei";
import * as THREE from "three";
import buildingData from "../data/london_heat_data.json";

export default function Buildings() {
  const { buildings, metadata } = buildingData;

  // Create color scale function
  const tempToColor = useMemo(() => {
    const [minTemp, maxTemp] = metadata.tempRange;

    return (temp) => {
      // Normalize to 0-1
      const t = (temp - minTemp) / (maxTemp - minTemp);

      // Dramatic 4-zone gradient
      if (t < 0.25) {
        // Coolest 25%: Deep blue
        return new THREE.Color(0x2e7d99);
      } else if (t < 0.5) {
        // Cool-medium: Green
        return new THREE.Color(0x5fbf8e);
      } else if (t < 0.75) {
        // Medium-hot: Yellow
        return new THREE.Color(0xf2c94c);
      } else {
        // Hottest 25%: Orange-red
        return new THREE.Color(0xf2664c);
      }
    };
  }, [metadata.tempRange]);

  return (
    <Instances limit={buildings.length}>
      <boxGeometry />
      <meshStandardMaterial />

      {buildings.map((building, i) => (
        <Instance
          key={i}
          position={[building.x, building.height / 2, building.z]}
          scale={[building.width, building.height, building.depth]}
          color={tempToColor(building.temp)}
        />
      ))}
    </Instances>
  );
}

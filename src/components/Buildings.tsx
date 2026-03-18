import { useMemo } from "react";
import { Instances, Instance } from "@react-three/drei";
import * as THREE from "three";
import buildingData from "../../public/london_heat_data.json";

export default function Buildings() {
  const { buildings, metadata } = buildingData;

  // Create color scale function
  const tempToColor = useMemo(() => {
    const [minTemp, maxTemp] = metadata.tempRange;

    return (temp) => {
      // Normalize temperature to 0-1
      const t = (temp - minTemp) / (maxTemp - minTemp);

      // Create color gradient: blue (cool) → yellow → red (hot)
      // HSL: Hue 240° (blue) → 0° (red)
      const hue = (1 - t) * 0.6; // 0.6 = 216° (blue), 0 = 0° (red)
      const saturation = 0.8;
      const lightness = 0.5;

      return new THREE.Color().setHSL(hue, saturation, lightness);
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

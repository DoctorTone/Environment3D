import { useMemo, useState, useEffect } from "react";
import { Instances, Instance } from "@react-three/drei";
import * as THREE from "three";

export default function Buildings({ onLoad }) {
  const [buildingData, setBuildingData] = useState(null);

  useEffect(() => {
    fetch("/london_heat_data.json")
      .then((res) => res.json())
      .then((data) => {
        setBuildingData(data);
        if (onLoad) onLoad();
      })
      .catch((err) => console.error("Failed to load building data:", err));
  }, []);

  // Create color scale function
  const tempToColor = useMemo(() => {
    if (!buildingData) return null;

    const [minTemp, maxTemp] = buildingData.metadata.tempRange;

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
  }, [buildingData]);

  // Don't render anything until data is loaded
  if (!buildingData) return null;

  const { buildings } = buildingData;

  return (
    <group position={[-1500, 0, -1000]}>
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
    </group>
  );
}

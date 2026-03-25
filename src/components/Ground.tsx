export default function Ground() {
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[1900, 0, 750]}
      receiveShadow
    >
      <planeGeometry args={[7500, 5000]} />
      <meshStandardMaterial color="#0a0a0a" />
    </mesh>
  );
}

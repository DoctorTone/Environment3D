export default function Ground() {
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[2000, 0, 500]}
      receiveShadow
    >
      <planeGeometry args={[8000, 6000]} />
      <meshStandardMaterial color="#0a0a0a" />
    </mesh>
  );
}

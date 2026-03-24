export default function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[8000, 4000]} />
      <meshStandardMaterial color="#a39dbb" />
    </mesh>
  );
}

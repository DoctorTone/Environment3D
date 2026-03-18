const Lights = () => {
  return (
    <>
      <directionalLight
        position={[100, 200, 100]}
        intensity={3.8}
        // castShadow
        // shadow-mapSize={[2048, 2048]}
      />
      <ambientLight intensity={0.4} />
    </>
  );
};

export default Lights;

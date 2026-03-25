import { useState } from "react";
import Buildings from "./Buildings";
import Ground from "./Ground";
import Loader from "./Loader";

const Scene = () => {
  const [buildingsLoaded, setBuildingsLoaded] = useState(false);

  return (
    <>
      {!buildingsLoaded && <Loader />}
      <Buildings onLoad={() => setBuildingsLoaded(true)} />
      <Ground />
    </>
  );
};

export default Scene;

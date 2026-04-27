import Legend from "./Legend";
import InfoPanel from "./InfoPanel";
import buildingData from "../data/london_heat_data.json";
import Copyright from "./Copyright";

const tempRange = buildingData.metadata.tempRange as [number, number];

const UI = () => {
  return (
    <>
      <Legend tempRange={tempRange} />
      <InfoPanel metadata={{ ...buildingData.metadata, tempRange }} />
      <Copyright />
    </>
  );
};

export default UI;

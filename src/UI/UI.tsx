import Copyright from "../UI/Copyright";
import Controls from "./Controls";
import Info from "./Info";
import Legend from "./Legend";
import InfoPanel from "./InfoPanel";
import buildingData from "../data/london_heat_data.json";

const UI = () => {
  return (
    <>
      <Copyright />
      {/* <Controls /> */}
      {/* <Info /> */}
      <Legend tempRange={buildingData.metadata.tempRange} />
      <InfoPanel metadata={buildingData.metadata} />
    </>
  );
};

export default UI;

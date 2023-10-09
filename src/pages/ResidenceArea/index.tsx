import React from "react";
import AllAreaMap from "../../components/map/AllAreaMap";
import OneAreaMap from "../../components/map/OneAreaMap";

function ResidenceArea(){
    return(<div style={{width: "100vw", height: '100vh'}}><OneAreaMap areaId={2}/></div>)
}
export default ResidenceArea;
import React from "react";
import AllAreaMap from "../../components/map/AllAreaMap";
import OneAreaMap from "../../components/map/OneAreaMap";
import BottomTab from "../../components/layout/bottomtabs";

function ResidenceArea(){
    return(
    <div style={{width: "100vw", height: '100vh'}}>
        <AllAreaMap/>
        <BottomTab/>
    </div>)
}
export default ResidenceArea;
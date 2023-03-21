import React from 'react';
import { useLocation } from "react-router";

function HbtiResult() {
    const { state } = useLocation();
    return <div style={{textAlign:"center",width:"100vw", fontSize:30 }}>{state}</div>;
}

export default HbtiResult;

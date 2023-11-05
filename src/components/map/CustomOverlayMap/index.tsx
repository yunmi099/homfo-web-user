import React, {useState, useEffect} from 'react';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';
import styles from './styles.module.scss';
import { Area } from '../../../store/type/homfoRecommend&request/interface';
const COLOR_PALLETE = [
    'linear-gradient(180deg, #A220FF 0%, rgba(32, 54, 255, 0.43) 57.29%, rgba(97, 30, 144, 0.28) 100%)',
    'linear-gradient(rgba(162, 32, 255, 1), rgba(32, 54, 255, 0.28), rgba(162, 32, 255, 0.54))',
    'radial-gradient(rgba(162, 32, 255, 1), rgba(224, 32, 255, 0.6), rgba(189, 0, 255, 1))'
];

interface CircleMapProps {
    item : Area;
    order: number;
    showAreaName: boolean;
    onClick?: ()=>void;
    currentLevel:  number;
}
const CustomOverlay = ({item, order, showAreaName, currentLevel, onClick} : CircleMapProps)=>{
    return(                
    <CustomOverlayMap
        key={item.name}
        position={{ lat: item.lat, lng: item.lng }}
        xAnchor={0}
        yAnchor={0}
    >
    <div 
        onClick={()=>onClick?onClick():null}
        className={styles.circle}      
        style={{
            width:`${item.radius * 16 / (Math.pow(2, currentLevel))}px`,
            height: `${item.radius * 16 / (Math.pow(2, currentLevel))}px`,
            background: COLOR_PALLETE[order % 3],
            opacity: (order % 3 === 2) ? 0.6 : ((order % 3 === 0) ? 1 : 0.7),
        }}>
        <div>{showAreaName&&item.name}&nbsp;&nbsp;</div>
    </div>
    </CustomOverlayMap>);
}

export default CustomOverlay;
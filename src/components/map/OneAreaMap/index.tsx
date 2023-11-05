import React, { useEffect, useState } from 'react';

import { Map } from 'react-kakao-maps-sdk';

import { getAreaInfo } from '../../../services/area/api';

import { Area } from '../../../store/type/homfoRecommend&request/interface';

import CustomOverlay from '../CustomOverlayMap';

import styles from './styles.module.scss';

const BASIC_ZOOM_LEVEL = 4;

function OneAreaMap({areaId}:{areaId:number}) {
    const [areaInfo, setAreaInfo] = useState<Area[]|undefined>();
    const [showAreaName, setShowAreaName] = useState<boolean>(true);
    const [currentLevel, setCurrentLevel] = useState<number>(BASIC_ZOOM_LEVEL);
    const [mapInstance, setMapInstance] = useState<any>(null);

    useEffect(()=>{
        getAreaInfo("단국대학교", "본교", setAreaInfo, areaId);
    },[])
    const handleMapLoad = (map: any) => {
        setMapInstance(map); 
    };

    const handleZoomChange = () => {
        if (mapInstance) {
            const currentZoomLevel = mapInstance.getLevel();
            setCurrentLevel(currentZoomLevel);
            if (currentZoomLevel < 6) {
                setShowAreaName(true);

            } else {
                setShowAreaName(false);
            }
        }
    };
    return (
        <>
            {areaInfo&&
            <Map
                center={{ lat: areaInfo[0].lat, lng: areaInfo[0].lng }}
                className={styles.mapContainer}
                level={BASIC_ZOOM_LEVEL}
                onCreate={handleMapLoad}
                onZoomChanged={handleZoomChange}
            >
                <CustomOverlay item={areaInfo[0]} order={areaId} showAreaName={showAreaName} currentLevel={currentLevel}/>
             </Map>
            }   
        </>
    );
}

export default OneAreaMap;

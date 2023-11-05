import React, { useEffect, useState } from 'react';
import { Map} from 'react-kakao-maps-sdk';
import { getAreaInfo } from '../../../services/area/api';
import { Area } from '../../../store/type/homfoRecommend&request/interface';
import styles from './styles.module.scss'
import CustomOverlay from '../CustomOverlayMap';
import { useNavigate } from 'react-router-dom';

interface AllAreaMapProps {
    basicZoomLevel? : number,
    renderingDetailPage?: boolean
}

function AllAreaMap({basicZoomLevel = 7, renderingDetailPage = false} : AllAreaMapProps) {
    const [areaInfo, setAreaInfo] = useState<Area[]|undefined>();
    const [mapInstance, setMapInstance] = useState<any>(null);
    const [showAreaName, setShowAreaName] = useState<boolean>(false);
    const [averageCoordinates, setAverageCoordinates] = useState({ lat: 37.323160599999994, lng: 127.12145301818182});
    const [currentLevel, setCurrentLevel] = useState<number>(basicZoomLevel);
    const navigate = useNavigate();

    useEffect(()=>{
        getAreaInfo("단국대학교", "본교", setAreaInfo);
    },[])

    const handleMapLoad = (map: any) => {
        setMapInstance(map); 
    };

    const handleOverlayClick = (item : Area)=>{
        navigate('/residence-area-map/detail',{state: item});
    }

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

    useEffect(() => {
        if (areaInfo) {
          let locationSum = areaInfo.reduce(
            (accumulator, current) => {
              return {
                lat: accumulator.lat + current.lat,
                lng: accumulator.lng + current.lng,
              };
            },
            { lat: 0, lng: 0}
          );
          setAverageCoordinates({lat: locationSum.lat/areaInfo.length, lng:locationSum.lng/areaInfo.length});
        }

    }, [areaInfo]);

    return (
        <>
            <Map
                center={averageCoordinates}
                className={styles.mapContainer}
                level={basicZoomLevel}
                onCreate={handleMapLoad}
                onZoomChanged={handleZoomChange}
            >{
                areaInfo?.map((item, index)=>{
                return (
                    <CustomOverlay
                        onClick = {renderingDetailPage?()=>handleOverlayClick(item):undefined}
                        key = {item.name}
                        item={item}
                        order={index}
                        showAreaName={showAreaName}
                        currentLevel={currentLevel} 
                    />
                )})
            }
            </Map>
        </>
    );
}

export default AllAreaMap;

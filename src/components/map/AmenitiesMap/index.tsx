import React, { useEffect, useState } from 'react';
import { Map , Circle , MapMarker, CustomOverlayMap} from 'react-kakao-maps-sdk';
import { Area } from '../../../store/type/homfoRecommend&request/interface';
import styles from './styles.module.scss'
import { getAmenitiesCoordinates, getStoreDetail } from '../../../services/amenities/api';
import { FilteredAmenitiesBasicInfo, StoreDetail, amenitiesBasicInfo } from '../../../store/type/amenities/interface';
import * as pinIcon from '../../../assets/icons/map/icon/mapIcon'
import { OverlayDetail } from './overlayDetail';
function AmenitiesMap({item, storeType}:{item: Area, storeType: string|undefined}) {
    const [mapInstance, setMapInstance] = useState<kakao.maps.Map|null>(null);
    const [currentLevel, setCurrentLevel] = useState<number>(4);
    const [currentPin, setCurrentPin] = useState<amenitiesBasicInfo[]|null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [amenitiesBasicData, setAmenitiesBasicData] = useState<FilteredAmenitiesBasicInfo>();
    const [storeDetail, setStoreDetail] = useState<StoreDetail[]|null>(null);
    const [center, setCenter] = useState({
        lat: item.lat,
        lng:item.lng,
    })
    useEffect(()=>{
        if (storeType!==undefined){
            getAmenitiesCoordinates(item.areaId, storeType, setAmenitiesBasicData);
        }
    },[storeType])

    const handleMapLoad = (map: kakao.maps.Map) => {
        setMapInstance(map); 
    };

    const handleZoomChange = () => {
        if (mapInstance) {
            const currentZoomLevel = mapInstance.getLevel();
            setCurrentLevel(currentZoomLevel);
        }
    };
    const handleOnClickMapMarker =  (item: amenitiesBasicInfo[])=>{
        setCurrentPin(item);
    }
    useEffect(()=>{
        setCurrentIndex(0);
        currentPin?.map((store)=> 
            {
                getStoreDetail(store.storeId, setStoreDetail)
            }
        )
    },[currentPin])
    return (
        <>
            <Map
                center={center}
                className={styles.mapContainer}
                level={3}
                onCreate={handleMapLoad}
                onZoomChanged={handleZoomChange}
            >
                <Circle
                    center={{ lat: item.lat, lng: item.lng }}
                    radius={item.radius}
                    fillColor="transperant"
                    strokeColor="rgba(162, 32, 255, 1)" // 테두리 색상 설정
                    strokeWeight={1} // 테두리 두께 설정
                    fillOpacity={0.4}
                />
            {
                amenitiesBasicData!==undefined?
                Object.values(amenitiesBasicData).map((item)=>
                <div
                    key={item[currentIndex].storeId}
                >
                    <MapMarker 
                        image = {{ 
                            src: JSON.stringify(currentPin) === JSON.stringify(item)? pinIcon.selectedPin : pinIcon.pin,
                            size : {
                                width: JSON.stringify(currentPin) === JSON.stringify(item) ? 19 : 15,
                                height: JSON.stringify(currentPin) === JSON.stringify(item) ? 27 : 22,
                            }
                            
                        }}
                        position={{
                            lat : item[0].lat,
                            lng : item[0].lng,
                        }}
                        onClick={()=>handleOnClickMapMarker(item)}
                    />
                    {
                        JSON.stringify(currentPin) === JSON.stringify(item) ?
                        <CustomOverlayMap
                            position={{ lat: item[0].lat, lng: item[0].lng }}
                            xAnchor={0}
                            yAnchor={0}
                        >
                            <div className={styles.overlayContainer}>
                            {storeDetail!==null&&
                                <OverlayDetail 
                                    storeDetail={storeDetail} 
                                    currentIndex={currentIndex}
                                    setCurrentPin = {setCurrentPin}
                                    setCurrentIndex={setCurrentIndex}
                                />
                            }
                            </div>
                        </CustomOverlayMap>: null
                    }
               </div>
                ):null
            }
            
            </Map>
        </>
    );
}

export default AmenitiesMap;

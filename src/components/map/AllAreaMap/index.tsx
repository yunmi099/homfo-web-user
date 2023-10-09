import React, { useEffect, useState } from 'react';
import { Map, MarkerClusterer, MapMarker, CustomOverlayMap, Circle } from 'react-kakao-maps-sdk';
import AreaInfoOverlay from './\bAreaInfoOverlay';
import { getAreaInfo } from '../../../services/area/api';
import { Area } from '../../../store/type/homfoRecommend&request/interface';
function AllAreaMap() {
    const [isOpen, setIsOpen] = useState(false);
    const [areaInfo, setAreaInfo] = useState<Area[]|undefined>();
    const [averageCoordinates, setAverageCoordinates] = useState({ lat: 37.323160599999994, lng: 127.12145301818182});
    useEffect(()=>{
        getAreaInfo("단국대학교", "본교",setAreaInfo);
    },[])
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
    const onClickCluster = () => {
        setIsOpen(true);

    };
    return (
        <>
            <Map
                center={averageCoordinates}
                style={{ width: '100%', height: '100%' }}
                level={7}
            >{
                areaInfo?.map((key, index)=>{return<>
                <Circle
                    key={index} // 고유한 키를 지정
                    center={{ lat: key.lat, lng: key.lng }}
                    radius={key.radius}
                    fillColor="rgba(162, 32, 255, 1)"
                    strokeColor="rgba(162, 32, 255, 1)" // 테두리 색상 설정
                    strokeWeight={1} // 테두리 두께 설정
                    fillOpacity={0.4}
                />
                <CustomOverlayMap
                    // content={key.name}
                    position={{ lat: key.lat, lng: key.lng }}
                    yAnchor={1.5} // 구역 이름 위치 조절
                />   
                </>})
            }
            </Map>
            {isOpen && (
                <div>
                    <AreaInfoOverlay setIsOpen={setIsOpen} />
                </div>
            )}
        </>
    );
}

export default AllAreaMap;

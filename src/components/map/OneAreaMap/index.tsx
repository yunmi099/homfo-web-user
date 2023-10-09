import React, { useEffect, useState } from 'react';
import { Map, MarkerClusterer, MapMarker, CustomOverlayMap, Circle } from 'react-kakao-maps-sdk';
import { getAreaInfo } from '../../../services/area/api';
import { Area } from '../../../store/type/homfoRecommend&request/interface';
function OneAreaMap({areaId}:{areaId:number}) {
    const [areaInfo, setAreaInfo] = useState<Area[]|undefined>();
    useEffect(()=>{
        getAreaInfo("단국대학교", "본교",setAreaInfo,areaId);
    },[])
    return (
        <>
            {areaInfo!==undefined&&<>
            <Map
                center={{ lat: areaInfo[0].lat, lng: areaInfo[0].lng }}
                style={{ width: '100%', height: '100%' }}
                level={4}
            >
                <Circle
                    center={{ lat: areaInfo[0].lat, lng: areaInfo[0].lng }}
                    radius={areaInfo[0].radius}
                    fillColor="rgba(162, 32, 255, 1)"
                    strokeColor="rgba(162, 32, 255, 1)" // 테두리 색상 설정
                    strokeWeight={1} // 테두리 두께 설정
                    fillOpacity={0.4}
                />
                <CustomOverlayMap
                    // content={key.name}
                    position={{ lat: areaInfo[0].lat, lng: areaInfo[0].lng }}
                    yAnchor={1.5} // 구역 이름 위치 조절
                />  
             </Map>
            </>
}
    
        </>
    );
}

export default OneAreaMap;

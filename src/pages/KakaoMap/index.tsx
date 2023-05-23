import React, { useState } from 'react';
import { Map, MarkerClusterer, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import AreaInfoOverlay from './\bAreaInfoOverlay';
import clusterPositionsData from './clusterPositionsData.json';
import BottomTab from '../../components/layout/bottomtabs';
import Header from '../../components/layout/header';
function KakaoMap() {
    const [isOpen, setIsOpen] = useState(false);

    const onClickCluster = () => {
        setIsOpen(true);
    };

    return (
        <>
            <Map
                center={{ lat: 37.332495, lng: 127.112503 }}
                style={{ width: '100%', height: '100vh' }}
                level={8}
            >
                <MarkerClusterer averageCenter={true} minLevel={5} onClusterclick={onClickCluster}>
                    {clusterPositionsData.positions.map((pos) => (
                        <MapMarker key={`${pos.lat}-${pos.lng}`} position={pos} />
                    ))}
                </MarkerClusterer>
            </Map>
            {isOpen && (
                <div>
                    <AreaInfoOverlay setIsOpen={setIsOpen} />
                </div>
            )}
            <BottomTab/>
        </>
    );
}

export default KakaoMap;

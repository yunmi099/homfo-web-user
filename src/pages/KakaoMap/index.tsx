import React from 'react';
import { Map, MarkerClusterer, MapMarker } from 'react-kakao-maps-sdk';

function KakaoMap() {
    return (
        <div>
            <Map
                center={{ lat: 36.2683, lng: 127.6358 }}
                style={{ width: '100%', height: '360px' }}
                level={14}
            >
                <MarkerClusterer averageCenter={true} minLevel={10}>
                    {/* {clusterPositionsData.positions.map((pos) => (
                        <MapMarker key={`${pos.lat}-${pos.lng}`} position={pos} />
                    ))} */}
                </MarkerClusterer>
            </Map>
        </div>
    );
}

export default KakaoMap;

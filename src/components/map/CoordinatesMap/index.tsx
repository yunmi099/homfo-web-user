import React, { useEffect, useState } from 'react';
import { Map,} from 'react-kakao-maps-sdk';
function OneAreaMap({lat, lng}:{lat:number, lng: number}) {
    return (
            <Map
                center={{ lat: lat, lng: lng }}
                style={{ width: '100%', height: '100%' }}
                level={4}
            >
            </Map>
    
    );
}

export default OneAreaMap;

import React, { useEffect, useState } from 'react';
import { Map, MapMarker,} from 'react-kakao-maps-sdk';
import { selectedPin } from '../../../assets/icons/map/icon/mapIcon';
function OneAreaMap({lat, lng}:{lat:number, lng: number}) {
    return (
            <Map
                center={{ lat: lat, lng: lng }}
                style={{ width: '100%', height: '100%' }}
                level={4}
            >
                <MapMarker 
                        image = {{ 
                            src: selectedPin,
                            size : {
                                width: 15,
                                height:22,
                            }
                            
                        }}
                        position={{
                            lat : lat,
                            lng : lng,
                        }}
                    />
            </Map>
    
    );
}

export default OneAreaMap;

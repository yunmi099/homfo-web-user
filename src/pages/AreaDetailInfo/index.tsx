import React,{useState, useEffect} from "react";
import * as mapIcon from '../../assets/icons/map/mapImage';
import styles from './styles.module.scss'
import { useLocation, useNavigate } from "react-router-dom";
import AmenitiesMap from "../../components/map/AmenitiesMap";
import { getAmenities } from "../../services/amenities/api";
import { Amenities } from "./Amenities";
import { OverlayInfo } from "./overlayInfo";

export default function AreaDetailInfo() {
    const [openAmenitiesScroll, setOpenAmenitiesScroll] = useState<boolean>(false);
    const [touchUpEvent, setTouchUpEvent] = useState(true);
    const [touchDownEvent, setTouchDownEvent] = useState(false);
    const [selectedAmenities, setSelectedAmenities] = useState<string|undefined>();

    const [AmenitiesInfo, setAmenitiesInfo] = useState({
        "FOOD" :  { 
            "name": "음식점 및 키페",
            "image": [mapIcon.foodOrCafe, mapIcon.coloredFoodOrCafe],
            "count": 0,
        },
        "MARKET" : {
            "type":"MARKET",
            "name": "마트 및 편의점",
            "image": [mapIcon.market, mapIcon.coloredMarket],
            "count": 0,
        },
        "LEISURE" : {
            "name": "오락시설",
            "image": [mapIcon.entertainment, mapIcon.coloredEntertainment],    
            "count": 0,
        },
        "STUDY" : {
            "type":"STUDY",
            "name": "학습시설",
            "image": [mapIcon.study, mapIcon.coloredStudy],
            "count": 0,
        },
    });

    const navigate = useNavigate();
    const location = useLocation();
    const receivedData = location.state;

    useEffect(()=>{
        getAmenities(receivedData.areaId, setAmenitiesInfo)
    },[receivedData.areaId])

  return (
    <div className={styles.container}>
        <img 
            alt="뒤로가기" 
            src={mapIcon.backButton}
            className={styles.backButton}
            onClick={()=>{
                navigate(-1);
            }}/>
        <div
            className={`${styles.amenitiesButton} ${openAmenitiesScroll ? styles.slideIn : ''}`}
            onClick={()=>{
                setOpenAmenitiesScroll(!openAmenitiesScroll);
                setTouchDownEvent(true);
                setTouchUpEvent(false);}}>
            <img 
                alt="편의시설" 
                src={mapIcon.amenities}
            />
            <div>편의시설</div>
        </div>
        {
            openAmenitiesScroll?
            <div className={`${styles.amenitiesView}  ${openAmenitiesScroll ? styles.show : ""}`}>
            {Object.entries(AmenitiesInfo).map((item) => {
                return (
                    <Amenities 
                        onClick={()=>setSelectedAmenities(selectedAmenities===item[0]?undefined:item[0])}
                        image={selectedAmenities===item[0]?item[1].image[1]:item[1].image[0]}
                        key={item[0]} 
                        name={item[1].name}
                        count={item[1].count}/>
                    );
            })}
            </div>:null
        }
        <OverlayInfo 
            areaId ={receivedData.areaId}
            touchUpEvent={touchUpEvent} 
            setTouchUpEvent={setTouchUpEvent} 
            touchDownEvent={touchDownEvent} 
            setTouchDownEvent={setTouchDownEvent}
        />
        <AmenitiesMap item={receivedData} storeType={selectedAmenities}/>
    </div>)
}

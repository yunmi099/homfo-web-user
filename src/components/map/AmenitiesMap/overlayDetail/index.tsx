import React from 'react'
import styles from './styles.module.scss'
import { StoreDetail, amenitiesBasicInfo } from '../../../../store/type/amenities/interface';
import * as pinIcon from '../../../../assets/icons/map/icon/mapIcon';
interface OverlayDetailProps {
    storeDetail: StoreDetail[]; 
    currentIndex: number;
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
    setCurrentPin: React.Dispatch<React.SetStateAction<amenitiesBasicInfo[] | null>>;
}  

export const OverlayDetail = ({storeDetail, currentIndex, setCurrentIndex, setCurrentPin} : OverlayDetailProps)=>{
    return(
    <>
        <div className = {styles.storeName}>{storeDetail[currentIndex].name}</div>
        <div className = {styles.storeName}>{storeDetail[currentIndex].branch}</div>
        <img src={pinIcon.naverSearch} alt='naver' />
        <img 
            src={pinIcon.xButton}
            alt='x'
            onClick = {()=>setCurrentPin(null)}
        />
        <div style={{width: '90%', height:1, backgroundColor:"#E8E8E8"}}></div>
        <div className = {styles.storeName}>
            {storeDetail[currentIndex].roadAddress}
            {storeDetail[currentIndex].jibunAddress}
            {storeDetail[currentIndex].buildingName}
            {storeDetail[currentIndex].floor}
        </div>
        <div>
            <div>{storeDetail[currentIndex].storeTypeName}</div>
            <img src={pinIcon.prev} alt='이전' onClick={()=>currentIndex>0&&setCurrentIndex((prev)=>prev-1)}/>
            <img src={pinIcon.next} alt='다음' onClick={()=>currentIndex<storeDetail.length-1&&setCurrentIndex((prev)=>prev+1)} />
        </div>
    </>)
}
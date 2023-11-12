import React, { useEffect } from 'react'
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

    return (<>
        <div className={styles.headerContainer}>
            <div className={styles.header}>
                <div className={styles.storeName}>{storeDetail[currentIndex].name}</div>
                <div className={styles.storeBranch}>{storeDetail[currentIndex].branch}</div>
            </div>
            <div>
                {/* <img src={pinIcon.naverSearch} alt='naver' /> */}
                <img
                    className={styles.xButton}
                    src={pinIcon.xButton}
                    alt='x'
                    onClick={() => setCurrentPin(null)}
                />
            </div>
        </div>
        <div style={{ width: '70%', height: 1, backgroundColor: "#E8E8E8", marginLeft:20 }}></div>
        <div className={styles.address}>
            {storeDetail[currentIndex].roadAddress}&nbsp;
            {storeDetail[currentIndex].buildingName}&nbsp;
            {storeDetail[currentIndex].floor!== null&&`${storeDetail[currentIndex].floor}(층)`}
        </div>
        <div>
            <div className={styles.storeType}>{storeDetail[currentIndex].storeTypeName}</div>
            <div>
                {
                    currentIndex > 0 && <img className={styles.prev} src={pinIcon.prev} alt='이전' onClick={() => setCurrentIndex((prev) => prev - 1)} />
                }
                {
                    currentIndex < storeDetail.length - 1  &&  <img className={styles.next} src={pinIcon.next} alt='다음' onClick={() => setCurrentIndex((prev) => prev +1)} />
                }
            </div>
        </div>
    </>)}
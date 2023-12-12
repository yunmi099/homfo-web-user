import React from "react";
import styles from './styles.module.scss'
import { ResultDetail } from "../../store/type/homfoRecommend&request/interface";

const formatNumber = (value:number|null) => {
    if (value === null) return '정보 미제공';
    return `${Math.round(value)}`;
};
  
const formatArea = (value:number|null) => {
    if (value === null) return '정보 미제공';
    return `${value.toFixed(2)} (단위: m²)`;
};
  
const formatYear = (value:number|null) => {
    if (value === null) return '정보 미제공';
    return `${Math.floor(value)}년`;
};
  
const formatTime = (walk:number, bike:number, transport:number) => {
    if (walk === null || bike === null || transport === null) return '정보 미제공';
    return `🚶 ${Math.round(walk / 60)}분 🚲 ${Math.round(bike / 60)}분 🚌 ${Math.round(transport / 60)}분`;
};
  
export const AreaInfo = ({data}:{ data: ResultDetail['detail']|any })=>{
    const {
        avgMonthlyFee,
        avgMonthlyDeposit,
        avgJeonseDeposit,
        avgExclusiveArea,
        avgBuiltYear,
        avgWalkingSeconds,
        avgBikeSeconds,
        avgTransportSeconds,
      } = data;
    return( 
    <>
        {(avgMonthlyFee===null||avgMonthlyDeposit===null||avgJeonseDeposit===null)?
        <div className={styles.smallFont}>
            미제공인 경우 홈포자체 추천구역으로 지역공인중개사의 매물추천이 있던 구역입니다. <br/>
            구역분석이 진행되고 있는 구역으로 빠른시일내에 업데이트될 예정입니다.
        </div>:<div style={{marginBottom:30}}></div>}
        <div className={styles.info}>
            <span>평균 월세 및 보증금</span>
            <span>{formatNumber(avgMonthlyFee)}/{formatNumber(avgMonthlyDeposit)}{avgMonthlyFee&&avgMonthlyDeposit!==null&&`(단위: 만 원)`}</span>
        </div>
        <div className={styles.info}>
            <span>평균 전세</span>
            <span>{formatNumber(avgJeonseDeposit)}{avgJeonseDeposit!==null&&`(단위: 만 원)`}</span>
        </div>
        <div className={styles.info}>
            <span>평균 크기</span>
            <span>{formatArea(avgExclusiveArea)}</span>
        </div>
        <div className={styles.info}>
            <span>준공년도</span>
            <span>{formatYear(avgBuiltYear)}</span>
        </div>
        <div className={styles.info}>
            <span>평균 통학시간</span>
            <span>{formatTime(avgWalkingSeconds, avgBikeSeconds, avgTransportSeconds)}</span>
        </div>
    </>)
}


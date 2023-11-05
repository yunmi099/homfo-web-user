import React from 'react';
import { ResultDetail } from '../../../../store/type/homfoRecommend&request/interface';
import styles from './styles.module.scss';
import OneAreaMap from '../../../../components/map/OneAreaMap';

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

const HomfoResultCardSlider = ({ data, areaId }: { data: ResultDetail['detail'] | any, areaId: number }) => {
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
  return (
      <div className={styles.container}>
        <div className={styles.slickContainer}>
          <div className={styles.areaTitle}>{data.area.name === null ? '정보 미제공' : data.area.name}</div>
          <div className={styles.mapContainer}><OneAreaMap areaId={areaId}/></div>
          <div className={styles.infoContainer}>
            <h1>구역 기본정보</h1>
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
          </div>
        </div>
      </div>
  );
};

export default HomfoResultCardSlider;

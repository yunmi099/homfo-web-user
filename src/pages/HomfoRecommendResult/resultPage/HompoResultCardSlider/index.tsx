import React from 'react';
import { ResultDetail } from '../../../../store/type/homfoRecommend&request/interface';
import styles from './styles.module.scss';

const formatNumber = (value:number|null) => {
  if (value === null) return '정보 미제공';
  return `${Math.round(value)} (단위: 만 원)`;
};

const formatArea = (value:number|null) => {
  if (value === null) return '정보 미제공';
  return `${value.toFixed(2)} (단위: 20(m²))`;
};

const formatYear = (value:number|null) => {
  if (value === null) return '정보 미제공';
  return `${Math.floor(value)}년`;
};

const formatTime = (walk:number, bike:number, transport:number) => {
  if (walk === null || bike === null || transport === null) return '정보 미제공';
  return `🚶 ${Math.round(walk / 60)}분 🚲 ${Math.round(bike / 60)}분 🚌 ${Math.round(transport / 60)}분`;
};

const HompoResultCardSlider = ({ data }: { data: ResultDetail['detail'] | any }) => {
  const {
    name,
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
      <div>{name === null ? '정보 미제공' : name}</div>
      <div>지도자리</div>
      <h1>구역 기본정보</h1>
      <p>
        <span>평균 월세 및 보증금</span>
        <span>{formatNumber(avgMonthlyFee)}/{formatNumber(avgMonthlyDeposit)}</span>
      </p>
      <p>
        <span>평균 전세</span>
        <span>{formatNumber(avgJeonseDeposit)}</span>
      </p>
      <p>
        <span>평균 크기</span>
        <span>{formatArea(avgExclusiveArea)}</span>
      </p>
      <p>
        <span>준공년도</span>
        <span>{formatYear(avgBuiltYear)}</span>
      </p>
      <p>
        <span>평균 통학시간</span>
        <span>{formatTime(avgWalkingSeconds, avgBikeSeconds, avgTransportSeconds)}</span>
      </p>
    </div>
  );
};

export default HompoResultCardSlider;

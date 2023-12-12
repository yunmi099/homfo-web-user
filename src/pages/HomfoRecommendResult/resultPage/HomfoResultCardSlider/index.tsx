import React from 'react';
import { ResultDetail } from '../../../../store/type/homfoRecommend&request/interface';
import styles from './styles.module.scss';
import OneAreaMap from '../../../../components/map/OneAreaMap';
import { AreaInfo } from '../../../../components/areaInfo';

const HomfoResultCardSlider = ({ data, areaId }: { data: ResultDetail['detail'] |any, areaId: number }) => {
 
  return (
      <div className={styles.container}>
        <div className={styles.slickContainer}>
          <div className={styles.areaTitle}>{data.area.name === null ? '정보 미제공' : data.area.name}</div>
          <div className={styles.mapContainer}><OneAreaMap areaId={areaId}/></div>
          <div className={styles.infoContainer}>
            <div style={{fontSize: '1.3em', fontWeight:'700', margin:'15px 0 0px 0'}}>구역 기본정보</div>
            <AreaInfo data={data}/>
          </div>
        </div>
      </div>
  );
};

export default HomfoResultCardSlider;

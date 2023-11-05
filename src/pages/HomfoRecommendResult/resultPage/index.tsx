import React, { useEffect } from 'react'
import useHomfoSurveyStore from '../../../store/context/useHomfoSurveyStore';
import styles from './styles.module.scss'
import Slider from 'react-slick'
import HomfoResultCardSlider from './HomfoResultCardSlider'; 
import "./internal-modules-scss/slick-theme.scss";
import "./internal-modules-scss/slick.scss"
import { ResultDetail } from '../../../store/type/homfoRecommend&request/interface';
import ConfirmButton from '../../../components/button/ConfirmButton';
export default function HomfoResult() {  
  const settings = {
    centerMode: true,
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  const {resultDetail} = useHomfoSurveyStore();
  return (
    <>
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>당신에게 <span>어울리는 구역</span></h1>
          <h2 className={styles.subTitle}>나에게 어울리는 구역은 무엇일까?</h2>
        </div>
          <Slider {...settings}>
            {resultDetail!==null&&resultDetail.map((key: ResultDetail,index:number)=>
            <HomfoResultCardSlider key={index} data={key.detail} areaId={key.areaId}/>)}
          </Slider>
      </div>  
      <ConfirmButton title="다음" auth={true}/>  
    </>

  )
}

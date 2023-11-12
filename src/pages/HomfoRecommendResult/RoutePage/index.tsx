import React,{useEffect, useState} from 'react'
import styles from './styles.module.scss'
import homfoResultImage from '../../../assets/hippo/homfoResult.png'
import { useNavigate } from 'react-router-dom';
export default function HomfoResultRouting() {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
        <div className={styles.contents}>히포가 당신에게<br/>
          <span>어울리는 방을 추천</span>해도 될까요?</div>
          <img
            src={homfoResultImage}
            className={styles.image}
            alt=""
          />
          <button 
            className={styles.puppleButton}
            onClick={()=>navigate('/residence-area-map')}
            >
            단국대 구역 보러가기</button>
          <button
            className={styles.puppleButton}
            onClick={()=>navigate('/mypage/homfo-recommendedArea')}
          >
            다시 검사해보기</button>
          <button className={styles.greyButton}
           onClick={()=>navigate('/')}
          >
            홈화면으로 이동하기
          </button>
    </div>
  )
}
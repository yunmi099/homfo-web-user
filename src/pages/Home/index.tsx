import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import BottomTab from '../../components/layout/bottomtabs';
import SearchBar from './searchBar';
import * as homeIcon from '../../assets/icons/home/homeIcon';
import useFetchHompoInitialData from '../../hooks/useFetchInitialData';
import useHompoSurveyStore from '../../store/context/useHompoSurveyStore';
function Home() {
    const navigate = useNavigate();
    const {result} = useHompoSurveyStore();
    useFetchHompoInitialData();
    return(
    <div className={styles.container}>
     <div className={styles.topContainer}>
        <div className={styles.message}>
            <div style={{  marginTop:"13vh"}}>
            🏠<span className={styles.customTitle}>홈포로 </span>
                <span>간편하게</span>
            </div>
            <div >자취방 찾자</div>
        </div>
        <div className={styles.areaBox}>
            <img src={homeIcon.areaLinker}/>
            <div>홈포가 추천하는 구역</div>
        </div>
     </div>
     <div className={styles.bottomContainer}>
        <div className={styles.news}></div>
        <div className={styles.newsTitle}></div>
        <div className={styles.locationContainer}>
            <div className={styles.locationBox} >
                <img src={homeIcon.dictionary} height="33px"  style={{marginBottom:5}}/>
                <div className={styles.locationFont} onClick={()=>navigate('/real-estate-knowledge')}>부동산 상식</div>
            </div>
            <div className={styles.locationBox}>
                <img src={homeIcon.paperplane} width="37px"  style={{marginBottom:5}}/>
                <div className={styles.locationFont} onClick={()=>{result===null?alert("홈포 추천 구역을 먼저 검사해보세요!"):navigate('/request')}}>요청하기</div>
            </div>
            <div className={styles.locationBox}>
                <img width="52px" src={homeIcon.areaLinker2} style={{marginBottom:5}}/>
                <div className={styles.locationFont}>자취구역보기</div>
            </div>
        </div>
     </div> 
     <BottomTab/>
    </div>);
}


export default Home;

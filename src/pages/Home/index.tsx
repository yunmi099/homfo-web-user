import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import BottomTab from '../../components/layout/bottomtabs';
import SearchBar from './searchBar';
import * as homeIcon from '../../assets/icons/home/homeIcon';
import { useUserStore } from '../../store/context/useUserStore';

function Home() {
    const navigate = useNavigate();
    const { fetch } = useUserStore();
  
    useEffect(()=>{fetch(2)},[])
    
    return(
    <div className={styles.container}>
     <div className={styles.topContainer}>
        <div className={styles.mypageLinker} onClick={()=>navigate('/mypage')}>
        </div>
        <SearchBar/>
        <div className={styles.message}>
            <div >
            🏠<span className={styles.customTitle}>홈포로 </span>
                <span>간편하게</span>
            </div>
            <div >자취방 찾자</div>
        </div>
        <div className={styles.areaBox}>
            <img src={homeIcon.areaLinker}/>
            <div>자취구역 보기</div>
        </div>
     </div>
     <div className={styles.bottomContainer}>
        <div className={styles.news}></div>
        <div className={styles.newsTitle}></div>
        <div>대자보</div>
        {/* <div className={styles.locationContainer}>
            <div>
                <img src="assets/icons/home/areaLinker2.png"/>
                <div>자취구역보기</div>
            </div>
            <div>
                <img src="assets/icons/home/paperPlane.png"/>
                <div>요청하기</div>
            </div>
            <div>
                <img src="assets/icons/home/dictionary.png"/>
                <div>부동산 상식</div>
            </div>
        </div> */}
     </div> 
     <BottomTab/>
    </div>);
}


export default Home;

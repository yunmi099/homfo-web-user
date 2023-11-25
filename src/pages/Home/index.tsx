import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import BottomTab from '../../components/layout/bottomtabs';
import * as homeIcon from '../../assets/icons/home/homeIcon';
import useHomfoSurveyStore from '../../store/context/useHomfoSurveyStore';
import noticeIcon from '../../assets/icons/home/notice_icon.svg';
import Banner from '../../components/organisms/Home/Banner';
import useUserStore from '../../store/context/useUserStore';
import { userInfo } from 'os';
import { Result } from '../../store/type/homfoRecommend&request/interface';
import { getAreaDetailResult, getHomfoArea } from '../../services/homfoArea/api';

function Home() {
    const navigate = useNavigate();
    const { result } = useHomfoSurveyStore();
    const { userInfo, setUserInfo } = useUserStore();
    const { setResult, setResultDetail} = useHomfoSurveyStore();
    const handleUserInfo = (e: any)=>{
        let data = JSON.parse(e.data);
        setUserInfo(e.data)
        localStorage.setItem("token", data.token);
    }
    useEffect(()=>{
        window.ReactNativeWebView.postMessage("onLoad");
        window.addEventListener('message',(e) => handleUserInfo(e))
        document.addEventListener('message',(e:any) => setUserInfo(e.data));

    },[window.ReactNativeWebView])
    useEffect(()=>{
        if(typeof userInfo === 'string'){
            setUserInfo(JSON.parse(userInfo))
            const fetchHomfoRecommendData = async () => {
                try {
                  const homfoInfo:Result[]= await getHomfoArea(JSON.parse(userInfo).userI);
                  if (homfoInfo.length !== 0){
                    setResult(homfoInfo);
                    const resultArray = await Promise.all(
                        homfoInfo.map(async (item:Result) => {
                          const areaId = item.area.areaId;
                          const detail = await getAreaDetailResult(areaId);
                          return {
                            areaId,
                            detail,
                          };
                        })
                      );
                    setResultDetail(resultArray);
                  }
                } catch (e) {
                  console.log(e);
                }
              };
            fetchHomfoRecommendData(); 
        }
    },[userInfo])
    return (
        <div className={styles.container}>
            <div className={styles.topContainer}>
                <div className={styles.message}>
                    <div style={{ marginTop: '8vh' }}>
                        🏠<span className={styles.customTitle}>홈포로 </span>
                        <span>간편하게</span>
                    </div>
                    <div>자취방 찾자</div>
                </div>
                <div className={styles.areaBox}>
                    <img src={homeIcon.areaLinker} />
                    <div
                        onClick={() =>
                            navigate(
                                result === null
                                    ? '/mypage/homfo-recommendedArea'
                                    : '/mypage/homfo-recommended-result'
                            )
                        }
                    >
                        홈포가 추천하는 구역
                    </div>
                </div>
            </div>
            <div className={styles.bottomContainer}>
                <div className={styles.news} onClick={() => navigate('/notice')}>
                    <div className={styles.left}>
                        <div className={styles.title}>Notice</div>
                        <div className={styles.content}>최신 공지사항</div>
                    </div>
                    <div className={styles.right}>
                        <img src={noticeIcon} alt="" />
                    </div>
                </div>
                <Banner />
                <div className={styles.locationContainer}>
                    <div
                        className={styles.locationBox}
                        onClick={() => navigate('/real-estate-knowledge')}
                    >
                        <img src={homeIcon.dictionary} height="33px" style={{ marginBottom: 5 }} />
                        <div className={styles.locationFont}>부동산 상식</div>
                    </div>
                    <div
                        className={styles.locationBox}
                        onClick={() => {
                            result === null
                                ? alert('홈포 추천 구역을 먼저 검사해보세요!')
                                : navigate('/request');
                        }}
                    >
                        {/* alert => 모달로 대체될 예정  */}
                        <img src={homeIcon.paperplane} width="37px" style={{ marginBottom: 5 }} />
                        <div className={styles.locationFont}>요청하기</div>
                    </div>
                    <div
                        className={styles.locationBox}
                        onClick={() => navigate('/residence-area-map')}
                    >
                        <img width="52px" src={homeIcon.areaLinker2} style={{ marginBottom: 5 }} />
                        <div className={styles.locationFont}>자취구역보기</div>
                    </div>
                </div>
            </div>
            <BottomTab />
        </div>
    );
}

export default Home;

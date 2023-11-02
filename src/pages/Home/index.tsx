import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import BottomTab from '../../components/layout/bottomtabs';
import * as homeIcon from '../../assets/icons/home/homeIcon';
import useFetchHomfoInitialData from '../../hooks/useFetchInitialData';
import useHomfoSurveyStore from '../../store/context/useHomfoSurveyStore';
import noticeIcon from '../../assets/icons/home/notice_icon.svg';

function Home() {
    const navigate = useNavigate();
    const { result } = useHomfoSurveyStore();
    useFetchHomfoInitialData(); // 홈포 추천 결과 및 유저 정보를 불러오는 부분

    return (
        <div className={styles.container}>
            <div className={styles.topContainer}>
                <div className={styles.message}>
                    <div style={{ marginTop: '13vh' }}>
                        🏠<span className={styles.customTitle}>홈포로 </span>
                        <span>간편하게</span>
                    </div>
                    <div>자취방 찾자</div>
                </div>
                <div className={styles.areaBox}>
                    <img src={homeIcon.areaLinker} />
                    <div>홈포가 추천하는 구역</div>
                </div>
            </div>
            <div className={styles.bottomContainer}>
                <div className={styles.news} onClick={() => navigate('/notice')}>
                    <div className={styles.left}>
                        <div className={styles.title}>Notice</div>
                        <div className={styles.content}>최신 공지사항</div>
                    </div>
                    <div className={styles.right}>
                        <img src={noticeIcon} />
                    </div>
                </div>
                <div className={styles.newsTitle}></div>
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

import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import BottomTab from '../../components/layout/bottomtabs';
import * as homeIcon from '../../assets/icons/home/homeIcon';
import useFetchHomfoInitialData from '../../hooks/useFetchInitialData';
import useHomfoSurveyStore from '../../store/context/useHomfoSurveyStore';
import useUserStore from '../../store/context/useUserStore';
import noticeIcon from '../../assets/icons/home/notice_icon.png';

function Home() {
    const navigate = useNavigate();
    const { fetch } = useUserStore();

    useEffect(() => {
        fetch(2);
    }, [fetch]);
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
                <div className={styles.news}>
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
                    <div className={styles.locationBox} onClick={() => navigate('/request')}>
                        <img src={homeIcon.paperplane} width="37px" style={{ marginBottom: 5 }} />
                        <div className={styles.locationFont}>요청하기</div>
                    </div>
                    <div className={styles.locationBox}>
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

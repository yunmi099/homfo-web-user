import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import Header from '../../../components/layout/header';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../../store/context/useUserStore';
import BottomTab from '../../../components/layout/bottomtabs';
import useHomfoSurveyStore from '../../../store/context/useHomfoSurveyStore';
import profileImage from '../../../assets/hippo/profileImage.png'
import arrow from '../../../assets/icons/bottomtab/mypage/arrow.png'
function Mypage() {
    const navigate = useNavigate();
    const { userInfo } = useUserStore((state) => state);
    const { result } = useHomfoSurveyStore();
    return (
        <div className={styles.container}>
            <Header title="마이페이지" back={false} />
            <img src={profileImage} className={styles.profileImg}/>
            <div className={styles.mention}>
                <span>{userInfo.nickName}</span>님의 슬기로운
            </div>
            <div className={styles.welcome}>자취 생활을 늘 응원합니다!</div>
            <div className={styles.menuBox}>
                <div
                    className={styles.purpleRouting}
                    onClick={() =>
                        navigate(
                            result === null
                                ? '/mypage/homfo-recommendedArea'
                                : '/mypage/homfo-recommended-result'
                        )
                    }
                >
                    홈포 추천 구역
                </div>
                <div 
                    className={styles.purpleRouting}
                    onClick={() => navigate('/mypage/personalinfo')}
                >
                    개인정보 및 수정
                </div>
                <div
                    className={styles.purpleRouting}
                    onClick={() => navigate('/mypage/accountinfo')}
                >
                    계정정보 및 수정
                </div>
                <div 
                    className={styles.purpleRouting}
                    onClick={() => navigate('/mypage/bookmarks')}
                >
                    즐겨찾기
                </div>
                <div 
                    className={styles.purpleRouting}
                    onClick={() => navigate('/request-box')}
                >
                    요청서 확인
                </div>
                <div 
                    className={styles.routing}
                    onClick={() => navigate('/mypage/setting')}
                >
                    앱 설정
                    <img
                        alt=""
                        className={styles.arrow}
                        src={arrow}
                    />
                </div>
                <div 
                    className={styles.routing}
                    onClick={() => navigate('/inquiry')}
                >
                    문의하기
                    <img
                        alt=""
                        className={styles.arrow}
                        src={arrow}
                    />
                </div>
                <div 
                    className={styles.routing}
                    onClick={() => navigate('/faq')}
                >
                    FAQ
                    <img
                        alt=""
                        className={styles.arrow}
                        src={arrow}
                    />
                </div>
            </div>
            <BottomTab />
        </div>
    );
}

export default Mypage;

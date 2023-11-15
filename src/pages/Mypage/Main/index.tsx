import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import Header from '../../../components/layout/header';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../../store/context/useUserStore';
import BottomTab from '../../../components/layout/bottomtabs';
import useHomfoSurveyStore from '../../../store/context/useHomfoSurveyStore';

function Mypage() {
    const navigate = useNavigate();
    const { userInfo } = useUserStore((state) => state);
    const { result } = useHomfoSurveyStore();
    return (
        <div className={styles.container}>
            <Header title="마이페이지" back={false} />
            <div className={styles.profileImg}></div>
            <div>
                <span>{userInfo.nickName}</span>님의 슬기로운
            </div>
            <div>자취 생활을 늘 응원합니다!</div>
            <div className={styles.menuBox}>
                <div
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
                <div onClick={() => navigate('/mypage/personalinfo')}>개인정보 및 수정</div>
                <div onClick={() => navigate('/mypage/accountinfo')}>계정정보 및 수정</div>
                <div onClick={() => navigate('/mypage/bookmarks')}>즐겨찾기</div>
                <div onClick={() => navigate('/request-box')}>요청서 확인</div>
                <div onClick={() => navigate('/mypage/setting')}>앱 설정</div>
                <div onClick={() => navigate('/inquiry')}>문의하기</div>
                <div onClick={() => navigate('/faq')}>FAQ</div>
            </div>
            <BottomTab />
        </div>
    );
}

export default Mypage;

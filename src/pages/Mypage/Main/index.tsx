import React, { useState } from 'react';
import styles from './styles.module.scss';
import Header from '../../../components/layout/header';
import { useNavigate } from 'react-router-dom';
function Mypage() {
    const navigate = useNavigate();
    return(
    <div className={styles.container}>
        <Header title="마이페이지"/>      
        <div className={styles.profileImg}></div>
        <div><span>김소희</span>님의 슬기로운</div>
        <div>자취 생활을 늘 응원합니다!</div>
        <div className={styles.menuBox}>
            <div onClick={()=>navigate('/')}>홈포 추천 구역</div>
            <div onClick={()=>navigate('/mypage/personalinfo')}>개인정보</div>
            <div onClick={()=>navigate('/')}>즐겨찾기</div>
            <div onClick={()=>navigate('/')}>요청서 확인</div>
            <div onClick={()=>navigate('/mypage/setting')}>앱 설정</div>
            <div onClick={()=>navigate('/inquiry')}>문의하기</div>
            <div onClick={()=>navigate('/faq')}>FAQ</div>
        </div>
    </div>);
}


export default Mypage;

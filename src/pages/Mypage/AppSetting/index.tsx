import React, { useState } from 'react';
import styles from './styles.module.scss';
import Header from '../../../components/layout/header';
  
function AppSetting() {
    return(
    <div className={styles.container}>
        <Header title="설정"/>  
        <div>
            <div>알림</div>    
            <div>앱 알림 설정</div>  
        </div>
        <div>
            <div>정보</div>    
            <div>앱 버전</div>       
            <div>약관 및 정책</div>  
        </div>
        <div>
            <div>계정</div>    
            <div>로그아웃</div>  
            <div>탈퇴하기</div>  
        </div>
    </div>);
}


export default AppSetting;
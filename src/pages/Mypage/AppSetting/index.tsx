import React, { useState } from 'react';
import styles from './styles.module.scss';
import Header from '../../../components/layout/header';
import { fetchFromApi } from '../../../utils/axios';
import { useNavigate } from 'react-router-dom';
function AppSetting() {
    const navigate = useNavigate();
    const handleWithdrawal= async (userId: number)=>{
        let id = 4;
            try {
               if (window.confirm('회원을 탈퇴 하시겠습니까?')) {
               const res = await fetchFromApi('PATCH',`/users/${id}/withdrawal`);
               console.log(res.data);
               alert("회원이 탈퇴되었습니다.");
               navigate('/')
               
               }
              } catch (e:any) {
                console.log(e);
            }
        }
    return(
    <div className={styles.container}>
        <Header title="설정" color={"white"}/>  
        <div style={{height:"20%"}} className={styles.block}>
            <div className={styles.title}>알림</div>    
            <div className={styles.content}>앱 알림 설정</div>  
        </div>
        <div style={{height:"23.64%"}} className={styles.block}>
            <div className={styles.title}>정보</div>    
            <div className={styles.content}>앱 버전</div>       
            <div className={styles.content}>약관 및 정책</div>  
        </div>
        <div style={{height:"44%"}} className={styles.block}>
            <div className={styles.title}>계정</div>    
            <div className={styles.content}>로그아웃</div>  
            <div className={styles.content} onClick={()=>{
                handleWithdrawal(2) }}>탈퇴하기</div>  
        </div>
    </div>);
}


export default AppSetting;
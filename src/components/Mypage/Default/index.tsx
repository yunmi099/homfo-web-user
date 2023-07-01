import React, { useState,SetStateAction, Dispatch } from 'react';
import styles from './styles.module.scss';

function Default({setTitle}: Dispatch<SetStateAction<string>>) {

  return (
    <>
      <div className={styles.profileImg}></div>
      <div onClick={()=>setTitle("홈포 추천 구역")}>홈포 추천 구역</div>
      <div onClick={()=>setTitle("개인정보")}>개인정보</div>
      <div onClick={()=>setTitle("즐겨찾기")}>즐겨찾기</div>
      <div onClick={()=>setTitle("요청서 확인")}>요청서 확인</div>
      <div onClick={()=>setTitle("앱 설정")}>앱 설정</div>
      <div onClick={()=>setTitle("문의하기")}>문의하기</div>
      <div onClick={()=>setTitle("FAQ")}>FAQ</div>
    </>
  );
}

export default Default;

import React,{useEffect, useState} from "react";
import styles from './styles.module.scss';
import Header from "../../components/layout/header";

function RequestDocument(){
    
    return(
    <div className={styles.container}>
        <Header title="요청서함"/>
        <div >단국대 구역</div>
        <div>
            <a href="tel://010-5135-8136">전화하기</a>    
            <a href="sms://010-5135-8136">문자하기</a>  
        </div>
        <div>방 사진</div>
        <div>옵션</div>
        <div>기타 전달사항</div>
        <div>위치</div>
        <div>도로명 주소</div>
        <div>
            <iframe
                src="https://search.naver.com/search.naver?query=%EC%95%84%EC%A3%BC%EB%8C%80"
                style={{ width: '300px', height: '400px', zIndex: 100 }}
                title="네이버 검색"
            ></iframe>
        </div>
    </div>);
    
}
export default RequestDocument;
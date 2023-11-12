import React,{useEffect, useState} from "react";
import styles from './styles.module.scss';
import Header from "../../components/layout/header";
import { useLocation } from "react-router-dom";
import { getOfferDocument } from "../../services/requestBox/api";
import * as offerIcon from '../../assets/icons/offer/offerImage';
import { OfferDocument } from "../../store/type/offerDocument/interface";
function RequestDocument(){
    const location = useLocation()
    const requestId = location.state;
    const [data, setData] = useState<OfferDocument|null>(null);
    useEffect(()=>{
        getOfferDocument(Number(requestId), setData)
    },[])
    return(
    <div className={styles.container}>
        <Header title="요청서함"/>
        <div className={styles.university}>단국대학교</div>
        {/* <div className={styles.title}>{}</div> */}
        <div>
            이미지, 중개사 이름
        </div>
        <div className={styles.horizontalLine}></div>
        <div className={styles.box}>
            <div className={styles.phone}>
                <img 
                    src={offerIcon.call}
                    width='15rem'
                    height='15rem'
                    alt="전화"
                />
                <a className={styles.atag} href="tel://010-5135-8136">전화하기</a>   
            </div> 
            <div className={styles.verticalLine}></div>
            <div className={styles.phone}>
                <img 
                    src={offerIcon.message}
                    width='17rem'
                    height='15rem'
                    alt="문자"
                />
                <a className={styles.atag} href="sms://010-5135-8136">문자하기</a>  
            </div>
        </div>
        <div className={styles.horizontalLine}></div>
        <div>
            <div className={styles.title}>방 사진</div>
            
        </div>
        <div className={styles.horizontalLine}></div>
        <div className={styles.title}>기본정보</div>
        <div className={styles.squareBox}>

        </div>
        <div>
            <div className={styles.title}>옵션</div>
            <div className={styles.title}>기타 전달사항</div>
            <div className={styles.title}>위치</div> 

            <div className={styles.squareBox}>
            
            </div>

            <div className={styles.title}>도로명 주소</div>
        </div>
    </div>);
    
}
export default RequestDocument;
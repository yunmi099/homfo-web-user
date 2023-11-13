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
        <div className={styles.offerContainer}>
            <div className={styles.university}>단국대학교</div>
            {/* <div className={styles.title}>{}</div> */}
            <div className={styles.offerName}>
                {data?.name}
            </div>
            <div className={styles.agencyInfo}>
                <div>
                    {data?.realtor.agencyThumbnailDto.name}
                </div>
                <div>
                    {data?.realtor.agencyThumbnailDto.type}&nbsp;{data?.agencyItem.agency.chairmanName}
                </div>
                <div>
                    {data?.agencyItem.agency.lotAddress}
                </div>
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
                    <a className={styles.atag} href={`tel://${data?.agencyItem.agency.phoneNumber}`}>전화하기</a> 
                    {/* <a className={styles.atag} href="tel://010-5135-8136">전화하기</a>    */}
                </div> 
                <div className={styles.verticalLine}></div>
                <div className={styles.phone}>
                    <img 
                        src={offerIcon.message}
                        width='17rem'
                        height='15rem'
                        alt="문자"
                    />
                    <a className={styles.atag} href={`sms://${data?.agencyItem.agency.phoneNumber}`}>문자하기</a>  
                </div>
            </div>
            <div className={styles.horizontalLine}></div>
            <div>
                <div className={styles.title}>방 사진</div>
                <img
                    src={data?.agencyItem.item.images.data[0].url}
                    alt={data?.agencyItem.item.images.data[0].attachment}
                    className={styles.image}
                />
                
            </div>
            <div className={styles.horizontalLine}></div>
            <div className={styles.title}>기본정보</div>
            <div className={styles.itemInfo}>
            <div style={{fontSize:'1.1em', marginTop: 5}}>{data?.agencyItem.item.name}</div>
                <div>매물 유형  {data?.agencyItem.itemType}</div>
            </div>
            <div className={styles.squareBox}>
                <div  className={styles.agencyInfo}>
                    <div>
                        
                    </div>
                </div>
            </div>
            <div>
                <div className={styles.title}>옵션</div>
                <div className={styles.title}>기타 전달사항</div>
                <div className={styles.title}>위치</div> 

                <div className={styles.squareBox}>
                
                </div>

                <div className={styles.title}>도로명 주소</div>
            </div>

        </div>
    </div>);
    
}
export default RequestDocument;
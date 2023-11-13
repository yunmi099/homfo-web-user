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
    const [isCopied, setIsCopied] = useState(false);
    const [data, setData] = useState<OfferDocument|null>(null);
    useEffect(()=>{
        getOfferDocument(Number(requestId), setData)
    },[])
    const handleCopyClick = (textToCopy:string) => {
        // 텍스트를 클립보드에 복사하는 로직
        navigator.clipboard.writeText(textToCopy)
          .then(() => {
            alert("주소가 복사되었습니다")
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 1500); // 1.5초 후에 메시지를 숨깁니다.
          })
          .catch((err) => {
            console.error('클립보드 복사 실패:', err);
          });
      };
    
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
                    {data?.realtor.position !== null && `직책 : ${data?.realtor.position}`}
                </div>
                <div>
                    {data?.realtor.agencyThumbnailDto.type}&nbsp;{data?.agencyItem.agency.chairmanName}
                </div>
                <div>
                    {data?.agencyItem.agency.lotAddress}
                </div>
                <button onClick={()=>{
                    if (data!==null){
                        handleCopyClick(data.agencyItem.agency.lotAddress)
                    }
                }}>클립보드</button>
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
            <div className={styles.squareBox}>
                <div  className={styles.agencyInfo}>
                    <div style={{fontSize:'1.15em', marginTop: 5,color:"black"}}>{data?.agencyItem.item.name}</div>
                    <div>방 개수 : {data?.agencyItem.item.roomNumber}</div>
                    <div>전용 면적: {data?.agencyItem.item.exclusiveArea}</div>
                    <div>공급 면적: {data?.agencyItem.item.supplyArea}</div>
                    <div>매물 유형 : {data?.agencyItem.itemType}</div>
                    <div>계약 형태 : {data?.agencyItem.contractTypes.data}</div>
                    <div>월세 보증금: {data?.agencyItem.monthlyDeposit}</div>
                    <div>월세: {data?.agencyItem.monthlyFee}</div>
                    <div>전세 보증금: {data?.agencyItem.jeonseDeposit}</div>
                    <div>관리비: {data?.agencyItem.maintenanceCost}</div>
                    <div>대출유무/유형 : Y/{data?.agencyItem.loanType}</div>
                    <div>입주시기 : {data?.agencyItem.moveInPeriod}</div>
                </div>
                </div>
            <div>
                <div className={styles.title}>옵션</div>

                <div style={{width: '100vw', height: '10vh', marginTop: 20}}>
                    {
                        data?.agencyItem.itemOptions.data.map((item)=>{
                            return(<div className={styles.university}>{item.name}</div>)
                        })
                    }
                </div>

                <div className={styles.title}>기타 전달사항</div>
                <div className={styles.squareBox}>
                    <div  className={styles.agencyInfo}>
                        {data?.agencyItem.note}
                    </div>
                </div>

                <div className={styles.title}>도로명 주소</div>
                <div style={{width: '100vw', height: '10vh', marginTop: 20, marginLeft:'5%'}}>
                    <div  className={styles.adress}>
                        {data?.agencyItem.item.roadAddress} &nbsp;
                        {data?.agencyItem.item.floor}(층)
                    </div>
                    <button
                    onClick={()=>{
                        if (data!==null){
                            handleCopyClick(`${data?.agencyItem.item.roadAddress} &nbsp;${data?.agencyItem.item.floor}(층)`)
                    }}}
                    >클립보드</button>
                </div>
            </div>

        </div>
    </div>);
    
}
export default RequestDocument;
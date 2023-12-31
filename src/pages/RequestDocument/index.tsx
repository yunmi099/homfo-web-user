import React,{useEffect, useState} from "react";
import styles from './styles.module.scss';
import Header from "../../components/layout/header";
import { useLocation } from "react-router-dom";
import { getOfferDocument } from "../../services/requestBox/api";
import * as offerIcon from '../../assets/icons/offer/offerImage';
import { OfferDocument } from "../../store/type/offerDocument/interface";

enum ContractForm {
    monthlyDeposit = "월세",
    jeonseDeposit = "전세"
}

const PhoneCallBox = ({data}: {data: OfferDocument}) => {
    let phoneNumber: string|null;
    if (data?.realtor.phoneNumber!==null){
        phoneNumber = data?.realtor.phoneNumber;
    } else {
        if (data.agencyItem.agency.officePhoneNumber !== null){
            phoneNumber = data.agencyItem.agency.officePhoneNumber
        } else {
            phoneNumber = null;
        }
    }
    const handleCopyClick = (textToCopy:any) => {
        // 텍스트를 클립보드에 복사하는 로직
        navigator.clipboard.writeText(textToCopy)
          .then(() => {
            alert("전화번호가 복사되었습니다.(일주일 내로 기능이 업데이트 될 예정입니다)")
          })
          .catch((err) => {
            console.error('클립보드 복사 실패:', err);
          });
      };
    return(
        phoneNumber!==null ? 
            <div className={styles.box}>
            <div className={styles.phone}
                onClick={()=>{
                    handleCopyClick(phoneNumber)
                }}
            >
                <img 
                    src={offerIcon.call}
                    width='15rem'
                    height='15rem'
                    alt="전화"
                />
                {/* <a className={styles.atag} href={`tel://${phoneNumber}`}>전화하기</a>  */}
                <span className={styles.atag}>전화하기</span>
            </div> 
            <div className={styles.verticalLine}></div>
            <div 
                className={styles.phone}
                onClick={()=>{
                    handleCopyClick(phoneNumber)
                }}
            >
                <img 
                    src={offerIcon.message}
                    width='17rem'
                    height='15rem'
                    alt="문자"
                />
                <span className={styles.atag}>문자하기</span>
                {/* <a className={styles.atag} href={`sms://${phoneNumber}`}>문자하기</a>   */}
            </div>
        </div> : null
        )
}
function RequestDocument(){
    const location = useLocation()
    const offerId = location.state;
    const [isCopied, setIsCopied] = useState(false);
    const [data, setData] = useState<OfferDocument|null>(null);
    const [imageIndex, setImageIndex] = useState<number>(0);
    useEffect(()=>{
        getOfferDocument(offerId, setData)
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
        <Header title=""/>
        <div className={styles.offerContainer}>
            <div className={styles.offerName}>
                {data?.name}
            </div>
            <div className={styles.title}>
                {data?.realtor.agencyThumbnailDto.name}
            </div>
            <div className={styles.addressContainer}>
                <span>
                {data?.agencyItem.agency.lotAddress}
                </span>
                <div
                    className={styles.clipBoard} 
                    onClick={()=>{
                        if (data!==null){
                            handleCopyClick(data.agencyItem.agency.lotAddress)
                        }
                    }}>
                        <img 
                            src={offerIcon.clipBoard}
                            alt="클립보드"
                            width="13px"
                        />
                </div>
            </div>
            <div className={styles.horizontalLine}></div>
            {data!==null&&<PhoneCallBox data={data}/>}
            <div className={styles.horizontalLine}></div>
            <div className={styles.imageContainer}>
                <img
                    src={offerIcon.leftArrow}
                    alt={"<"}
                    onClick={()=>{
                        if (imageIndex>0){
                            setImageIndex((prev)=>prev-1)
                        }
                    }
                    }
                />
                <img
                    src={data?.agencyItem.item.images.data[imageIndex].url}
                    alt={data?.agencyItem.item.images.data[imageIndex].attachment}
                    className={styles.image}
                />
                <img
                    src={offerIcon.rightArrow}
                    alt={">"}
                    onClick={()=>{
                        if (data!==null && imageIndex < data.agencyItem.item.images.length -1){
                            setImageIndex((prev)=>prev+1)
                        }
                    }
                    }
                />
            </div>
            <div className={styles.imageInfo}>
                {imageIndex+1}/{data?.agencyItem.item.images.length}
            </div>
            <div className={styles.addressContainer}>
                    <span>
                        {data?.agencyItem.item.lotAddress}
                        {data?.agencyItem.item.floor}(층)
                    </span>   
                    <div
                        className={styles.clipBoard} 
                        onClick={()=>{
                             if (data!==null){
                                handleCopyClick(`${data?.agencyItem.item.lotAddress}`)
                            }
                        }}>
                        <img 
                            src={offerIcon.clipBoard}
                            alt="클립보드"
                            width="13px"
                        />
                    </div>
            </div>
            <div className={styles.addressContainer}>
                    <span>
                        {data?.agencyItem.item.roadAddress}
                        {data?.agencyItem.item.floor}(층)
                    </span> 
                    <div
                        className={styles.clipBoard} 
                        onClick={()=>{
                             if (data!==null){
                                handleCopyClick(`${data?.agencyItem.item.roadAddress} ${data?.agencyItem.item.floor}(층)`)
                            }
                        }}>
                        <img 
                            src={offerIcon.clipBoard}
                            alt="클립보드"
                            width="13px"
                        />
                    </div>
            </div>

            <div className={styles.title}>
                {data?.agencyItem.contractTypes.data[0]}&nbsp;
            {
               data?.agencyItem.contractTypes.data[0] === ContractForm.monthlyDeposit ? 
                <span>{data?.agencyItem.monthlyFee}/{data?.agencyItem.monthlyDeposit} (만원)</span>
                :<span>{data?.agencyItem.jeonseDeposit} (만원)</span>
            }
            </div>
            <div className={styles.addressContainer}>
                관리비 {data?.agencyItem.maintenanceCost} 만원
            </div>

            <div className={styles.horizontalLine}></div>

            <div  className={styles.agencyInfo}>
                <div className={styles.entityContainer}>                  
                    <img 
                        src={offerIcon.square}
                        width='17rem'
                        height='17rem'
                        alt=""
                    />
                    전용 {data?.agencyItem.item.exclusiveArea}m2
                </div>
                <div className={styles.entityContainer}>
                    <img 
                        src={offerIcon.square2}
                        width='17rem'
                        height='17rem'
                        alt=""
                    />
                    {data?.agencyItem.itemType}
                </div>
                <div className={styles.entityContainer}>
                    <img 
                        src={offerIcon.square3}
                        width='17rem'
                        height='17rem'
                        alt=""
                    />
                    {data?.agencyItem.item.floor}(층)
                </div>
                <div className={styles.entityContainer}>
                    <img 
                        src={offerIcon.calendar}
                        width='17rem'
                        height='17rem'
                        alt=""
                    />
                    입주 가능 시기 {data?.agencyItem.moveInPeriod}
                </div>
                <div className={styles.entityContainer}>
                    <img 
                        src={offerIcon.option}
                        width='17rem'
                        height='17rem'
                        alt=""
                    />                    
                    {
                        data?.agencyItem.itemOptions.data.map((item, index, arr)=>{
                            return(<span>{item.name}{index !== arr.length - 1 && ', '}</span>)
                        })
                    }
                </div>
            </div>
        <div className={styles.horizontalLine}></div>
        
        <div className={styles.title}>관리비: {data?.agencyItem.maintenanceCost} 만원</div>
        <div className={styles.addressContainer}>포함: {data?.agencyItem.includeMaintenance}</div>
        <div className={styles.addressContainer}>별도: {data?.agencyItem.excludeMaintenance}</div>

        <div className={styles.horizontalLine}></div>

            <div>
                <div className={styles.title}>기타 전달사항</div>
                <div className={styles.squareBox}>
                    <div  className={styles.addressContainer}>
                        {data?.note}
                    </div>
                </div>
            </div>

        </div>
    </div>);
    
}
export default RequestDocument;
import React, { useEffect, useState } from 'react'
import Header from '../../components/layout/header';
import styles from './styles.module.scss'
import ConfirmButton from '../../components/button/ConfirmButton';
import { useLocation } from 'react-router-dom';
import { getRequestDocumentDetail } from '../../services/requestBox/api';
import ModifyElement from './ModifyElement';
import useRequestStore from '../../store/context/useRequestStore';
import { ExtendedRequestData } from '../../store/type/requestBox/interface';

const LIST_ARRAY = ["1. 구역위치", "2. 매물 유형","3. 희망 거주 기간","4. 계약 형태","5. 금액대", "6. 대출 유무", "7. 대출 유형", "8. 예상 입주 시기", "9. 옵션", "10. 추가 요청사항"]
function ModifyRequest() {
  const location = useLocation();
  const requestId = location.state;
  const [data, setData] = useState<ExtendedRequestData>({
    "areaId":0,
    "realEstateType": [],
    "contractType": [],
    "residencePeriod": [],
    "loanAvailability":[],
    "loanType":[],
    "moveInPeriod": [],
    "roomOption": [],
    "otherRoomOption": "",
    "additionalRequests":"",
  });
  const [filterValue,setFilterValue] = useState<{[key:string]:number[]}>({});
  useEffect(()=>{
    getRequestDocumentDetail(requestId,setData);

  },[])
  return (
    <>
    <div className={styles.container}>
        <Header title="요청서함" color="white"/>
        <div  className={styles.elementContainer}>
        {
            LIST_ARRAY.map((key, index)=>{
                return(<ModifyElement 
                          title={key} 
                          key={index} 
                          index={index}
                          data={data}
                          setData={setData}
                          setFilterValue={setFilterValue}/>
                );
            })
        }
        </div>
    </div>       
    <ConfirmButton title="수정하기" auth={true}/>
    </>
  )
}
export default ModifyRequest;
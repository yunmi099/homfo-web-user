import React, { useEffect, useState } from 'react'
import Header from '../../components/layout/header';
import styles from './styles.module.scss'
import ConfirmButton from '../../components/button/ConfirmButton';
import { useLocation } from 'react-router-dom';
import { getRequestDocumentDetail, modifyRequestDocument } from '../../services/requestBox/api';
import ModifyElement from './ModifyElement';
import { ExtendedRequestData } from '../../store/type/requestBox/interface';
import { requestQuestionList } from '../Request/RequestQuestionList';

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
    getRequestDocumentDetail(requestId,setData,setFilterValue);
  },[])
  useEffect(()=>{
   setFilterValue({});
   data.contractType[0]?.map((item:any)=>{
    setFilterValue((prev)=>({
      ...prev, [item] : requestQuestionList[3].filter?.data[item][0]
    }));
   })
  },[data.contractType])

  return (
    <>
    <div className={styles.container}>
        <Header title="요청서함" color="white"/>
        <div  className={styles.elementContainer}>
        {
            LIST_ARRAY.map((key, index)=>{
              return(
                <ModifyElement 
                  title={key} 
                  key={index} 
                  index={index}
                  data={data}
                  setData={setData}
                  filterValue={filterValue}
                  setFilterValue={setFilterValue}/>
                );
            })
        }
        </div>
    </div>       
    <ConfirmButton title="수정하기" auth={true} onClick={()=>modifyRequestDocument(requestId, data, filterValue)}/>
    </>
  )
}
export default ModifyRequest;
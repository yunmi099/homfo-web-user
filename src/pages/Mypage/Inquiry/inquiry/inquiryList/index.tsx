import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import { formatDateTime } from '../../../../../utils/getDate';
import InquiryDetail from './inquiryDetail';
import '../../../../../store/type/inquiry&faq/interface'
import { FilteredData, OriginalData } from '../../../../../store/type/inquiry&faq/interface';
import ConfirmButton from '../../../../../components/button/ConfirmButton';
import { deleteInquiryList, getInquiryList } from '../../../../../services/inquiry/api';
  function InquiryList({ setMode, setModify ,setId }: { setMode: React.Dispatch<React.SetStateAction<boolean>>, setModify:React.Dispatch<React.SetStateAction<boolean>>,setId:React.Dispatch<React.SetStateAction<number>>  }) {
    const [data, setData] = useState<Array<FilteredData>|undefined>()
      function filterData(data: OriginalData[]): FilteredData[] {
        return data.map(({ errorId, errorTitle, isAnswered, createdAt,updatedAt }) => ({
          errorId,
          errorTitle,
          isAnswered,
          createdAt,
          updatedAt
        }));
      }
    useEffect(()=>{getInquiryList(2, setData, filterData)},[data])
    const handleModifyAction = (content: FilteredData)=>{
        setMode(true);
        setModify(true);
        setId(content.errorId)
    }
    const handleDeleteAction = (content: FilteredData)=>{
        deleteInquiryList(content.errorId);
        getInquiryList(2, setData, filterData);
    }
    return(
    <div className={styles.container}>
        {data!==undefined ? data.map((content)=>{
            return (       
            <div  key={content.errorId}>
                <div  style={{display:'flex', justifyContent:'space-between'}}>
                    <div>
                        {content.errorTitle}
                    </div>
                    {content.isAnswered===0?<div>
                        <span onClick={()=>{handleModifyAction(content)}}>수정 | </span>
                        <span onClick={()=>{handleDeleteAction(content)}}>삭제</span>
                    </div>:null}
                </div>
                <div>
                    문의일: {formatDateTime(content.createdAt)}
                </div>
                {
                    (content.createdAt === content.updatedAt ? null :             
                    <div>
                        수정일: {formatDateTime(content.updatedAt)}
                    </div>)
                }
                <div>
                    상태: {content.isAnswered===1?"답변 완료":"답변 준비중"}
                </div>
                <InquiryDetail errorId={content.errorId}/>
           </div>)
        }):null}
        <ConfirmButton title="새 문의 작성하기" auth={true} onClick={()=>setMode(true)}/>
    </div>);
}


export default InquiryList;
import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import axios, { AxiosResponse } from 'axios';
import { formatDateTime } from '../../../utils/getDate';
import InquiryDetail from './inquiryDetail';
import { SERVER_DEPOLY_URL } from '../../../utils/axios';

interface OriginalData {
    errorId: number;
    userId: number;
    errorTitle: string;
    errorContent: string;
    errorType: string;
    status: string;
    isAnswered: number;
    createdAt: string;
    updatedAt: string;
  }
  
  interface FilteredData {
    errorId: number;
    errorTitle: string;
    isAnswered: number;
    createdAt: string;
    updatedAt: string;
  }
  
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
      
      const getInquiryList = async (): Promise<void> => {
        const id = 2;
        try {
          const res: AxiosResponse = await axios.get(`${SERVER_DEPOLY_URL}/errors/users/${id}`);
          if (res.status === 200) {
            setData(filterData(res.data));
          }
        } catch (e:any) {
          console.log(e);
        }
      };
      
      useEffect(()=>{getInquiryList()},[])
    return(
    <div className={styles.container}>
        {data!==undefined ? data.map((content)=>{
            return (       
            <div style={{margin: 20,backgroundColor:'white'}} key={content.errorId}>
                <div  style={{display:'flex', justifyContent:'space-between'}}>
                    <div>
                        {content.errorTitle}
                    </div>
                    {content.isAnswered===0?<div>
                        <span onClick={()=>{setMode(true);setModify(true);setId(content.errorId)}}>수정 | </span>
                        <span>삭제</span>
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
        <button className={styles.button} onClick={()=>setMode(true)}>새 문의 작성하기</button>
    </div>);
}


export default InquiryList;
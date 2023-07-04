import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import axios from 'axios';
import { formatDate } from '../../../utils/getDate';
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
  
function InquiryList({setMode} : React.Dispatch<React.SetStateAction<boolean>>) {
    const [data, setData] = useState([
        { "errorId": 1,
          "errorTitle": "문의제목입니다.",
          "isAnswered": 1,
          "createdAt": "2023-06-25T12:45:21.373Z",
          "updatedAt": "2023-06-25T12:45:21.373Z"

        },
          {
          "errorId": 2,
          "errorTitle": "문의제목입니다.",
          "isAnswered": 0,
          "createdAt": "2023-06-25T12:45:21.373Z",  
          "updatedAt": "2023-06-30T09:53:33.393Z"

        }
      ])
      function filterData(data: OriginalData[]): FilteredData[] {
        return data.map(({ errorId, errorTitle, isAnswered, createdAt,updatedAt }) => ({
          errorId,
          errorTitle,
          isAnswered,
          createdAt,
          updatedAt
        }));
      }
      
    const getInquiryList= async () => {
        const id = 2;
        await axios
          .get(`${SERVER_DEPOLY_URL}/errors/users/${id}`)
          .then(async (res) => {
            if (res.status === 200) {
                setData(filterData(res.data));
            }
          })
          .catch((e) => {
            console.log(e);
          });
      };
      useEffect(()=>{getInquiryList()},[])
    return(
    <div className={styles.container}>
        {data!==undefined ? data.map((content)=>{
            return (       
            <div style={{margin: 20}} key={content.errorId}>
                <div  style={{display:'flex', justifyContent:'space-between'}}>
                    <div>
                        {content.errorTitle}
                    </div>
                    {content.isAnswered===0?<div>
                        <span>수정 | </span>
                        <span>삭제</span>
                    </div>:null}
                </div>
                <div>
                    문의일: {formatDate(content.createdAt)}
                </div>
                {
                    (content.createdAt === content.updatedAt ? null :             
                    <div>
                        수정일: {formatDate(content.updatedAt)}
                    </div>)
                }
                <div>
                    상태: {content.isAnswered===1?"답변 완료":"답변 준비중"}
                </div>
                <InquiryDetail errorId={content.errorId}/>
           </div>)
        }):null}
        <button onClick={()=>setMode(true)}>새 문의 작성하기</button>
    </div>);
}


export default InquiryList;
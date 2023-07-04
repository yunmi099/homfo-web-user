import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import axios from 'axios';
import { formatDate } from '../../../utils/getDate';
const SERVER_DEPOLY_URL = 'https://dev.ajou-only-five.shop/api/v1';
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
    errorTitle: string;
    isAnswered: number;
    createdAt: string;
    updatedAt: string;
  }
  
function InquiryList({setMode} : React.Dispatch<React.SetStateAction<boolean>>) {
    const [data, setData] = useState([
        {
          "errorTitle": "문의제목입니다.",
          "isAnswered": 1,
          "createdAt": "2023-06-25T12:45:21.373Z",
          "updatedAt": "2023-06-25T12:45:21.373Z"

        },
          {
          "errorTitle": "문의제목입니다.",
          "isAnswered": 1,
          "createdAt": "2023-06-25T12:45:21.373Z",  
          "updatedAt": "2023-06-30T09:53:33.393Z"

        }
      ])
      function filterData(data: OriginalData[]): FilteredData[] {
        return data.map(({ errorTitle, isAnswered, createdAt,updatedAt }) => ({
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
        {data!==undefined ? data.map((content, key)=>{
            return (       
            <div style={{margin: 20}}>
                <div key={key}>
                    {content.errorTitle}
                </div>
                <div key={key}>
                    문의일: {formatDate(content.createdAt)}
                </div>
                {
                    (content.createdAt === content.updatedAt ? null :             
                    <div key={key}>
                        수정일: {formatDate(content.updatedAt)}
                    </div>)
                }
                <div key={key}>
                    상태: {content.isAnswered===1?"답변 준비 중":"답변완료"}
                </div>
           </div>)
        }):null}
        <button onClick={()=>setMode(true)}>새 문의 작성하기</button>
    </div>);
}


export default InquiryList;
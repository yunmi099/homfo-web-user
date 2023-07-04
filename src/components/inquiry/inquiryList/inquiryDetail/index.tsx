import React, { useState, useEffect} from 'react';
import styles from './styles.module.scss';
import axios from 'axios';
import opendetail from '../../../../assets/icons/inquiry/downarrow2.png'
import closedetail from '../../../../assets/icons/inquiry/uparrow1.png'
import { SERVER_DEPOLY_URL } from '../../../../utils/axios';
interface QUESTION{
    errorId: number;
    userId: number;
    errorTitle: string;
    errorContent: string;
    errorType: string;
    status : string;
    isAnswered:number;
    createdAt: string;
    updatedAt: string;
}
interface ANSWER{
    answerId: number;
    answererId: number;
    answerContent: string;
    answeredAt:string;
    updatedAt: string;
    status: string;
}
interface DETAIL {
    question: QUESTION;
    answer: ANSWER;
  }
  
function InquiryDetail({errorId}: {errorId:number}) {
    const [openDetail,setOpenDetail]=useState<boolean>(false);
    const [detailContent, setDetailContent] =useState<DETAIL|undefined>();
    const getInquiryDetail= async (id) => {
        await axios
          .get(`${SERVER_DEPOLY_URL}/errors/${id}/detail`)
          .then(async (res) => {
            if (res.status === 200) {
                setDetailContent(res.data);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      };
    const handleInquiryDetail= ()=>{
        getInquiryDetail(errorId);
        setOpenDetail(!openDetail);
    }
    return(
    <div>
        <img src={openDetail? closedetail:opendetail} width={20} height={20} style={{marginLeft:"90vw"}} onClick={()=>handleInquiryDetail()}/> 
        {openDetail && detailContent!==undefined && 
        <div>
            <div>
                <div>{detailContent.question.errorType}</div>
                <div>{detailContent.question.errorContent}</div>
            </div> 
            {detailContent.question.isAnswered===1&&<div>
                <div>관리자</div>
                <div>{detailContent.answer.answerContent}</div>
            </div> }
        </div>}
    </div>);
}


export default InquiryDetail;
import React, { useState, useEffect} from 'react';
import styles from './styles.module.scss';
import axios from 'axios';
import opendetail from '../../../../assets/icons/inquiry/downarrow2.png'
import closedetail from '../../../../assets/icons/inquiry/uparrow1.png'
import { SERVER_DEPOLY_URL } from '../../../../utils/axios';
function InquiryDetail({errorId}: number) {
    const [openDetail,setOpenDetail]=useState<boolean>(false);
    const [detailContent, setDetailContent] =useState<object>({
        "question": {
            "errorId": 1,
            "userId": 2,
            "errorTitle": "문의할게요",
            "errorContent": "문의내용이에요",
            "errorType": "문의분류test",
            "status": "N",
            "isAnswered": 1,
            "createdAt": "2023-06-29T21:12:40.000",
            "updatedAt": "2023-06-30T08:02:41.000"
        },
        "answer": {
            "answerId": 1,
            "answererId": 1,
            "answerContent": "안녕하세요. 요청서의 답변은 요청서를 작성한 일로부터 주말/공휴일을 제외 2~7일 가량 소요될 수 있으며, 정확한 요청서 답변일은 중개자의 따라 상이하여 답변일자 안내가 어려운 점 양해 부탁드립니다.",
            "answeredAt": "2023-06-30T08:02:18.000",
            "updatedAt": "2023-06-30T08:02:18.000",
            "status": "N"
        }
    });
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
        {openDetail && detailContent!==undefined && detailContent.question.isAnswered===1 ? 
        <div>
            <div>관리자</div>
            <div>{detailContent.answer.answerContent}</div>
        </div> : null}
    </div>);
}


export default InquiryDetail;
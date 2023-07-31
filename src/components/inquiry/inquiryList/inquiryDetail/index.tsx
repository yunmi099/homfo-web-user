import React, { useState, useEffect} from 'react';
import styles from './styles.module.scss';
import axios, { AxiosResponse } from 'axios';
import opendetail from '../../../../assets/icons/inquiry/downarrow2.png'
import closedetail from '../../../../assets/icons/inquiry/uparrow1.png'
import { SERVER_DEPOLY_URL } from '../../../../utils/axios';
import { DETAIL } from '../../../../store/type/inquiry&faq/interface';

function InquiryDetail({errorId}: {errorId:number}) {
    const [openDetail,setOpenDetail]=useState<boolean>(false);
    const [detailContent, setDetailContent] =useState<DETAIL|undefined>();
    const getInquiryDetail = async (id: number): Promise<void> => {
        try {
          const res: AxiosResponse = await axios.get(`${SERVER_DEPOLY_URL}/errors/${id}/detail`);
          if (res.status === 200) {
            setDetailContent(res.data);
          }
        } catch (e) {
          console.log(e);
        }
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
            {detailContent.question.isAnswered===1? <div>
                <div>관리자</div>
                <div>{detailContent.answer.answerContent}</div>
            </div>:<div>안녕하세요.요청서의 답변은 요청서를 작성 한 일로부터 주말/공휴일을 제외 2~7일 가량 소요될 수 있으며, 정확항 요청서 답변은 중개자의 따라 상이하여 답변일자 안내가 어려운 점 양해부탁드립니다.</div>}
        </div>}
    </div>);
}


export default InquiryDetail;
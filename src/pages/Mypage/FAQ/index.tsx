import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import Header from '../../../components/layout/header';
import axios from 'axios';
import { SERVER_DEPOLY_URL } from '../../../utils/axios';
import SearchBar from './searchBar';
import openAnwser from '../../../assets/icons/inquiry/downarrow3.png'
interface ORIGIN_FAQ {
    faqId: number;
    writerId: number;
    question: string;
    answer: string;
    isPublic: number;
    status: string;
    createdAt: string;
    updatedAt: string;
  }
  
interface FAQLIST {
    faqId: number;
    question: string;
    answer: string;
    isPublic: number;
  }
const FAQElement = ({content}: FAQLIST)=>{
    const [open, setOpen] =useState<boolean>(false);
    return content.isPublic===1&&
        <div key={content.faqId} style={{margin:15, width:'90vw'}}>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                <div>Q.{content.question}</div><img src={openAnwser} width={15} height={10} onClick={()=>setOpen(!open)}/>
            </div>
            {open?<div>{content.answer}</div>:null}
        </div>
}
function FAQ() {
    const [faqList,setFaqList] =useState([
        {
          "faqId": 1,
          "question": "요청서는 언제 답변이 오나요?",
          "answer": "요청서 답변은 2-3일 이내로 옵니다.",
          "isPublic": 1,
        },   
        {
            "faqId": 2,
            "question": "회원탈퇴는 어디서하나요?",
            "answer": "개인정보 > 회원탈퇴 버튼을 누르시면 됩니다.",
            "isPublic": 1,
          }
      ]);

      function filterData(data: ORIGIN_FAQ[]): FAQLIST[] {
        return data.map(({ faqId, question, answer, isPublic }) => ({
            faqId, question, answer, isPublic
        }));
      }
    const getFAQlist= async () => {
        await axios
          .get(`${SERVER_DEPOLY_URL}/faq`)
          .then(async (res) => {
            if (res.status === 200) {
                setFaqList(filterData(res.data.faq));
            }
          })
          .catch((e) => {
            console.log(e);
          });
      };
      useEffect(()=>{getFAQlist()},[])
    return(
    <div className={styles.container}>
        <Header title=""/>    
        {/* <div>무엇을 찾고 계시나요?</div> */}
        <SearchBar/>
        {faqList!==undefined&&faqList.map((content)=><FAQElement content={content}/>)}
    </div>);
}


export default FAQ;
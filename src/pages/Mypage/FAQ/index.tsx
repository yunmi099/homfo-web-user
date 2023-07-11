import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import Header from '../../../components/layout/header';
import axios, { AxiosResponse } from 'axios';
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
  const FAQElement: React.FC<{ content: FAQLIST }> = ({ content }) => {
    const [open, setOpen] = useState<boolean>(false);
    return content.isPublic === 1 ? (
      <div style={{ margin: 15, width: '90vw' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>Q.{content.question}</div>
          <img
            src={openAnwser}
            width={15}
            height={10}
            onClick={() => setOpen(!open)}
          />
        </div>
        {open && <div>{content.answer}</div>}
      </div>
    ) : null;
  };
function FAQ() {
    const [faqList,setFaqList] =useState<Array<FAQLIST>|undefined>();

      function filterData(data: ORIGIN_FAQ[]): FAQLIST[] {
        return data.map(({ faqId, question, answer, isPublic }) => ({
            faqId, question, answer, isPublic
        }));
      }
      const getFAQlist = async (): Promise<void> => {
        try {
          const res: AxiosResponse = await axios.get(`${SERVER_DEPOLY_URL}/faq`);
          if (res.status === 200) {
            setFaqList(filterData(res.data.faq));
          }
        } catch (e) {
          console.log(e);
        }
      };
      
      useEffect(()=>{getFAQlist()},[])
    return(
    <div className={styles.container}>
        <Header title="FAQ"/>    
        {/* <div>무엇을 찾고 계시나요?</div> */}
        <SearchBar/>
        {faqList===undefined?<div>faq가 없습니다.</div>:faqList.map((content)=><FAQElement key={content.faqId} content={content}/>)}
    </div>);
}


export default FAQ;
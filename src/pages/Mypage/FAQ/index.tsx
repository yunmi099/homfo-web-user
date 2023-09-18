import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import Header from '../../../components/layout/header';
import SearchBar from './searchBar';
import openAnwser from '../../../assets/icons/inquiry/downarrow3.png'
import {FAQLIST, ORIGIN_FAQ} from '../../../store/type/inquiry&faq/interface'
import { getFAQlist } from '../../../services/faq/api';
  const FAQElement: React.FC<{ content: FAQLIST }> = ({ content }) => {
    const [open, setOpen] = useState<boolean>(false);
    return content.isPublic === "Y" ? (
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
    const  filterData = (data: ORIGIN_FAQ[]): FAQLIST[] => {
        return data.map(({ faqId, question, answer, isPublic }) => ({
            faqId, question, answer, isPublic
        }));
    }      
      useEffect(()=>{getFAQlist(setFaqList, filterData)},[])
    return(
    <div className={styles.container}>
        <Header title="FAQ"/>    
        <SearchBar/>
        {faqList===undefined?<div>faq가 없습니다.</div>:faqList.map((content)=><FAQElement key={content.faqId} content={content}/>)}
    </div>);
}


export default FAQ;
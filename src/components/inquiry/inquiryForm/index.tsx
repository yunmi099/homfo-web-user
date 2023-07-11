import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import axios, {AxiosResponse} from 'axios';
import downarrow from '../../../assets/icons/inquiry/downarrow1.png'
import { SERVER_DEPOLY_URL } from '../../../utils/axios';
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
function InquiryForm({ setMode, modify,id, setModify}: { setMode: React.Dispatch<React.SetStateAction<boolean>>, setModify:React.Dispatch<React.SetStateAction<boolean>>,modify: boolean , id:number}) {
    const [categoryList, setCategoryList] = useState<Array<string>|undefined>();
    const [selectedCategory, setSelectedCategory] = useState<string|undefined>();
    const [openCategory, setOpenCategory] = useState<boolean>(false);
    const [title,setTitle] = useState<string>();
    const [content, setContent] = useState<string>();  
    const getInquiryDetail = async (id: number): Promise<void> => {
        try {
          const res: AxiosResponse = await axios.get(`${SERVER_DEPOLY_URL}/errors/${id}/detail`);
          if (res.status === 200) {
            setSelectedCategory(res.data.question.errorType);
            setContent(res.data.question.errorContent);
            setTitle(res.data.question.errorTitle); 

          }
        } catch (e) {
          console.log(e);
        }
      };
    const getCategoryList = async (): Promise<void> => {
        try {
          const res: AxiosResponse = await axios.get(`${SERVER_DEPOLY_URL}/errors/type`);
          if (res.status === 200) {
            setCategoryList(res.data.errorType);
            setSelectedCategory(res.data.errorType[0]);
          }
        } catch (e: any) {
          console.log(e);
        }
      };
      useEffect(()=>{getCategoryList(); modify&&getInquiryDetail(id)},[])
    const submitInquiry = async (title: string, category: string, content: string) => {
        const data = {
            userId: 2,
            errorTitle: title,
            errorType: category,
            errorContent: content
        }
        try {
            if(modify){
                console.log(data);
                const res: AxiosResponse = await axios.patch(`${SERVER_DEPOLY_URL}/errors/${id}`, data);
            } else {
                const res: AxiosResponse = await axios.post(`${SERVER_DEPOLY_URL}/errors`, data);
            }
           
          } catch (e:any) {
            console.log(e);
        }
    }
    const handleErrorContent = (title: string | undefined, category: string, content: string | undefined)=>{
        if (title === undefined){
            alert("제목을 작성해주세요.");
        } else if(content === undefined){
            alert("내용을 작성해주세요");
        } else {
            submitInquiry(title, category, content);
            setModify(false);
            setMode(false);
        }
        
    }
    return(
    <div className={styles.container}>
        <div className={styles.title}>제목</div>   
        <input className={styles.titleinput} type="text" maxLength={50} placeholder="제목을 입력해주세요."value={title||''} onChange={(e)=>setTitle(e.target.value)}/>
        <div className={styles.underline}></div> 
        <div className={styles.title}>분류</div>
        <div className={styles.category}>
            <div>{selectedCategory}</div> 
            <img src={downarrow} width={12} height={10} onClick={()=>setOpenCategory(!openCategory)}/>
        </div>
        <div className={styles.underline}></div> 
            {openCategory&&categoryList!==undefined?categoryList.map((key,index)=>{return<div key={index} onClick={()=>{setSelectedCategory(key);setOpenCategory(false);}}>{key}</div>}):null}
        <div className={styles.title}>내용</div> 
        <input className={styles.contentinput}type="text" maxLength={200} placeholder="내용을 입력해주세요(200자 이내)" value={content||''} onChange={(e)=>setContent(e.target.value)}/>
        <button className={styles.button} onClick={()=>selectedCategory!==undefined&&handleErrorContent(title,selectedCategory,content)}>{modify?"수정":"제출"}</button>
    </div>);
}


export default InquiryForm;
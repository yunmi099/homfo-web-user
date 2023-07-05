import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import axios, {AxiosResponse} from 'axios';
import downarrow from '../../../assets/icons/inquiry/downarrow1.png'
import { SERVER_DEPOLY_URL } from '../../../utils/axios';

function InquiryForm({ setMode }: { setMode: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [categoryList, setCategoryList] = useState<Array<string>|undefined>();
    const [selectedCategory, setSelectedCategory] = useState<string|undefined>();
    const [openCategory, setOpenCategory] = useState<boolean>(false);
    const [title,setTitle] = useState<string>();
    const [content, setContent] = useState<string>();

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
      useEffect(()=>{getCategoryList()},[])
    const submitInquiry = async (title: string, category: string, content: string) => {
        const data = new FormData();
        data.append('userId', '2');
        data.append('errorTitle', title);
        data.append('errorType', category);
        data.append('errorContent', content);
        try {
            const res: AxiosResponse = await axios.post(`${SERVER_DEPOLY_URL}/errors`, data);
            console.log(res.data);
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
            setMode(false);
        }
        
    }
    return(
    <div className={styles.container}>
        <div className={styles.title}>제목</div>   
        <input className={styles.titleinput} type="text" maxLength={50} placeholder="제목을 입력해주세요." value={title} onChange={(e)=>setTitle(e.target.value)}/>
            <div className={styles.underline}></div> 
        <div className={styles.title}>분류</div>
        <div className={styles.category}>
            <div>{selectedCategory}</div> 
            <img src={downarrow} width={12} height={10} onClick={()=>setOpenCategory(!openCategory)}/>
        </div>
        <div className={styles.underline}></div> 
        {openCategory&&categoryList!==undefined?categoryList.map((key,index)=>{return<div key={index} onClick={()=>{setSelectedCategory(key);setOpenCategory(false);}}>{key}</div>}):null}
        <div className={styles.title}>내용</div> 
        <input className={styles.contentinput}type="text" maxLength={200} placeholder="내용을 입력해주세요(200자 이내)" value={content} onChange={(e)=>setContent(e.target.value)}/>
        <button className={styles.button} onClick={()=>selectedCategory!==undefined&&handleErrorContent(title,selectedCategory,content)}>제출</button>
    </div>);
}


export default InquiryForm;
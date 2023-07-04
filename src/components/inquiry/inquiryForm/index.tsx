import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import axios from 'axios';
import downarrow from '../../../assets/icons/inquiry/downarrow1.png'
import { SERVER_DEPOLY_URL } from '../../../utils/axios';

function InquiryForm() {
    const [categoryList, setCategoryList] = useState([
        "문의분류2",
        "문의분류test",
        "문의분류임당"
    ]);
    const [selectedCategory, setSelectedCategory] = useState<string>(categoryList[0]);
    const [openCategory, setOpenCategory] = useState<boolean>(false);
    const [title,setTitle] = useState<string>();
    const [content, setContent] = useState<string>();

    const getCategoryList= async () => {
        await axios
          .get(`${SERVER_DEPOLY_URL}/errors/type`)
          .then(async (res) => {
            if (res.status === 200) {
                setCategoryList(res.data.errorType);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      };
      useEffect(()=>{getCategoryList()},[])
    const submitInquiry = async (title: string, category: string, content: string) => {
        const data = new FormData();
        data.append('userId', 2);
        data.append('errorTitle', title);
        data.append('errorType', category);
        data.append('errorContent', content);
        await axios.post(`${SERVER_DEPOLY_URL}/errors`, data).then((res) => {
            console.log(res.data);
          });
    }
    const handleErrorContent = (title: string|undefined, category: string, content: string|undefined)=>{
        if (title === undefined){
            alert("제목을 작성해주세요.");
        } else if(content === undefined){
            alert("내용을 작성해주세요");
        } else {
            submitInquiry(title, category, content);
        }
        
    }
    return(
    <div className={styles.container}>
        <div>제목</div>   
        <input type="text" maxLength="50" placeholder="제목을 입력해주세요." value={title} onChange={(e)=>setTitle(e.target.value)}/>
        <div>분류</div>
        <div style={{display:'flex'}}>
            <div>{selectedCategory}</div> 
            <img src={downarrow} width={12} height={10} onClick={()=>setOpenCategory(!openCategory)}/>
        </div>
        {openCategory?categoryList.map((key,index)=>{return<div key={index} onClick={()=>{setSelectedCategory(key);setOpenCategory(false);}}>{key}</div>}):null}
        <div >내용</div> 
        <input type="text" maxLength="200" placeholder="내용을 입력해주세요(200자 이내)" value={content} onChange={(e)=>setContent(e.target.value)}/>
        <button onClick={()=>handleErrorContent(title,selectedCategory,content)}>제출</button>
    </div>);
}


export default InquiryForm;
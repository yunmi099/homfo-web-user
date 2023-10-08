import React,{useState, useEffect} from "react";
import openArrow from '../../../assets/icons/requestBox/openArrow.png'
import closeArrow from '../../../assets/icons/requestBox/closeArrow.png'
import styles from './styles.module.scss'
import { requestQuestionList } from "../../Request/RequestQuestionList";
import { QuestionForm } from "../../../store/type/hompoRecommend&request/interface";
import SelectedForm from "../../../components/selectedForm";
interface ModifyElementProps{
    title: string;
    index: number;
    data:any;
    setData:any;
    setFilterValue:any;
}

const ModifyElement = ({title, index,data,setData,setFilterValue}:ModifyElementProps)=>{
    const [open, setOpen] =useState(false)
    const currentQuestion: QuestionForm = requestQuestionList[index-1];
    const previousQuestion: QuestionForm = requestQuestionList[index-2];
    return(
        <div className={styles.container}>      
            <div className={styles.titleContainer}>
                <b>{title}</b>
                <img 
                src={open?openArrow:closeArrow}
                onClick={()=>setOpen(!open)}
                alt="열기"
                width="15px"
                height="8px"/>
            </div>
            {
                open&&index>0?
                <>        
                    <div className={styles.underline}></div>
                    <div style={{margin:"-5% 0",transform:'scale(0.8)',}}>
                    <SelectedForm 
                            currentQuestion={currentQuestion}
                            previousQuestion={previousQuestion}
                            mode={"price"}
                            data={data}
                            setData={setData}
                            setFilterValue={setFilterValue}
                    />
                    {currentQuestion.filter === null&&currentQuestion.answer===null?
                    <input value={data.additionalRequest} 
                    onChange={(e)=>setData((prev:any)=>({...prev, additionalRequests: e.target.value}))} 
                    className={styles.additionalRequests} placeholder='추가 요청사항을 입력해주세요 (최대 200자)'/>:null} 
                    {data.roomOption.includes('기타')&&index===8?
                    <input value={data.otherRoomOption} 
                    onChange={(e)=>setData((prev:any)=>({...prev, otherRoomOption: e.target.value}))}
                    className={styles.additionalFacilities} placeholder='추가 요청사항을 입력해주세요 (최대 15자)'/>:null} 
                    </div>
                </>
                :null
            }
        </div>)
}
export default ModifyElement;
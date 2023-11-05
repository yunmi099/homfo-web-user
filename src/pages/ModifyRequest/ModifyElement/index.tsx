import React,{useState, useEffect, Dispatch, SetStateAction} from "react";
import openArrow from '../../../assets/icons/requestBox/openArrow.png'
import closeArrow from '../../../assets/icons/requestBox/closeArrow.png'
import styles from './styles.module.scss'
import { requestQuestionList } from "../../Request/RequestQuestionList";
import { QuestionForm } from "../../../store/type/homfoRecommend&request/interface";
import SelectedForm from "../../../components/selectedForm";
import AdditionalInput from "../../../components/selecedProgress/input";
import { ExtendedRequestData } from "../../../store/type/requestBox/interface";
import OneAreaMap from "../../../components/map/OneAreaMap";
interface ModifyElementProps{
    title: string;
    index: number;
    data:ExtendedRequestData;
    setData: Dispatch<SetStateAction<ExtendedRequestData>>
    setFilterValue:  React.Dispatch<React.SetStateAction<{[key: string]: number[];}>>
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
            {open&&index===0?
                <>
                  <div className={styles.underline}></div>               
                  <div style={{fontSize: '0.8em', color: '#FF6666', marginLeft: '5%'}}>✅ 구역은 변경하실 수 없습니다.</div>
                  <div className = {styles.mapContainer}>
                    <OneAreaMap areaId={data.areaId}/>
                  </div>
                </>
                :null
            
            }
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
                    {data.roomOption.includes('기타')&&index===8?
                    <AdditionalInput data={data} setData={setData} objectKey={"otherRoomOption"}/>:null} 
                    {currentQuestion.filter === null&&currentQuestion.answer===null?
                    <AdditionalInput data={data} setData={setData} objectKey={"additionalFacilities"}/>:null} 
                    </div>
                </>
                :null
            }
        </div>)
}
export default ModifyElement;
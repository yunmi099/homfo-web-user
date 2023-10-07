import React,{useState, useEffect} from "react";
import openArrow from '../../../assets/icons/requestBox/openArrow.png'
import closeArrow from '../../../assets/icons/requestBox/closeArrow.png'
import styles from './styles.module.scss'
import { requestQuestionList } from "../../Request/RequestQuestionList";
import Question from "../../../components/selecedProgress/question";
import MultipleChoice from "../../../components/selecedProgress/multipleChoice";
interface ModifyElementProps{
    title: string;
    index: number;
}
const ModifyElement = ({title, index}:ModifyElementProps)=>{
    const [open, setOpen] =useState(false)
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
                    <Question question={requestQuestionList[index-1].question.contents} />

                </>
                :null
            }
        </div>)
}
export default ModifyElement;
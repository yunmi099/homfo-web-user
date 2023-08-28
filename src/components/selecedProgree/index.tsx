import React from 'react';
import ProgressStepTracker from '../progressStepTracker';
import { hompoQuestionList } from './hompoQuestionList';
import styles from './styles.module.scss'
import ConfirmButton from '../button/ConfirmButton';
interface SelectedProgressProps{
    count: number;
    setCount: React.Dispatch<React.SetStateAction<number>>;
}
const SelectedProgress = (props: SelectedProgressProps)=>{
    return(
    <>
        <div className={styles.question} dangerouslySetInnerHTML={{__html: hompoQuestionList[props.count-1].question}}></div>
        <div className={styles.answerContainer}>{hompoQuestionList[props.count-1].answer.map((key)=><div className={styles.answer} key={key}>{key}</div>)}</div>
        <ConfirmButton title='다음' onClick={()=>{console.log(props.count+1);props.setCount(props.count+1);}} auth={true} />
    </>);
}
export default SelectedProgress


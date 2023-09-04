import React, { CSSProperties } from 'react';
import { hompoQuestionList } from '../../pages/RecommendedArea/hompoQuestionList';
import styles from './styles.module.scss';
import ConfirmButton from '../button/ConfirmButton';
import Filter from './filter';
import MultipleChoice from './multipleChoice';
import Question from './question';
interface SelectedProgressProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;


}

const SelectedProgress = (props: SelectedProgressProps) => {
  const currentQuestion = hompoQuestionList[props.count - 1];
  return (
    <>
    <Question question={currentQuestion.question}/>
      {currentQuestion.filter===null?
    <MultipleChoice currentQuestion={currentQuestion}/>:
    <div style={{marginTop: '10%'}}>
      {Object.keys(currentQuestion.filter.data).map((key,index)=>{
      return(      
      <>
        <Filter 
          title={key} 
          min={currentQuestion.filter.data[key][0][0]}
          max={currentQuestion.filter.data[key][0][1]}
          onewayOption={true}/>
        <div className={styles.filterIntervalBox}>
          {currentQuestion.filter.data[key][1].map((info)=><div className={styles.filterInterval}>{info}</div>)}
        </div>
      </>
    );})
    }</div>}
      <ConfirmButton
        title="다음"
        onClick={() =>{props.count<hompoQuestionList.length&&props.setCount(props.count + 1)}}
        auth={true}
      />
    </>
  );
};

export default SelectedProgress;

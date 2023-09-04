import React, { CSSProperties } from 'react';
import { hompoQuestionList } from '../hompoQuestionList';
import styles from './styles.module.scss';
import ConfirmButton from '../../../components/button/ConfirmButton';
import Filter from '../../../components/selecedProgress/filter';
import MultipleChoice from '../../../components/selecedProgress/multipleChoice';
import Question from '../../../components/selecedProgress/question';
import useHompoSurveyStore from '../../../store/context/useHompoSurveyStore';
interface SelectedProgressProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}
const SelectedHompoSurvey = (props: SelectedProgressProps) => {
  const currentQuestion = hompoQuestionList[props.count - 1];
  const {info, setSurveyInfo} = useHompoSurveyStore();
  return (
    <>
    <Question question={currentQuestion.question}/>
      {currentQuestion.filter===null?
    <MultipleChoice currentQuestion={currentQuestion} />:
    <div style={{marginTop: '10%'}}>
      {Object.keys(currentQuestion.filter.data).map((key,index)=>{
      return(      
      <div key={index}>
        <Filter 
          title={key} 
          min={currentQuestion.filter.data[key][0][0]}
          max={currentQuestion.filter.data[key][0][1]}
          onewayOption={true}/>
        <div className={styles.filterIntervalBox}>
          {currentQuestion.filter.data[key][1].map((info)=><div className={styles.filterInterval}>{info}</div>)}
        </div>
      </div>
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

export default SelectedHompoSurvey;

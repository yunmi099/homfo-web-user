import React, {useState, CSSProperties, useEffect} from 'react';
import styles from './styles.module.scss';
import { QuestionForm, HompoEditData } from '../../../store/type/hompoRecommend&request/interface';
import { RequestData } from '../../../store/type/hompoRecommend&request/interface';
import { Dispatch, SetStateAction } from 'react';
interface MultipleChoiceProps {
  currentQuestion: QuestionForm;
  data: HompoEditData|RequestData;
  setData: Dispatch<SetStateAction<HompoEditData>>|Dispatch<SetStateAction<|RequestData>>;
}

const MultipleChoice: React.FC<MultipleChoiceProps> = ({ currentQuestion,data, setData }) => {
  const isRowMode = currentQuestion.mode === 'row';
  const isColumnMode = currentQuestion.mode === 'column';
  const questionType = currentQuestion.question.type;
  const containerStyles: CSSProperties = {
    flexDirection: isRowMode ? 'row' : 'column',
    marginLeft: isColumnMode ? '20px' : '5.5%',
  };

  const answerStyles: CSSProperties = {
    width: isColumnMode ? '45%' : '42%',
  };
  const handleSelectAnswer = (answer: any)=>{
    if (currentQuestion.double){
      setData((prev:any) => ({...prev, [questionType]: [...prev[questionType], answer] }));
    } else {
      setData((prev:any) => ({...prev,[questionType] : [answer]}));
    }
  }
  const handleCancelAnswer = (answer: any) => {
      setData((prevData: any) => ({
        ...prevData,
        [questionType]: prevData[questionType].filter(
          (value: any) => value !== answer
        ),
      }));
  };
  return (
    <div className={styles.answerContainer} style={containerStyles}>
      {currentQuestion.answer!==null&&currentQuestion.answer.map((key) => (
        <div
          className={`${
            data[questionType].includes(key.value) ? styles.activeAnswerButton : styles.nonactiveAnswerButton
          }`}
          style={answerStyles}
          key={key.title}
          onClick={() => {
            if (data[questionType].includes(key.value)){
              console.log(data[questionType])
              console.log(key.value)
              handleCancelAnswer(key.value);
            } else {
              console.log(data[questionType])
              console.log(key.value)
              handleSelectAnswer(key.value);
            }
          }}
        >
          {key.title}
        </div>
      ))}
    </div>
  );
};

export default MultipleChoice;

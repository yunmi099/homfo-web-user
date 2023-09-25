import React, {useState, CSSProperties, useEffect} from 'react';
import styles from './styles.module.scss';
import { HompoQuestion, HompoEditData } from '../../../store/type/hompoRecommend/interface';
interface MultipleChoiceProps {
  currentQuestion: HompoQuestion;
  // data: HompoEditData;
  data: any;
  // setData: React.Dispatch<React.SetStateAction<HompoEditData>>;
  setData: React.Dispatch<React.SetStateAction<any>>;
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
              handleCancelAnswer(key.value);
            } else {
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

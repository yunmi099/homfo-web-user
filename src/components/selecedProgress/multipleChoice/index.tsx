import React, {useState, CSSProperties, useEffect} from 'react';
import styles from './styles.module.scss';

interface AnswerData {
  question: string;
  answer:{ title: string; value: any; }[]|null;
  mode: string;
  double: boolean;
  filter: null | {
    unit: string;
    data: { [key: string]: [number[], string[]] };
  };
}

interface MultipleChoiceProps {
  currentQuestion: AnswerData;
}

const MultipleChoice: React.FC<MultipleChoiceProps> = ({ currentQuestion }) => {
  const [data,setData] = useState<any>([]);
  const [count,setCount] = useState<number>(0);
  const isRowMode = currentQuestion.mode === 'row';
  const isColumnMode = currentQuestion.mode === 'column';

  const containerStyles: CSSProperties = {
    flexDirection: isRowMode ? 'row' : 'column',
    justifyContent: isRowMode ? 'space-evenly' : 'flex-start',
    marginLeft: isColumnMode ? '20px' : undefined,
  };

  const answerStyles: CSSProperties = {
    width: isColumnMode ? '45vw' : '42vw',
  };
  const handleSelectAnswer = (answer: any)=>{
    if (currentQuestion.double){
      setData([...data,answer]);
    } else {
      setData([answer]);
    }
  }
  const handleCancelAnswer = (answer:any)=>{
    setData((prevData:any) => prevData.filter((value:any) => value !== answer));
  }
  console.log(data);
  return (
    <div className={styles.answerContainer} style={containerStyles}>
      {currentQuestion.answer!==null&&currentQuestion.answer.map((key) => (
        <div
          className={`${styles.answerButton} ${
            data.includes(key.value) ? styles.activeAnswerButton : styles.nonactiveAnswerButton
          }`}
          style={answerStyles}
          key={key.title}
          onClick={() => {
            if (data.includes(key.value)){
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

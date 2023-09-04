import React, {useState, CSSProperties } from 'react';
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
  // const [data,setData] = useState();
  // const [count,setCount] = useState<number>(0);
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

  return (
    <div className={styles.answerContainer} style={containerStyles}>
      {currentQuestion.answer!==null&&currentQuestion.answer.map((key) => (
        <div
          className={styles.answer}
          style={answerStyles}
          key={key.title}
          onClick={() => {
            console.log(key);
            // setData(key.value);
          }}
        >
          {key.title}
        </div>
      ))}
    </div>
  );
};

export default MultipleChoice;

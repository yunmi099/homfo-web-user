import React, { CSSProperties } from 'react';
import { hompoQuestionList } from '../../pages/RecommendedArea/hompoQuestionList';
import styles from './styles.module.scss';
import ConfirmButton from '../button/ConfirmButton';
import Filter from './filter';

interface SelectedProgressProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;

}

const SelectedProgress = (props: SelectedProgressProps) => {
  const currentQuestion = hompoQuestionList[props.count - 1];
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
    <>
      <div
        className={styles.question}
        dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
      ></div>
      {currentQuestion.filter===null?
      <div className={styles.answerContainer} style={containerStyles}>
        {currentQuestion.answer.map((key) => (
          <div className={styles.answer} style={answerStyles} key={key}>
            {key}
          </div>
        ))}
      </div>:
      Object.keys(currentQuestion.filter).map((key,index)=>
      <Filter 
      title={key} 
      min={currentQuestion.filter[key][0]}
      max={currentQuestion.filter[key][1]}
      onewayOption={false}/>)}
      <ConfirmButton
        title="다음"
        onClick={() =>{props.count<hompoQuestionList.length&&props.setCount(props.count + 1)}}
        auth={true}
      />
    </>
  );
};

export default SelectedProgress;

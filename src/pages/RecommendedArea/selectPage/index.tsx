import React, { useState, useEffect } from 'react';
import { hompoQuestionList } from '../hompoQuestionList';
import styles from './styles.module.scss';
import ConfirmButton from '../../../components/button/ConfirmButton';
import Filter from '../../../components/selecedProgress/filter';
import MultipleChoice from '../../../components/selecedProgress/multipleChoice';
import Question from '../../../components/selecedProgress/question';
import useHompoSurveyStore from '../../../store/context/useHompoSurveyStore';
import { HompoQuestion,HompoEditData } from '../../../store/type/hompoRecommend/interface';
interface SelectedProgressProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  totalCount: number;
}

const SelectedHompoSurvey = (props: SelectedProgressProps) => {
  const currentQuestion: HompoQuestion = hompoQuestionList[props.count - 1];
  const [data, setData] = useState<HompoEditData>({
    universityPeople: [],
    transports: [],
    hobbyInHome: [],
    facilities: [],
  });
  const [filterValue,setFilterValue] = useState<{[key:string]:number[]}|undefined>();
  const {postHompoRecommendInfo, result} = useHompoSurveyStore();
  console.log(result);
  return (
    <>
      <Question question={currentQuestion.question.contents} />
      {currentQuestion.filter === null ? (
        <MultipleChoice currentQuestion={currentQuestion} data={data} setData={setData} />
      ) : (
        <div style={{ marginTop: '10%' }}>
          {data[hompoQuestionList[props.count-2].question.type].map((key:string, index:number) => {
            const filterData = currentQuestion.filter!.data;
            return (
              <div key={index}>
                <Filter
                  min={filterData[key][0][0]}
                  max={filterData[key][0][1]}
                  unit={key}
                  data={filterValue}
                  setData={setFilterValue}
                  title={filterData[key][2]}
                  onewayOption={true}
                />
                <div className={styles.filterIntervalBox}>
                  {filterData[key][1].map((info, idx) => (
                    <div key={idx} className={styles.filterInterval}>
                      {info}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
      <ConfirmButton
        title="다음"
        onClick={() => {
          if(props.count===1&&data[currentQuestion.question.type][0]===false){
            props.setCount(props.count+3);
          } else if(props.totalCount ===props.count) {
            postHompoRecommendInfo(2, data, filterValue);
          } else{
            if (props.count < hompoQuestionList.length) {
              props.setCount(props.count + 1);
            }
          }
        }}
        auth={currentQuestion.filter === null?data[currentQuestion.question.type].length?true:false:true}
      />
    </>
  );
};

export default SelectedHompoSurvey;
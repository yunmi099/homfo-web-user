import React, { useState, useEffect } from 'react';
import { requestQuestionList } from '../RequestQuestionList';
import styles from './styles.module.scss';
import ConfirmButton from '../../../components/button/ConfirmButton';
import Filter from '../../../components/selecedProgress/filter';
import MultipleChoice from '../../../components/selecedProgress/multipleChoice';
import Question from '../../../components/selecedProgress/question';
import { HompoQuestion} from '../../../store/type/hompoRecommend/interface';
interface SelectedProgressProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  totalCount: number;
}

const SelectedRequestSurvey = (props: SelectedProgressProps) => {
  const currentQuestion: HompoQuestion = requestQuestionList[props.count - 1];
  const [data, setData] = useState<any>({
    "areaName": [],
    "realEstateType": [],
    "contractType": [],
    "residencePeriod": [],
    "maxDeposit": [],
    "maxMontlyFee": [],
    "loan":[],
    "type":[],
    "moveInPeriod": [],
    "wantedFacilities": [],
    "additionalRequests":[],
  });
  const [filterValue,setFilterValue] = useState<{[key:string]:number[]}|undefined>();
  return (
    <div style={{marginTop:"10vh"}}>
      <Question question={currentQuestion.question.contents} />
      {currentQuestion.filter === null ? (
        <MultipleChoice currentQuestion={currentQuestion} data={data} setData={setData}/>
      ) : (
        <>
          {data[requestQuestionList[props.count-2].question.type].map((key:string, index:number) => {
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
                  onewayOption={false}
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
        </>
      )}
      {currentQuestion.filter === null&&currentQuestion.answer===null?<div><input/></div>:null} 
      <ConfirmButton
        title="다음"
        onClick={() => {
          if(props.count===5&&data[currentQuestion.question.type][0]===false){
            props.setCount(props.count+2);
          } else if(props.totalCount ===props.count) {
            alert("api 기다리는 중 ~ 기다리세용");
          } else{
            if (props.count < requestQuestionList.length) {
              props.setCount(props.count + 1);
            }
          }
        }}
        auth={currentQuestion.filter === null?data[currentQuestion.question.type].length?true:false:true}
      />
    </div>
  );
};

export default SelectedRequestSurvey;
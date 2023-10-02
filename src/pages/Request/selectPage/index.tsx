import React, { useState, useEffect } from 'react';
import { requestQuestionList } from '../RequestQuestionList';
import styles from './styles.module.scss';
import ConfirmButton from '../../../components/button/ConfirmButton';
import Filter from '../../../components/selecedProgress/filter';
import MultipleChoice from '../../../components/selecedProgress/multipleChoice';
import Question from '../../../components/selecedProgress/question';
import {QuestionForm} from '../../../store/type/hompoRecommend&request/interface';
import { RequestData } from '../../../store/type/hompoRecommend&request/interface';
import useRequestStore from '../../../store/context/useRequestStore';
interface SelectedProgressProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  totalCount: number;
}

const SelectedRequestSurvey = (props: SelectedProgressProps) => {
  const currentQuestion: QuestionForm = requestQuestionList[props.count - 1];
  const [data, setData] = useState<RequestData>({
    "realEstateType": [],
    "contractType": [],
    "residencePeriod": [],
    "loanAvailability":[],
    "loanType":[],
    "moveInPeriod": [],
    "roomOption": [],
    "otherRoomOption": "",
    "additionalRequests":"",
  });
  const [filterValue,setFilterValue] = useState<{[key:string]:number[]}>({});
  const questionType = currentQuestion.question.type;
  const {postPropertyRequest} = useRequestStore();
  return (
    <div style={{marginTop:"10vh"}}>
      <Question question={currentQuestion.question.contents} />
      {currentQuestion.filter === null ? (
        <MultipleChoice currentQuestion={currentQuestion} data={data} setData={setData}/>
      ) : (
        <>
          {
          data[requestQuestionList[props.count-2].question.type][0].map((key:string, index:number) => {
            const filterData = currentQuestion.filter!.data;
            return (
              <div key={index}>
                <Filter
                  min={filterData[key][0][0]}
                  max={filterData[key][0][1]}
                  setData={setFilterValue}
                  unit={key}
                  mode={"price"}
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
          })
          }
        </>
      )}
    
      {currentQuestion.filter === null&&currentQuestion.answer===null?<input value={data.additionalRequests} onChange={(e)=>setData((prev:RequestData)=>({...prev, additionalRequests: e.target.value}))} className={styles.additionalRequests} placeholder='추가 요청사항을 입력해주세요 (최대 200자)'/>:null} 
      {data.roomOption.includes('기타')&&props.count===props.totalCount-1?<input value={data.otherRoomOption} onChange={(e)=>setData((prev:RequestData)=>({...prev, otherRoomOption: e.target.value}))} className={styles.additionalFacilities} placeholder='추가 요청사항을 입력해주세요 (최대 15자)'/>:null} 
      {
        props.totalCount ===props.count?
        <ConfirmButton
        title="완료"
        onClick={() => {
          postPropertyRequest(2,data,filterValue);
        }}
        auth={true}
      />:
      <ConfirmButton
        title="다음"
        onClick={() => {
          if(props.count===5&&data[questionType][0]==="아니오"){
            props.setCount(props.count+2);
          } else{
            if (props.count < requestQuestionList.length) {
              props.setCount(props.count + 1);
            }
          }
        }}
        auth={currentQuestion.filter === null?data[questionType].length?true:false:true}
      />
    }
    </div>
  );
};

export default SelectedRequestSurvey;
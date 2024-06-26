import React, { useState,} from 'react';
import { requestQuestionList } from '../RequestQuestionList';
import styles from './styles.module.scss';
import ConfirmButton from '../../../components/button/ConfirmButton';
import {QuestionForm} from '../../../store/type/homfoRecommend&request/interface';
import { RequestData } from '../../../store/type/homfoRecommend&request/interface';
import useRequestStore from '../../../store/context/useRequestStore';
import { useNavigate } from 'react-router-dom';
import SelectedForm from '../../../components/selectedForm';
import useUserStore from '../../../store/context/useUserStore';
import CustomModal from './modal';
interface SelectedProgressProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  totalCount: number;
}

const SelectedRequestSurvey = (props: SelectedProgressProps) => {
  const currentQuestion: QuestionForm = requestQuestionList[props.count - 1];
  const previousQuestion: QuestionForm = requestQuestionList[props.count - 2];
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
  const {userInfo} = useUserStore();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <div style={{marginTop:"20px"}}>
      <SelectedForm currentQuestion={currentQuestion} previousQuestion={previousQuestion} mode={"price"} data={data} setData={setData} setFilterValue={setFilterValue}/>
      {currentQuestion.filter === null&&currentQuestion.answer===null?
      <input value={data.additionalRequests} 
      onChange={(e)=>setData((prev:RequestData)=>({...prev, additionalRequests: e.target.value}))} 
      className={styles.additionalRequests} placeholder='추가 요청사항을 입력해주세요 (최대 200자)'/>:null} 
      {data.roomOption.includes('기타')&&props.count===props.totalCount-1?
      <input value={data.otherRoomOption} 
      onChange={(e)=>setData((prev:RequestData)=>({...prev, otherRoomOption: e.target.value}))}
      className={styles.additionalFacilities} placeholder='추가 요청사항을 입력해주세요 (최대 15자)'/>:null} 
      {
        props.totalCount ===props.count?
        <ConfirmButton
          title="완료"
          onClick={async () => {
            const result = await postPropertyRequest(userInfo.userId, data, filterValue);
            if (result.status === 201) {
              setModalIsOpen(true)
            }
          }}
          auth={true}
        />
      :
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
      <CustomModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}/>
    </div>
  );
};

export default SelectedRequestSurvey;
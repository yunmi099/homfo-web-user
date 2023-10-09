import React, { useState, useEffect } from 'react';
import { hompoQuestionList } from '../homfoQuestionList';
import ConfirmButton from '../../../components/button/ConfirmButton';
import useHompoSurveyStore from '../../../store/context/useHomfoSurveyStore';
import { QuestionForm,HomfoEditData } from '../../../store/type/homfoRecommend&request/interface';
import { useNavigate } from 'react-router-dom';
import SelectedForm from '../../../components/selectedForm';
interface SelectedProgressProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  totalCount: number;
}
const SelectedHompoSurvey = (props: SelectedProgressProps) => {
  const navigate = useNavigate();
  const currentQuestion: QuestionForm = hompoQuestionList[props.count - 1];
  const previousQuestion: QuestionForm = hompoQuestionList[props.count - 2];
  const [data, setData] = useState<HomfoEditData>({
    universityPeople: [],
    transports: [],
    hobbyInHome: [],
    facilities: [],
  });
  const [filterValue,setFilterValue] = useState<{[key:string]:number[]}>({});
  const {postHomfoRecommendInfo} = useHompoSurveyStore();
  return (
    <div style={{marginTop:"10vh"}}>
      <SelectedForm currentQuestion={currentQuestion} previousQuestion={previousQuestion} mode={"time"} data={data} setData={setData} setFilterValue={setFilterValue}/>
      <ConfirmButton
        title="다음"
        onClick={() => {
          if(props.count===1&&data[currentQuestion.question.type][0]===false){
            props.setCount(props.count+3);
          } else if(props.totalCount ===props.count) {
            navigate('/mypage/hompo-recommended-result');
            postHomfoRecommendInfo(2, data, filterValue);
          } else{
            if (props.count < hompoQuestionList.length) {
              props.setCount(props.count + 1);
            }
          }
        }}
        auth={currentQuestion.filter === null?data[currentQuestion.question.type].length?true:false:true}
      />
    </div>
  );
};

export default SelectedHompoSurvey;
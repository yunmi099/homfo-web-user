import React,{Dispatch, SetStateAction} from "react";
import styles from './styles.module.scss'
import { HomfoEditData, QuestionForm, RequestData } from "../../store/type/homfoRecommend&request/interface";
import Filter from "../selectedProgress/filter";
import MultipleChoice from "../selectedProgress/multipleChoice";
import Question from "../selectedProgress/question";
import { ExtendedRequestData } from "../../store/type/requestBox/interface";
interface SelectedFormProps {
    currentQuestion: QuestionForm;
    previousQuestion: QuestionForm;
    data: HomfoEditData|RequestData|ExtendedRequestData;
    setData:Dispatch<SetStateAction<HomfoEditData>>|Dispatch<SetStateAction<RequestData>>|Dispatch<SetStateAction<ExtendedRequestData>>;
    filterValue?: {[item: string]: number[]};
    setFilterValue: Dispatch<SetStateAction<{[item: string]: number[];}>>;
    mode: string;
}
const SelectedForm = ({currentQuestion, previousQuestion,filterValue,mode,data, setData, setFilterValue}:SelectedFormProps)=>{
    return(
    <>
      <Question question={currentQuestion.question.contents} />
      {currentQuestion.filter === null ? (
        <MultipleChoice currentQuestion={currentQuestion} data={data} setData={setData} />
      ) : (
        <div>
          {data[previousQuestion.question.type][0]!==undefined&&data[previousQuestion.question.type][0].map((item:string, index:number) => {
            const filterData = currentQuestion.filter!.data;
            return (
              <div key={item}>
                <Filter
                  min={filterData[item][0][0]}
                  max={filterData[item][0][1]}
                  unit={item}
                  mode={mode}
                  // data={filterValue[item]}
                  setData={setFilterValue}
                  title={filterData[item][2]}
                  onewayOption={mode==="time"&&true}
                />
                <div className={styles.filterIntervalBox}>
                  {filterData[item][1].map((info, idx) => (
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
    
    </>)
}
export default SelectedForm;
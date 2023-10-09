import React,{Dispatch, SetStateAction} from "react";
import styles from './styles.module.scss'
import { HompoEditData, QuestionForm, RequestData } from "../../store/type/homfoRecommend&request/interface";
import Filter from "../selecedProgress/filter";
import MultipleChoice from "../selecedProgress/multipleChoice";
import Question from "../selecedProgress/question";
import { ExtendedRequestData } from "../../store/type/requestBox/interface";
interface SelectedFormProps {
    currentQuestion: QuestionForm;
    previousQuestion: QuestionForm;
    data: HompoEditData|RequestData|ExtendedRequestData;
    setData:Dispatch<SetStateAction<HompoEditData>>|Dispatch<SetStateAction<RequestData>>|Dispatch<SetStateAction<ExtendedRequestData>>;
    setFilterValue: Dispatch<SetStateAction<{[key: string]: number[];}>>;
    mode: string;
}
const SelectedForm = ({currentQuestion, previousQuestion,mode,data, setData, setFilterValue}:SelectedFormProps)=>{
    return(
    <>
      <Question question={currentQuestion.question.contents} />
      {currentQuestion.filter === null ? (
        <MultipleChoice currentQuestion={currentQuestion} data={data} setData={setData} />
      ) : (
        <div>
          {data[previousQuestion.question.type][0].map((key:string, index:number) => {
            const filterData = currentQuestion.filter!.data;
            return (
              <div key={index}>
                <Filter
                  min={filterData[key][0][0]}
                  max={filterData[key][0][1]}
                  unit={key}
                  mode={mode}
                  setData={setFilterValue}
                  title={filterData[key][2]}
                  onewayOption={mode==="time"&&true}
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
    
    </>)
}
export default SelectedForm;
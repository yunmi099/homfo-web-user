import React,{useState, useEffect} from 'react';
import styles from './styles.module.scss';
import InitialPage from './InitialPage';
import ProgressStepTracker from '../../components/progressStepTracker';
import { homfoQuestionList } from './homfoQuestionList';
import SelectedHompoSurvey from './selectPage';
function RecommendedArea(){
    const [count, setCount] = useState(0);
    return (<div className={styles.container}>
    {count===0?
    <InitialPage count={count} setCount={setCount}/>
    :<>
        <ProgressStepTracker count={count} totalCount={homfoQuestionList.length}/>
        <SelectedHompoSurvey count={count} setCount={setCount} totalCount={homfoQuestionList.length}/>
    </>
    }    
    </div>)
}
export default RecommendedArea;
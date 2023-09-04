import React,{useState, useEffect} from 'react';
import styles from './styles.module.scss';
import InitialPage from './InitialPage';
import ProgressStepTracker from '../../components/progressStepTracker';
import SelectedProgress from '../../components/selecedProgree';
import { hompoQuestionList } from './hompoQuestionList';
function RecommendedArea(){
    const [count, setCount] = useState(0);
    return (<div className={styles.container}>
    {count===0?
    <InitialPage count={count} setCount={setCount}/>
    :<>
        <ProgressStepTracker count={count} totalCount={hompoQuestionList.length}/>
        <SelectedProgress count={count} setCount={setCount}/>
    </>
    }    
    </div>)
}
export default RecommendedArea;
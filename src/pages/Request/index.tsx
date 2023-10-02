import React,{useState, useEffect} from 'react';
import styles from './styles.module.scss';
import ProgressStepTracker from '../../components/progressStepTracker';
import SelectedRequestSurvey from './selectPage';
import { requestQuestionList } from './RequestQuestionList';
import ZoneSelectPage from './zoneSelectPage';

function Request(){
    const [count, setCount] = useState(0);
    return (<div className={styles.container}>
    {count===0?
    <ZoneSelectPage count={count} setCount={setCount}/>
    :<>
        <ProgressStepTracker count={count} totalCount={requestQuestionList.length}/>
        <SelectedRequestSurvey count={count} setCount={setCount} totalCount={requestQuestionList.length}/>
    </>
    }    
    </div>)
}
export default Request;
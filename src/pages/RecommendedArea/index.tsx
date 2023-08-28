import React,{useState, useEffect} from 'react';
import styles from './styles.module.scss';
import ProgressStepTracker from '../../components/progressStepTracker';
import InitialPage from './InitialPage';
function RecommendedArea(){
    const [count, setCount] = useState(0);
    return (<div className={styles.container}>
    {count===0?
    <InitialPage count={count} setCount={setCount}/>
    :<ProgressStepTracker count={count} totalCount={6}/>
    }    
    </div>)
}
export default RecommendedArea;
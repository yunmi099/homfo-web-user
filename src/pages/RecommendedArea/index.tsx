import React,{useState, useEffect} from 'react';
import styles from './styles.module.scss';
import ProgressStepTracker from '../../components/progressStepTracker';
function RecommendedArea(){
    const [count, setCount] = useState(2);
    return (<div className={styles.container}>
    <ProgressStepTracker count={count} totalCount={6}/>
    </div>)
}
export default RecommendedArea;
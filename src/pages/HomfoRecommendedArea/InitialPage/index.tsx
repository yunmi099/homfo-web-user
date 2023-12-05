import React from "react";
import styles from '../styles.module.scss'
interface InitialPageProps{
    count: number;
    setCount: React.Dispatch<React.SetStateAction<number>>;
}
const InitialPage = (props: InitialPageProps)=>{
return(<>
    <div className={styles.initialNotice}>
        <div style={{marginLeft:'10%'}}>히포가  <span>당신에게 어울리는 구역을</span></div>
        <div style={{marginLeft:'60%'}}>추천해줄거에요.</div>
    </div>
    <div onClick={()=>props.setCount(props.count+1)} className={styles.startButton}>시작하기</div>
</>);
}
export default InitialPage;
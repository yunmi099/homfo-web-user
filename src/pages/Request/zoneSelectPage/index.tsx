import React from "react";
import styles from '../styles.module.scss'
import KakaoMap from "../../KakaoMap";
import ConfirmButton from "../../../components/button/ConfirmButton";
import Header from "../../../components/layout/header";
import Question from "../../../components/selecedProgress/question";
interface InitialPageProps{
    count: number;
    setCount: React.Dispatch<React.SetStateAction<number>>;
}
const ZoneSelectPage = (props: InitialPageProps)=>{
return(<>
        <Header title="요청하기" color="white"/>
        <Question question="<span>어느 구역</span>을 찾으실 건가요?"/>
        <p>지도자리*^^*</p>
        <ConfirmButton onClick={()=>props.setCount(props.count+1)} auth={true} title="다음"/>
</>);
}
export default ZoneSelectPage;
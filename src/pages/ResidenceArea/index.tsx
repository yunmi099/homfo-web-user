import React from "react";
import AllAreaMap from "../../components/map/AllAreaMap";
import backButton from '../../assets/icons/map/backButton.png'
import requestButton from '../../assets/icons/map/request.png'
import styles from './styles.module.scss'
import useHomfoSurveyStore from "../../store/context/useHomfoSurveyStore";
import { useNavigate } from "react-router-dom";
function ResidenceArea(){
    const navigate = useNavigate();
    const { result } = useHomfoSurveyStore();
    return(
    <div className={styles.container}>
        <img 
            alt="뒤로가기" 
            src={backButton}
            className={styles.backButton}
            onClick={()=>{
                navigate(-1);
            }}/>
        <img
            alt="요청하기" 
            src={requestButton} 
            className={styles.requestButton}
            onClick={() => {
                result === null
                ? alert('홈포 추천 구역을 먼저 검사해보세요!')
                : navigate('/request');
            }}/>
        <AllAreaMap renderingDetailPage={true}/>
    </div>)
}
export default ResidenceArea;
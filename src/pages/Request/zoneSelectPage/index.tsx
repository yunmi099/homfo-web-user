import React, { useEffect, useState } from "react";
import ConfirmButton from "../../../components/button/ConfirmButton";
import Header from "../../../components/layout/header";
import { getAreaInfo } from "../../../services/area/api";
import styles from './styles.module.scss';
import { Area } from "../../../store/type/homfoRecommend&request/interface";
import check from '../../../assets/icons/request/checkBox.png';
import nonecheck from '../../../assets/icons/request/noneCheckBox.png';
import CustomModal from "./modal";
import SelectArea from "./selectArea";
import useHomfoSurveyStore from "../../../store/context/useHomfoSurveyStore";
import useRequestStore from "../../../store/context/useRequestStore";
interface InitialPageProps{
    count: number;
    setCount: React.Dispatch<React.SetStateAction<number>>;
}

const ZoneSelectPage = (props: InitialPageProps)=>{
    const [areaInfo, setAreaInfo] = useState<Area[]|undefined>();
    const [selfChoice, setSelfChoice] = useState<boolean>(true);
    const [selectedArea, setSelectedArea] =useState<number[]>([]);
    const [modalIsOpen, setModalIsOpen] = useState(true);
    const {result} = useHomfoSurveyStore();
    const {setAreaId} = useRequestStore();
    useEffect(()=>{
        getAreaInfo("단국대학교", "본교",setAreaInfo);
        if (result !== null && result.length > 0) {
            setSelectedArea(result.map((key)=>key.area.areaId));
        }
    },[])
          
return(<>
        <Header title="요청하기" color="white"/>
        <div className={styles.container}>
            <CustomModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
            <div className={styles.question}><span>어느 구역</span>을 찾으실 건가요?</div>
            {areaInfo!==undefined&&
            <>
            <div className={styles.checkBox} >
                <img 
                src={selfChoice?check:nonecheck} 
                width={25} 
                height={25} alt="check"
                onClick={()=>setSelfChoice(prev=>!prev)}
                />
                <div>제가 직접 고를게요</div>
            </div>
            {selfChoice&&
            <div className={styles.mapContainer}>
                <SelectArea areaInfo={areaInfo} setSelfChoice={setSelfChoice} selectedArea={selectedArea} setSelectedArea={setSelectedArea}/>
            </div>
            }
            </>}

        </div>
        <ConfirmButton onClick={()=>{props.setCount(props.count+1); setAreaId(selectedArea) }} auth={true} title="다음"/>
</>);
}
export default ZoneSelectPage;
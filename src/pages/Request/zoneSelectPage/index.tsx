import React, { useEffect, useState } from "react";
import ConfirmButton from "../../../components/button/ConfirmButton";
import Header from "../../../components/layout/header";
import { getAreaInfo } from "../../../services/reauest/api";
import styles from './styles.module.scss';
import { Area } from "../../../store/type/request/interface";
import check from '../../../assets/icons/request/checkBox.png';
import CustomModal from "./modal";


interface InitialPageProps{
    count: number;
    setCount: React.Dispatch<React.SetStateAction<number>>;
}

const ZoneSelectPage = (props: InitialPageProps)=>{
    const [areaInfo, setAreaInfo] = useState<Area[]|undefined>();
    const [selfChoice, setSelfChoice] = useState<boolean>(true);
    const [modalIsOpen, setModalIsOpen] = useState(true);
    getAreaInfo("단국대학교", "본교",setAreaInfo);
return(<>
        <Header title="요청하기" color="white"/>
        <div className={styles.container}>
            <CustomModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
            <div className={styles.question}><span>어느 구역</span>을 찾으실 건가요?</div>
            {areaInfo!==undefined&&
            <>
            <div className={styles.checkBox} >
                <img src={check} width={25} height={25} alt="checkBox"/>
                <div>제가 직접 고를게요</div>
            </div>
            {selfChoice&&
            <div className={styles.mapContainer}>
                {/* <>지도자리</> */}
            </div>
            }
            </>}

        </div>
        <ConfirmButton onClick={()=>props.setCount(props.count+1)} auth={true} title="다음"/>
</>);
}
export default ZoneSelectPage;
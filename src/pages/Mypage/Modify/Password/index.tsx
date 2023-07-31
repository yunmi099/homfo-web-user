import React,{useState,useEffect} from "react";
import Header from "../../../../components/layout/header";
import styles from '../styles.module.scss'
import { useNavigate } from "react-router-dom";
const ModifyPassword = ()=>{
    const navigate = useNavigate();
    const [password, setPassword]=useState<string>("");
    return(
    <div className={styles.container}>
        <Header title="비밀번호 변경" color="white"/>
        <div className={styles.inputBox}>
            <input className={styles.input} type="password" inputMode="numeric" placeholder="현재 비밀번호를 입력하세요."/>
            <input className={styles.input} type="password" inputMode="numeric" placeholder="새 비밀번호를 입력하세요."/>
            <input className={styles.input} type="password" inputMode="numeric" placeholder="새 비밀번호를 한번 더 확인해주세요."/>
        </div>
        <button className={styles.button}>비밀번호 변경</button>
        <div className={styles.textButton} onClick={()=>navigate(-1)}>다음에 변경하기</div>
    </div>)
}
export default ModifyPassword;
import React from "react";
import Header from "../../../../components/layout/header";
import styles from '../styles.module.scss'
const ModifyPassword = ()=>{

    return(
    <div className={styles.container}>
        <Header title="비밀번호 변경" color="white"/>
        <div className={styles.inputBox}>
            <input className={styles.input} type="password" placeholder="현재 비밀번호를 입력하세요."/>
            <input className={styles.input} type="password" placeholder="새 비밀번호를 입력하세요."/>
            <input className={styles.input} type="password" placeholder="새 비밀번호를 한번 더 확인해주세요."/>
        </div>
        <button className={styles.button}>비밀번호 변경</button>
        <div className={styles.textButton}>다음에 변경하기</div>
    </div>)
}
export default ModifyPassword;
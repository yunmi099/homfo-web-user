import React,{useState} from "react";
import Header from "../../../../components/layout/header";
import styles from '../styles.module.scss'
import { useNavigate } from "react-router-dom";
const ModifyPhonenumber = ()=>{
    const [open, setOpen] = useState(false)
    const navigate = useNavigate();
    return(    
    <div className={styles.container}>
        <Header title="전화번호 변경" color="white"/>
        <div className={styles.inputBox}>
            <div>
                <input className={styles.input} style={{width:'59vw'}}  inputMode="numeric" type="text" placeholder="변경할 전화번호를 입력하세요."/>
                <button style={{width:'28.5vw',height:'5.5vh'}}onClick={()=>setOpen(true)}>인증 요청</button>
            </div>
            {open&&<input className={styles.input} type="text"  inputMode="numeric" placeholder="인증번호를 입력하세요"/>}
        </div>
        <button className={styles.button}>전화번호 변경</button>
        <div className={styles.textButton} onClick={()=>navigate(-1)}>다음에 변경하기</div>
    </div>)
}
export default ModifyPhonenumber;
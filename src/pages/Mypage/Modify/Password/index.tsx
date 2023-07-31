import React,{useState,useEffect} from "react";
import Header from "../../../../components/layout/header";
import styles from '../styles.module.scss'
import { useNavigate } from "react-router-dom";
const ModifyPassword = ()=>{
    const navigate = useNavigate();
    const [password, setPassword]=useState({currentPassword:"", newPassword:"", checkPassword:"",});
    const {currentPassword, newPassword, checkPassword} = password;
    const [message, setMessage] = useState({errorMessage:"",checkMessage:""});
    const [color,setColor] = useState<string>("black");

    const onChangePassword = (key:string, value:string)=>{
        setPassword((prev)=>({...prev, [key]:value}))
    }
    const onChangeMessage = (key:string, value:string)=>{
        setMessage((prev)=>({...prev, [key]:value}))
    }
      // 영문 대/소문자, 숫자, 특수 기호를 모두 포함하는 정규표현식
    const pattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
    useEffect(()=>{
        if (newPassword.length<8 || newPassword.length>15){
            onChangeMessage("errorMessage", "영문, 숫자, 특수기호를 포함하여 8~15글자의 비밀번호를 입력해주세요.");
            setColor('#777777');
        } else {
            if (pattern.test(newPassword)){
                onChangeMessage("errorMessage","사용가능한 비밀번호 입니다.");
                setColor('#39A03E');
            } else{
                onChangeMessage("errorMessage", "영문, 숫자, 특수기호를 포함하여 8~15글자의 비밀번호를 입력해주세요.");
                setColor('#777777');
            }
        }
    },[newPassword]);
    
    useEffect(()=>{
        if (newPassword!==checkPassword){
            onChangeMessage("checkMessage", "비밀번호가 일치하지 않습니다.");
        } else{
            onChangeMessage("checkMessage", "");
        }
        if(checkPassword.length===0){
            onChangeMessage("checkMessage", "");
        }
    },[checkPassword]);
    return(
    <div className={styles.container}>
        <Header title="비밀번호 변경" color="white"/>
        <div className={styles.inputBox}>
            <input className={styles.input} value={currentPassword} onChange={(e)=>onChangePassword("currentPassword", e.target.value)}
            type="password" inputMode="numeric" placeholder="현재 비밀번호를 입력하세요."/>
            <input className={styles.input} value={newPassword} onChange={(e)=>onChangePassword("newPassword", e.target.value)}
            type="password" inputMode="numeric" placeholder="새 비밀번호를 입력하세요."/>
            {message.errorMessage.length>0&&<div style={{fontSize:10, color:color}}>{message.errorMessage}</div>}
            <input className={styles.input} value={checkPassword} onChange={(e)=>onChangePassword("checkPassword", e.target.value)}
            type="password" inputMode="numeric" placeholder="새 비밀번호를 한번 더 확인해주세요."/>
            {message.checkMessage.length>0&&<div style={{fontSize:10, color:"red"}}>{message.checkMessage}</div>}
        </div>
        <button className={styles.button}>비밀번호 변경</button>
        <div className={styles.textButton} onClick={()=>navigate(-1)}>다음에 변경하기</div>
    </div>)
}
export default ModifyPassword;
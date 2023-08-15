import React,{useState,useEffect} from "react";
import Header from "../../../../components/layout/header";
import styles from '../styles.module.scss'
import { useNavigate } from "react-router-dom";
import { fetchFromApi } from "../../../../utils/axios";
import useTimerStore from "../../../../store/context/useTimerStore";
const ModifyPhonenumber = ()=>{
    const [open, setOpen] = useState(false)
    const [phonenumber, setPhonenumber] = useState("")   
    const [canVerify, setVerify] = useState(false);
    const [count, setCount] = useState<number>(0); 
    const navigate = useNavigate();
    const { isRunning, remainingTime, startTimer, stopTimer } = useTimerStore();
    const authenticationRequest = async (): Promise<void> => {
        let data = {'userPhoneNum': phonenumber}
        try {
            setOpen(true)
            setCount((prev)=>prev+1);
            const res = await fetchFromApi('POST', `/users/sms-auth`,data);
            if (res.status === 200) {
                console.log(res.data);
            }
        } catch (e:any) {
            console.log(e.response.data.message)
        }
        
    };
    const authenticationVerify = async (): Promise<void> => {
        let data = {
            "cacheKey":"",
            "authNum": "",
          }
        try {
            const res = await fetchFromApi('POST', `/users/sms-auth/verify`,data);
            if (res.status === 200) {

            }
        } catch (e:any) {
        }
        
    };
    // 다섯번이하면 1분 다섯번 이상이면 5분 
    useEffect(()=>{
        
    },[count])
    const handleStart = () => {
        startTimer();
      };
    
    const handleStop = () => {
        stopTimer();
    };

    const formatTime = (timeInSeconds:number) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };
    
    
    return(    
    <div className={styles.container}>
        <Header title="전화번호 변경" color="white"/>
        <div className={styles.inputBox}>
            <div style={{display:'flex'}}>
                <input style={{width:"50vw"}} value ={phonenumber} onChange={(e)=>setPhonenumber(e.target.value)} inputMode="numeric" type="text" placeholder="변경할 전화번호를 입력하세요."/>
                <p style={{color:'red'}}>{formatTime(remainingTime)}</p>
                <button className={styles.verifyButton} onClick={()=>authenticationRequest()}>인증 요청</button>
            </div>
            {open&&<input className={styles.input} type="text"  inputMode="numeric" placeholder="인증번호를 입력하세요"/>}
        </div>
        <button className={styles.button}>전화번호 변경</button>
        <div className={styles.textButton} onClick={()=>navigate(-1)}>다음에 변경하기</div>

    </div>)
}
export default ModifyPhonenumber;
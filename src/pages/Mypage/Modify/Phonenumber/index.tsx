import React,{useState,useEffect} from "react";
import Header from "../../../../components/layout/header";
import styles from '../styles.module.scss'
import { useNavigate } from "react-router-dom";
import { fetchFromApi } from "../../../../utils/axios";
import useTimerStore from "../../../../store/context/useTimerStore";
import useUserStore from "../../../../store/context/useUserStore";
const ModifyPhonenumber = ()=>{
    const [open, setOpen] = useState<boolean>(false)
    const [phonenumber, setPhonenumber] = useState<string>("") 
    const [verifyNumber, setVerifyNumber] = useState<string>("")
    const [count, setCount] = useState<number>(0); 
    const navigate = useNavigate();
    const {userInfo, modify} = useUserStore((state)=>state);
    
    const [errorMessage, setErrorMessage]=useState<boolean>(false);
    const { isRunning, remainingTime, startTimer, resetTimer} = useTimerStore();
    const authenticationRequest = async (): Promise<void> => {
        let data = {'userPhoneNum': phonenumber}
        try {
            setOpen(true)
            setCount((prev)=>prev+1);
            const res = await fetchFromApi('POST', `/users/sms-auth`,data);
            if (res.status === 200) {
                resetTimer();
                startTimer();                
            }
        } catch (e:any) {
            console.log(e.response.data.message)
        }
        
    };

    const authenticationVerify = async (): Promise<void> => {
        let data = {
            "userPhoneNum":phonenumber,
            "authNumber": verifyNumber,
          }
        try {
            const res = await fetchFromApi('POST', `/users/sms-auth/verify`,data);
            if (res.status === 200) {
                resetTimer();
            }
        } catch (e:any) {
            alert(e.response.data.message);
        }
        
    };


    const handleChangePhoneNumber =  async ()=>{
        if (await modify(userInfo.userId,{"userPhoneNum":phonenumber})){
            setOpen(false);
            setPhonenumber("");               
            setVerifyNumber("");
            alert("전화번호를 변경했습니다.")
        } else {
            alert("다시 시도해주세요.")
        }
    
    }
    const formatTime = (timeInSeconds:number) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };
    const pattern = /^\d{3}-\d{4}-\d{4}$/;
    const handleRequest = ()=>{
        if (pattern.test(phonenumber)){
            switch (true) {
                case count >= 1 && count <= 5:
                    if (remainingTime>120){
                      alert("요청은 1분 후 부터 보낼 수 있습니다.")
                    } else {
                      authenticationRequest();
                    }
                    break;
                case count === 0:
                    authenticationRequest();
                    break;
                case count > 5:
                    if (remainingTime>0){
                        alert("요청은 3분 후 부터 보낼 수 있습니다.")
                      } else {
                        authenticationRequest();
                    }
                    break;
                default:
            }
        } else {
            alert("000-0000-0000 형식으로 작성해주세요.")
        }
    }
    const handleVerifySubmit = ()=>{
        if (verifyNumber.length>0) {
            authenticationVerify();
            // 여기 인증부분 에러 처리 다시    
        } else {
            alert("인증 번호를 입력해주세요.");
        }
            
    }
    useEffect(()=>{
        const length = verifyNumber.length ;
        if (!(length ===0 || length === 4)){
            setErrorMessage(true);
        } else {
            setErrorMessage(false);
        }
    },[verifyNumber])
    return(    
    <div className={styles.container}>
        <Header title="전화번호 변경" color="white"/>
        <div className={styles.inputBox}>
            <div style={{display:'flex'}}>
                <input style={{width:"59vw"}} value ={phonenumber} onChange={(e)=>setPhonenumber(e.target.value)} 
                inputMode="numeric" type="text" placeholder="000-0000-0000 형식으로 입력하세요."/>
                <button className={styles.verifyButton} onClick={()=>handleRequest()}>인증 요청</button>
            </div>   
            {open&&
            <div style={{display:'flex'}}>
                 <input style={{width:"59vw"}}  type="text"  
            value={verifyNumber} onChange={(e)=>setVerifyNumber(e.target.value)}
            inputMode="numeric" placeholder="인증번호를 입력하세요"/>
                <button className={styles.verifyButton} onClick={()=>handleVerifySubmit()}>인증 확인</button>
                </div>}
            </div>
        {isRunning&&<p style={{color:'red'}}>{formatTime(remainingTime)}</p>}
        {errorMessage&&<div style={{color:'red'}}>인증 번호는 4자리 입니다.</div>}
            <button className={styles.button} onClick={()=>handleChangePhoneNumber()}>전화번호 변경</button>
        <div className={styles.textButton} onClick={()=>navigate(-1)}>다음에 변경하기</div>

    </div>)
}
export default ModifyPhonenumber;
import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import Header from '../../../components/layout/header';
import axios, { AxiosResponse } from 'axios';
import { SERVER_DEPOLY_URL } from '../../../utils/axios';
import {PersonalInfo} from '../../../store/type/memberInfo/interface';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../../../hooks/useDebounce';
function AccountInfoPage() {
  const navigate = useNavigate();
  const [pastInfo, setPastInfo] = useState<PersonalInfo>({
    dateOfBirth: "",
    gender: "",
    job: "",
    nickName: "",
    status: "",
    userAccount: "",
    userId: 0,
    userPhoneNum: "string"
  });
  const [updateInfo, setInfo] = useState({nickName: "", gender: "", job:"", dateOfBirth:""});
  const {nickName, gender, job, dateOfBirth} = updateInfo;
  const [message, setMessage] = useState<string>("닉네임을 입력해주세요.\n 영문(대소문자가능),숫자,한글로 15글자이내로 입력해주세요.");
  const [color, setColor]= useState<string>('black');
  const modifyData = (key: string, value:string)=>{
    setInfo((prev)=>({...updateInfo, [key]:value}))
  }
  const getPersonalInfo = async (id: number): Promise<void> => {
    try {
      const res: AxiosResponse<PersonalInfo> = await axios.get(`${SERVER_DEPOLY_URL}/users/${id}/info`);
      if (res.status === 200) {
        setPastInfo(res.data);
        setInfo((prev)=>({...updateInfo, gender:res.data.gender, job:res.data.job, dateOfBirth:res.data.dateOfBirth}))
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getPersonalInfo(2);
  }, []);

  const doubleCheck = async (nickname: string): Promise<void> => {
    try {
      const res: AxiosResponse<PersonalInfo> = await axios.get(`${SERVER_DEPOLY_URL}/users/auth/duplicate/nickname/${nickname}`);
      if (res.status === 200) {
        setMessage("사용가능한 닉네임입니다.")
        setColor("green")}
    } catch (e:any) {
        setMessage(e.response.data.message);
        setColor("red");
    }
  }

const regex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\|]/;
 const debouncedNickname = useDebounce(nickName, 500);
 useEffect(() => {
  if(debouncedNickname.length===0){
      setMessage("닉네임을 입력해주세요.\n 영문(대소문자가능),숫자,한글로 15글자이내로 입력해주세요.");
      setColor("black");
  } else if (debouncedNickname.length<=15){
    if (regex.test(nickName)){
      setMessage("영문(대소문자가능),숫자,한글로 15글자이내로 입력해주세요.");
      setColor("red");
    } else {
      doubleCheck(debouncedNickname);
    }
  }
 }, [debouncedNickname]);

  const fetchModifyInfo = async (data: {})=>{
    try {
      let id = 2
      console.log(data)
      const res: AxiosResponse = await axios.patch(`${SERVER_DEPOLY_URL}/users/${id}/info`, data);
      console.log(res.data);
    } catch (e: any) {
      console.log(e);
    }
  }
  return (
    <div className={styles.container}>
      <Header title="계정정보"/>
      {pastInfo && (
        <>
          <div className={styles.blockUnit}>
              <div className={styles.key}>아이디</div>
              <div className={styles.value}>{pastInfo.userAccount}</div>
              <div className={styles.underline}></div>
          </div>
          <div className={styles.blockUnit}>
              <div className={styles.key}>닉네임</div>
              <div style={{display:'flex', justifyContent:'space-between'}}>
                <input className={styles.value} type="text" maxLength={15} placeholder={pastInfo.nickName} value={nickName} onChange={(e)=>modifyData("nickName", e.target.value)}/>
                <button onClick={()=>fetchModifyInfo({"nickName": nickName})} style={{ backgroundColor: color === 'green' ? "purple" : "white" }}>수정</button>

              </div>
              <div className={styles.underline}></div>
              <div className={styles.value} style={{fontSize:12,color:color}}>{message}</div>
          </div>
          <div className={styles.blockUnit}>
              <div className={styles.key}>비밀번호</div>
              <button style={{marginLeft:"85%"}} onClick={()=>navigate('/user/password')}>재설정</button>
              <div className={styles.underline}></div>
          </div>
        </>
        )}
    </div>
  );
}

export default AccountInfoPage;

import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import Header from '../../../components/layout/header';
import axios, { AxiosResponse } from 'axios';
import { SERVER_DEPOLY_URL } from '../../../utils/axios';
import {PersonalInfo} from '../../../store/type/memberInfo/interface';
import DateScrollPicker from './DateScrollPicker';
import { useNavigate } from 'react-router-dom';
function PersonalInfoPage() {
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
  const [detailJob, setDetailJob] = useState<string>("");
  const {nickName, gender, job, dateOfBirth} = updateInfo;
  const modifyData = (key: string, value:string)=>{
    setInfo((prev)=>({...updateInfo, [key]:value}))
  }
 
  const getPersonalInfo = async (id: number): Promise<void> => {
    try {
      const res: AxiosResponse<PersonalInfo> = await axios.get(`${SERVER_DEPOLY_URL}/users/${id}/info`);
      if (res.status === 200) {
        console.log(res.data)
        setPastInfo(res.data);
        setInfo((prev)=>({...updateInfo, gender:res.data.gender, job:res.data.job, dateOfBirth:res.data.dateOfBirth}))
      }
    } catch (e) {
      console.log(e);
    }
  };
  
  const fetchModifyInfo = async ()=>{
    try {
      let id = 2
      let data;
      if(updateInfo.nickName===""){
        data = {...updateInfo, nickName: pastInfo.nickName}
      } else {
        data = updateInfo;
      }
      const res: AxiosResponse = await axios.patch(`${SERVER_DEPOLY_URL}/users/${id}/info`, data);
      console.log(res.data);
    } catch (e: any) {
      console.log(e);
    }
  }
    useEffect(() => {
    getPersonalInfo(2);
  }, []);
  return (
    <div className={styles.container}>
      <Header title="개인정보"/>
      {pastInfo && (
        <>

          <div className={styles.blockUnit}>
              <div className={styles.key}>성별</div>
              <select value={gender} className={styles.value} onChange={(e)=>modifyData("gender", e.target.value)}>
                  <option value="M">남성</option>
                  <option value="W">여성</option>
              </select>
              <div className={styles.underline}></div>
          </div>
          
          <div className={styles.blockUnit}>
            <div className={styles.key}>전화번호</div>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                <div className={styles.value}>{pastInfo.userPhoneNum}</div> 
                <button onClick={()=>{navigate('/user/phonenumber')}}>재설정</button>
            </div>
            <div className={styles.underline}></div>
          </div>   

          <div className={styles.blockUnit}>
              <div className={styles.key}>직업</div>
              <div className={styles.value}>{pastInfo.job}</div>
              <select className={styles.value} value={job} onChange={(e)=>modifyData("job", e.target.value)}>
                <option value="대학생">대학생</option>
                <option value="직장인">직장인</option>
                <option value="자영업자">자영업자</option>
                <option value="프리랜서">프리랜서</option>
                <option value="주부">주부</option>
                <option value="기타">기타</option>
                </select>
              {job === '기타' && <input className={styles.value} placeholder="15자 이내로 작성해주세요" maxLength={15} value={detailJob} onChange={(e)=>setDetailJob(e.target.value)}/>}
              <div className={styles.underline}></div>
          </div>

          <div className={styles.blockUnit}>
            <div className={styles.key}>생년월일</div>
            <DateScrollPicker dateOfBirth={dateOfBirth} setDateOfBirth={setInfo}/>
            <div className={styles.underline}></div>
          </div>
          
        </>
        )}
      <button className={styles.button} onClick={()=>fetchModifyInfo()}>수정하기</button>
    </div>
  );
}

export default PersonalInfoPage;

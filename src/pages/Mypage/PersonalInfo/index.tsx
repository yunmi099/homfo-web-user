import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import Header from '../../../components/layout/header';
import axios, { AxiosResponse } from 'axios';
import { SERVER_DEPOLY_URL } from '../../../utils/axios';
import { formatDate } from '../../../utils/getDate';
import {PersonalInfo} from '../../../store/type/memberInfo/interface';
import DateScrollPicker from './DateScrollPicker';
function PersonalInfoPage() {
  const [pastInfo, setPastInfo] = useState<PersonalInfo>({
    dateOfBirth: "",
    gender: "",
    hbtiType: null,
    job: "",
    nickName: "",
    refreshToken: null,
    status: "",
    userAccount: "",
    userId: 0,
    userPhoneNum: "string"
  });
  const [updateInfo, setInfo] = useState({nickName: "", gender: "", job:"", dateOfBirth:""});
  const [detailJob, setDetailJob] = useState<string>("");
  const {nickName, gender, job, dateOfBirth} = updateInfo;
  const [numberReset, setNumberReset] = useState(false);
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
    getPersonalInfo(6);
  }, []);

  const fetchModityInfo = async ()=>{
    let id = 7;
    const data = {

    };
    try {
        const res: AxiosResponse = await axios.patch(`${SERVER_DEPOLY_URL}/errors/${id}`, data);
    } catch (e: any) {
      console.log(e);
    }
  }
 const handleCancel=()=>{}
 const handleSelect=()=>{}
  return (
    <div className={styles.container}>
      <Header title="개인정보"/>
      {pastInfo && (
        <div className={styles.modifyBox}>
          <div className={styles.blockUnit}>
              <div className={styles.key} >닉네임</div>
              <div style={{display:'flex', justifyContent:'space-between'}}>
                <input className={styles.value} type="text" placeholder={pastInfo.nickName} value={nickName} onChange={(e)=>modifyData("nickName", e.target.value)}/>
                <button>수정</button>
              </div>
              <div className={styles.underline}></div>
              <div className={styles.value}>영문(대소문자가능),숫자,한글 가능 8~15글자<br/>닉네임을 입력해주세요.</div>
          </div>
      

          <div className={styles.blockUnit}>
              <div className={styles.key}>아이디</div>
              <div className={styles.value}>{pastInfo.userAccount}</div>
              <div className={styles.underline}></div>
          </div>
       

          <div className={styles.blockUnit}>
              <div className={styles.key}>비밀번호</div>
              <button style={{marginLeft:"86%"}}>재설정</button>
              <div className={styles.underline}></div>
          </div>
      

          <div className={styles.blockUnit}>
              <div className={styles.key}>성별</div>
              <select value={gender} className={styles.value} onChange={(e)=>modifyData("gender", e.target.value)}>
                  <option value="M">남성</option>
                  <option value="W">여성</option>
              </select>
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
              {job === '기타' && <input className={styles.value} placeholder="20자 이내로 작성해주세요" maxLength={20} value={detailJob} onChange={(e)=>setDetailJob(e.target.value)}/>}
              <div className={styles.underline}></div>
          </div>
   

          <div className={styles.blockUnit}>
            <div className={styles.key}>전화번호</div>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                <div className={styles.value}>{pastInfo.userPhoneNum}</div> 
                <button onClick={()=>setNumberReset(true)}>재설정</button>
            </div>
            <div className={styles.underline}></div>
          </div>   
     

          <div className={styles.blockUnit}>
            <div className={styles.key}>생년월일</div>
            <div className={styles.value}>{formatDate(dateOfBirth)}</div>
            <DateScrollPicker />
          </div>
          <div className={styles.underline}></div>
        </div>
        )}
      <button className={styles.button} onClick={()=>fetchModityInfo()}>수정하기</button>
    </div>
  );
}

export default PersonalInfoPage;

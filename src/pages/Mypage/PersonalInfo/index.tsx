import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import Header from '../../../components/layout/header';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../../store/context/useUserStore';
// import DateScrollPicker from './DateScrollPicker';
function PersonalInfoPage() {
  const navigate = useNavigate();
  const {userInfo, modify} = useUserStore((state)=>state);

  const [updateInfo, setInfo] = useState({job:"", dateOfBirth:""});
  const [detailJob, setDetailJob] = useState<string>("");
  const {job, dateOfBirth} = updateInfo;

  const modifyData = (key: string, value:string)=>{
    setInfo((prev)=>({...updateInfo, [key]:value}))
  }
 
  const handleModifyJob = ()=>{
    if (job === '기타'){
      modify(2,{"job":detailJob});
      setDetailJob("");
    } else {
      modify(2, {"job":job})
    }
  }
  return (
    <div className={styles.container}>
      <Header title="개인정보"/>
      {userInfo && (
        <>

          <div className={styles.blockUnit}>
              <div className={styles.key}>성별</div>
                <div>{userInfo.gender==="M"?"남성":"여성"}</div>
              <div className={styles.underline}></div>
          </div>
          
          <div className={styles.blockUnit}>
            <div className={styles.key}>전화번호</div>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                <div className={styles.value}>{userInfo.userPhoneNum}</div> 
                <button onClick={()=>{navigate('/user/phonenumber')}}>재설정</button>
            </div>
            <div className={styles.underline}></div>
          </div>   

          <div className={styles.blockUnit}>
              <div className={styles.key}>직업</div>
              <div className={styles.value}>{userInfo.job}</div>
              <select className={styles.value} value={job} onChange={(e)=>modifyData("job", e.target.value)}>
                <option value="대학생">대학생</option>
                <option value="직장인">직장인</option>
                <option value="자영업자">자영업자</option>
                <option value="프리랜서">프리랜서</option>
                <option value="주부">주부</option>
                <option value="기타">기타</option>
                </select>
              {job === '기타' && <input className={styles.value} placeholder="15자 이내로 작성해주세요" maxLength={15} value={detailJob} onChange={(e)=>setDetailJob(e.target.value)}/>}
              <button onClick={()=>handleModifyJob()}>수정</button>
              <div className={styles.underline}></div>
          </div>

          <div className={styles.blockUnit}>
            <div className={styles.key}>생년월일</div>
            <div>{userInfo.dateOfBirth}</div>
            {/* <DateScrollPicker dateOfBirth={dateOfBirth} setDateOfBirth={setInfo}/>  */}
            <div className={styles.underline}></div>
          </div>
          
        </>
        )}
    </div>
  );
}

export default PersonalInfoPage;

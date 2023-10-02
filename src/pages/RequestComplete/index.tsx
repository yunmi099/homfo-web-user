import React from 'react'
import styles from './styles.module.scss'
import completeIcon from '../../assets/icons/request/complete.png';
import ConfirmButton from '../../components/button/ConfirmButton';
import { useNavigate } from 'react-router-dom';
export default function ResultComplete() {
  const navigate = useNavigate()
  return (
    <>
    <div className={styles.container}>
      <img alt={"완료"} src={completeIcon} width="80px" height="80px"/> 
      <h1 className={styles.text}>
        <span>요청하기</span>가<br/>완료되었습니다.
      </h1>
    </div>
     <ConfirmButton title={"확인"} auth={true} onClick={()=>navigate('/')}/>
    </>
  )
}

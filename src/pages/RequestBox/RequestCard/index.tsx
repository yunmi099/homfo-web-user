import React from 'react'
import styles from './styles.module.scss'
import { RequestList } from '../../../store/type/requestBox/interface'
import { formatDate } from '../../../utils/getDate'
const StatusEnum = {
  APPLICATION_COMPLETED: '신청 완료',
  SALES_IN_PROGRESS: '매물 파악 중',
  SALES_COMPLETED: '매물 파악 완료'
};
export default function RequestCard({data}: {data: RequestList}) {
  let statusColor;
  switch (data.matchStatus) {
    case StatusEnum.APPLICATION_COMPLETED:
      statusColor = '#27A779'
      break;
    case StatusEnum.SALES_IN_PROGRESS:
      statusColor = '#707070';
      break;
    case StatusEnum.SALES_COMPLETED:
      statusColor = '#1C72F3';
      break;
    default:
      statusColor = '#707070';
      break;
  }
  return (
    <div className={styles.container}>
        <div className={styles.areaContainer}>
          <div className={styles.areaName}>{data.areaName}</div>
          <div className={styles.university}>단국대학교</div>
        </div>
        <div className={styles.contentsContainer}>
          <div className={styles.contents}>신청일: {formatDate(data.createdAt)}</div>
          <div className={styles.contents}>중개사무소: {data.agencyName===null?'미정':data.agencyName}</div>
          <div className={styles.contents}>상태:&nbsp;
            <span 
            style={{fontWeight:800, color:statusColor}}>
            {data.matchStatus}</span>
          </div>
          <div className={styles.contents}>담당 중개사: {data.realtorName===null?'미정':data.realtorName}</div>
          {data.matchStatus===StatusEnum.APPLICATION_COMPLETED?<div className={styles.modifyStatus}>
            <div className={styles.circle}></div>수정가능
          </div>:null}
        </div>
    </div>
  )
}

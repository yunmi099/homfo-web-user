import React,{useEffect, useState} from 'react'
import Header from '../../components/layout/header'
import styles from './styles.module.scss'
import { getUsersRequestList } from '../../services/requestBox/api'
import { RequestList } from '../../store/type/requestBox/interface';
import RequestCard from './RequestCard';
import BottomTab from '../../components/layout/bottomtabs';

function RequestBox() {
  const [data, setData] = useState<RequestList[]>();
  useEffect(()=>{
    getUsersRequestList(2, setData);
  },[])
  return (
    <div className={styles.container}>
      <Header title="요청서함" color="white" back={false}/>
      <div className={styles.cardContainer}>
        {data!==undefined && 
        data.map((key, index)=>{
        return <RequestCard data={key} key={index}/>
        })
        }
        <div className={styles.emptySpace}></div>
      </div>
      <BottomTab/>
    </div>
  )
}
export default RequestBox;
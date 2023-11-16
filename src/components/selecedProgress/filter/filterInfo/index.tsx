import React from 'react'
import styles from './styles.module.scss'
interface FilterInfoProps{
  title:string;
  mode:string;
  min:number;
  max:number;
}
export default function FilterInfo({title, mode, min, max}:FilterInfoProps) {
  function formatValue(value:number) {
    if (value >= 10000) {
      return `${Math.floor(value / 10000)}억${value % 10000 !== 0 ? ` ${value % 10000}만원` : ''}`;
    } else {
      return `${value}만원`;
    }
  }  
  return (
    <div className={styles.filterInfo}>
      <div className={styles.title}>
        {title}
      </div>
      <div className={styles.timeResult}>
        {mode==='time'&&`${max}분 이내`}
      </div>
      <div className={styles.priceResult}>
        {mode==='price'&&`${formatValue(min)} 이상 ~ ${formatValue(max)} 이내`}
      </div>
    </div>
  )
}

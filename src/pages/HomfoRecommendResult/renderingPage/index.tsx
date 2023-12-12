import React from 'react'
import styles from  './styles.module.scss'
import renderingVideo from '../../../assets/hippo/renderingVideo.gif'
export default function Rendering() {
  return (
    <div className={styles.container}>
        <div className={styles.contents}>당신에게 <span>어울리는 구역</span>을<br/>찾고 있어요.</div>
        <div className={styles.smallContents}>잠시만 기다려 주세요.</div>
        <img
          className={styles.image}
          alt=""
          src={renderingVideo}
        />
    </div>
  )
}

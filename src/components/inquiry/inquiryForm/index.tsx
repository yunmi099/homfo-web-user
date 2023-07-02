import React, { useState } from 'react';
import styles from './styles.module.scss';
import Header from '../../../components/layout/header';
  
function InquiryForm() {
    return(
    <div className={styles.container}>
        <div>제목</div>   
        <input type="text" placeholder="제목을 입력해주세요."/>
        <div>분류</div>  
        <div>내용</div> 
        <input type="text" maxlength="200" placeholder="내용을 입력해주세요(200자 이내)"/>
    </div>);
}


export default InquiryForm;
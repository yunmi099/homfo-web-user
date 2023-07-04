import React, { useState } from 'react';
import styles from './styles.module.scss';
import Header from '../../../components/layout/header';
  
function FAQ() {
    return(
    <div className={styles.container}>
        <Header title=""/>    
        <div>무엇을 찾고 계시나요?</div>
    </div>);
}


export default FAQ;
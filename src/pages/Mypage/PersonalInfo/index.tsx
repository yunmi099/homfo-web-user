import React, { useState } from 'react';
import styles from './styles.module.scss';
import Header from '../../../components/layout/header';
  
function PersonalInfo() {
    return(
    <div className={styles.container}>
        <Header title="개인정보"/>      
    </div>);
}


export default PersonalInfo;
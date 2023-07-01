import React, { useState } from 'react';
import styles from './styles.module.scss';
import Header from '../../../components/layout/header';
  
function AppSetting() {
    return(
    <div className={styles.container}>
        <Header title="설정"/>      
    </div>);
}


export default AppSetting;
import React,{useState, useEffect} from 'react';
import Header from '../../components/layout/header';
import styles from './styles.module.scss'
function HomfoNotice(){
    return(
        <div className={styles.container}>
         <Header title="공지사항" color='white'/>
         
        </div>
    );
}
export default HomfoNotice;
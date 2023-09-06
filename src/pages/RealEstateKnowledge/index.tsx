import React,{useState, useEffect} from 'react';
import Header from '../../components/layout/header';
import styles from './styles.module.scss'
function RealEstateKnowlegde(){
    return(
        <div className={styles.container}>
         <Header title="부동산 상식" color='white'/>
        </div>
    );
}
export default RealEstateKnowlegde;
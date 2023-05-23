import React from 'react';
import styles from './styles.module.scss';
import Header from '../../components/layout/header';
function Mypage() {
    return(
    <div className={styles.container}>
        <Header title="마이페이지"/>
        <div className={styles.profileImg}></div>
    </div>);
}


export default Mypage;

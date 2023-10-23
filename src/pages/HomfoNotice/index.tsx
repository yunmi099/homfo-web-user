import React, { useState, useEffect } from 'react';

import Header from '../../components/layout/header';

import notice_icon from '../../assets/icons/home/notice_icon.svg';

import styles from './styles.module.scss';

function HomfoNotice() {
    return (
        <div className={styles.container}>
            <Header title="공지사항" color="white" />
            <div className={styles.banner}>
                <div className={styles.left}>
                    <div>Hompo에서</div>
                    <div className={styles.strong}>
                        <strong>최신 공지사항 알려드립니다.</strong>
                    </div>
                </div>
                <div className={styles.right}>
                    <img src={notice_icon} alt="공지사항" />
                </div>
            </div>
        </div>
    );
}
export default HomfoNotice;

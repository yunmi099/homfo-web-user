import React, { useState, useEffect } from 'react';

import Header from '../../components/layout/header';

import notice_icon from '../../assets/icons/home/notice_icon.svg';

import styles from './styles.module.scss';
import NoticeBlock from '../../components/molecules/Notice/NoticeBlock';
import { fetchFromApi } from '../../utils/axios';
import { INotice } from '../../@types/notice';

function HomfoNotice() {
    const [noticeList, setNoticeList] = useState<INotice[]>([]);
    useEffect(() => {
        const getNoticeList = async () => {
            try {
                const noticeList = await fetchFromApi(
                    'GET',
                    '/notices?page=0&size=15&firstView=true'
                );

                setNoticeList(noticeList.data.data);
            } catch (e: any) {
                console.error(e);
            }
        };

        getNoticeList();
    }, []);

    return (
        <div className={styles.container}>
            <Header title="공지사항" color="white" />
            <div className={styles.banner}>
                <div className={styles.left}>
                    <div>Homfo에서</div>
                    <div className={styles.strong}>
                        <strong>최신 공지사항 알려드립니다.</strong>
                    </div>
                </div>
                <div className={styles.right}>
                    <img src={notice_icon} alt="공지사항" />
                </div>
            </div>
            <div>
                {noticeList.map((notice) => (
                    <NoticeBlock key={notice.id} notice={notice} />
                ))}
            </div>
        </div>
    );
}
export default HomfoNotice;

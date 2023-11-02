import React, { useState, useEffect } from 'react';

import Header from '../../components/layout/header';

import notice_icon from '../../assets/icons/home/notice_icon.svg';

import styles from './styles.module.scss';
import NoticeBlock from '../../components/molecules/Notice/NoticeBlock';
import { fetchFromApi } from '../../utils/axios';
import { INotice } from '../../@types/notice';

const DUMMY_NOTICE: INotice[] = [
    { noticeId: 0, name: '[공지] 제목제목제목', createAt: '0000-00-00', isFixed: 'N' },
    { noticeId: 1, name: '[공지] 제목제목제목', createAt: '0000-00-00', isFixed: 'N' },
    { noticeId: 2, name: '[공지] 제목제목제목', createAt: '0000-00-00', isFixed: 'Y' },
    { noticeId: 3, name: '[공지] 제목제목제목', createAt: '0000-00-00', isFixed: 'Y' },
];

function HomfoNotice() {
    const [noticeList, setNoticeList] = useState<INotice[]>([]);
    useEffect(() => {
        const getNoticeList = async () => {
            try {
                const noticeList = await fetchFromApi('GET', '/notices?page=0&size=1');

                setNoticeList(noticeList.data);
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
                    <div>Hompo에서</div>
                    <div className={styles.strong}>
                        <strong>최신 공지사항 알려드립니다.</strong>
                    </div>
                </div>
                <div className={styles.right}>
                    <img src={notice_icon} alt="공지사항" />
                </div>
            </div>
            <div>
                {DUMMY_NOTICE.map((notice) => (
                    <NoticeBlock key={notice.noticeId} notice={notice} />
                ))}
            </div>
        </div>
    );
}
export default HomfoNotice;

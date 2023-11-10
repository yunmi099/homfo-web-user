import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Header from '../../../components/layout/header';

import styles from './styles.module.scss';
import { fetchFromApi } from '../../../utils/axios';
import { formatDateWithComma } from '../../../utils/getDate';

interface INoticeDetail {
    id: number;
    title: string;
    content: string;
    writer: {
        userId: number;
        userAccount: string;
        userPhoneNum: string;
        nickName: string;
        gender: string;
        dateOfBirth: string;
        job: string;
        role: string;
        status: string;
    };
    isPublic: string;
    isFixed: string;
    createdAt: string;
    updatedAt: string;
}

export default function NoticeDetail() {
    const { id } = useParams();

    const [detailNotice, setDetailNotice] = useState<INoticeDetail>();

    useEffect(() => {
        const getNoticeDetailData = async () => {
            try {
                const res = await fetchFromApi('GET', `/notices/${id}`);

                setDetailNotice(res.data);
            } catch (e) {
                console.error(e);
            }
        };

        getNoticeDetailData();
    }, []);

    return (
        <div className={styles.container}>
            <Header title="공지사항" color="white" />
            <div className={styles.content}>
                <div className={styles.noticeHeader}>
                    <div className={styles.title}>
                        <strong>{detailNotice?.title}</strong>
                    </div>
                    <div className={styles.date}>
                        {detailNotice?.createdAt && formatDateWithComma(detailNotice?.createdAt)}
                    </div>
                </div>

                <div className={styles.noticeContent}>{detailNotice?.content}</div>
            </div>
        </div>
    );
}

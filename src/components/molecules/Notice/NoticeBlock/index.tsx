import React from 'react';

import pin_icon from '../../../../assets/icons/notice/pin_icon.svg';

import { INotice } from '../../../../@types/notice';

import styles from './styles.module.scss';
import { formatDateWithComma } from '../../../../utils/getDate';

import arrow from '../../../../assets/icons/notice/arrow.svg';
import { useNavigate } from 'react-router-dom';

interface Props {
    notice: INotice;
}

const ONE_WEEK = 1000 * 60 * 60 * 24 * 7;

export default function NoticeBlock({ notice }: Props) {
    const navigate = useNavigate();

    const currentDate = new Date();
    const noticeDate = new Date(notice.createdAt);
    const differenceDate = currentDate.getTime() - noticeDate.getTime();

    const isNew = differenceDate < ONE_WEEK;

    const onClickNoticeBlock = () => {
        navigate(`/notice/detail/${notice.id}`);
    };

    return (
        <div className={styles.container} onClick={onClickNoticeBlock}>
            <div>
                <div className={styles.info}>
                    {notice.isFixed === 'Y' && <img src={pin_icon} alt="고정" />}
                    {isNew && <div className={styles.new}>NEW</div>}
                </div>
                <div className={styles.content}>{notice.title}</div>
                <div className={styles.date}>{formatDateWithComma(notice.createdAt)}</div>
            </div>
            <div>
                <img src={arrow} alt="바로가기" />
            </div>
        </div>
    );
}

import React from 'react';

import pin_icon from '../../../../assets/icons/notice/pin_icon.svg';

import styles from './styles.module.scss';

interface Props {
    notice: { title: string; date: string; isNew: boolean; isPinned: boolean };
}

export default function NoticeBlock({ notice }: Props) {
    return (
        <div className={styles.container}>
            <div>
                <div className={styles.info}>
                    {notice.isPinned && <img src={pin_icon} alt="고정" />}
                    {notice.isNew && <div className={styles.new}>NEW</div>}
                </div>
                <div>{notice.title}</div>
                <div>{notice.date}</div>
            </div>
        </div>
    );
}

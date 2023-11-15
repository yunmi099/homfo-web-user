import React, { useState } from 'react';
import Header from '../../components/layout/header';

import styles from './styles.module.scss';

export default function Bookmarks() {
    const [isArea, setIsArea] = useState<Boolean>(true);

    return (
        <div>
            <Header title="즐겨찾기" color="white" />
            <div className={styles.container}>
                <div className={styles.selector}>
                    <div
                        className={`${isArea ? styles.active : styles.nonactive}`}
                        onClick={() => setIsArea(true)}
                    >
                        관심 구역
                    </div>
                    <div
                        className={`${!isArea ? styles.active : styles.nonactive}`}
                        onClick={() => setIsArea(false)}
                    >
                        관심 상식
                    </div>
                </div>
            </div>
        </div>
    );
}

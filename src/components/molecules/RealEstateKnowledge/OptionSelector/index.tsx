import React from 'react';

import styles from './styles.module.scss';

interface Props {
    option: string;
    setOption: React.Dispatch<React.SetStateAction<string>>;
}

export default function OptionSelector({ option, setOption }: Props) {
    return (
        <div className={styles.optionSelector}>
            <div
                className={option === 'recent' ? styles.active : styles.nonactive}
                onClick={() => setOption('recent')}
            >
                최신
            </div>
            <div
                className={option === 'popular' ? styles.active : styles.nonactive}
                onClick={() => setOption('popular')}
            >
                인기
            </div>
        </div>
    );
}

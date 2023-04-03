import React from 'react';
import styles from './styles.module.scss';

function AreaInfoOverlay({ setIsOpen }: any) {
    return (
        <div className={styles.container}>
            <div>AreaInfoOverlay</div>
            <button onClick={() => setIsOpen(false)}>닫기</button>
        </div>
    );
}

export default AreaInfoOverlay;

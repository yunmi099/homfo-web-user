import React from 'react';

import styles from './styles.module.scss';

export default function MainKnowledge() {
    return (
        <div>
            {/* <img /> */}
            <div className={styles.img}></div>
            <div className={styles.text}>
                <span>대학 사회 초년생 집중 👏</span>
                <br />
                <span>
                    <span className={styles.highlight}>부동산 상식</span> 어디까지 아니 ?!
                </span>
            </div>
        </div>
    );
}

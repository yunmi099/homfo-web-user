import React from 'react';
import styles from './styles.module.scss';

interface ProgressStepTrackerProps {
    count: number;
    totalCount: number;
}

function ProgressStepTracker(props: ProgressStepTrackerProps) {
    const divArray = [];
    for (let i = 1; i <= props.totalCount; i++) {
        divArray.push(
            <div
                key={i}
                className={i === props.count ? styles.coloredCircle : styles.circle}
            ></div>
        );
    }
    return (
        <div className={styles.totalBox}>
            {divArray}
        </div>
    );
}

export default ProgressStepTracker;

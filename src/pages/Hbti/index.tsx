import React, { useState, useRef } from 'react';
import styles from './styles.module.scss';
import questionList from './questionList.json';
import { useNavigate } from 'react-router-dom';

interface Anwser {
    detail: string;
    score: number;
}

function Hbti() {
    const [count, setCount] = useState(0);
    const [EIscore, setEIscore] = useState(0);
    const [NSscore, setNSscore] = useState(0);
    const [TFscore, setTFscore] = useState(0);
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);

    const updateScore = (score: number) => {
        if (count >= 0 && count <= 2) {
            setEIscore((prev) => prev + score);
        } else if (count >= 3 && count <= 5) {
            setNSscore((prev) => prev + score);
        } else if (count >= 6 && count <= 8) {
            setTFscore((prev) => prev + score);
        }
    };

    const finalScore = (score: number) => {
        let hbti = '';
        setTFscore((prev) => prev + score);

        hbti += EIscore > 0 ? 'E' : 'I';
        hbti += NSscore > 0 ? 'N' : 'S';
        hbti += TFscore > 0 ? 'F' : 'T';

        navigate('result', { state: hbti });
    };

    const handleButtonClick = (score: number) => {
        if (count === 8) {
            return finalScore(score);
        }

        updateScore(score);
        setCount((prev) => prev + 1);
        const container = containerRef.current;
        container?.classList.remove(styles.slideIn);
        void container?.offsetWidth;
        container?.classList.add(styles.slideIn);
    };

    const { question, anwser } = questionList[count];

    return (
        <div className={`${styles.container} ${styles.slideIn}`} ref={containerRef}>
            <div className={styles.progressBar}>
                <div>{count + 1}/9</div>
                <div className={styles.progressBg}></div>
                <div
                    className={styles.progress}
                    style={{ width: `${((count + 1) / 9) * 100}%` }}
                ></div>
            </div>                                              
            <div className={styles.questionContainer}>
                <div>Q{count + 1}.</div>
                <div>{question}</div>
            </div>
            <div className={styles.anwserContainer}>
                {anwser.map((anwser: Anwser, index: number) => (
                    <div
                        className={styles.button}
                        key={index}
                        onClick={() => handleButtonClick(anwser.score)}
                    >
                        {anwser.detail}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Hbti;

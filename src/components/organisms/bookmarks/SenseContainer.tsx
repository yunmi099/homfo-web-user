import React from 'react';

import emptyHeart from '../../../assets/icons/senses/empty_heart.svg';
import emptyScrap from '../../../assets/icons/senses/empty_scrap.svg';

import styles from './styles.module.scss';

interface ISense {
    senseId: number;
    title: string;
    likeCount: number;
    favoriteCount: number;
    mainImage: string;
    status: string;
}

interface Props {
    senseData: ISense[];
}

export default function SenseContainer({ senseData }: Props) {
    return (
        <div>
            {senseData.map((sense) => (
                <SenseBox sense={sense} />
            ))}
        </div>
    );
}

const SenseBox = ({ sense }: { sense: ISense }) => {
    return (
        <div className={styles.senseBox}>
            <img src={sense.mainImage} alt={sense.title} className={styles.img} />
            <div className={styles.info}>
                <div className={styles.title}>{sense.title}</div>
                <div className={styles.countBox}>
                    <div className={styles.count}>
                        <img src={emptyHeart} alt="조아용" />
                        <div>
                            좋아요 <span>{sense.likeCount}</span>개
                        </div>
                    </div>
                    <div className={styles.divider} />
                    <div className={styles.count}>
                        <img src={emptyScrap} alt="조아용" />
                        <div>
                            즐겨찾기 <span>{sense.favoriteCount}</span>개
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

import React, { useState } from 'react';

import emptyHeart from '../../../assets/icons/senses/empty_heart.svg';
import emptyScrap from '../../../assets/icons/senses/empty_scrap.svg';
import deleteIcon from '../../../assets/icons/bookmarks/delete.svg';

import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import { fetchFromApi } from '../../../utils/axios';
import useUserStore from '../../../store/context/useUserStore';

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
    const navigate = useNavigate();

    const {userInfo} = useUserStore();

    const [isSwiped, setIsSwiped] = useState(false);
    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => setIsSwiped(true),
        onSwipedRight: () => setIsSwiped(false),
        trackMouse: true, // 마우스로도 스와이프 가능
    });

    const [isDeleted, setIsDeleted] = useState(false);

    const handleDeleteClick = async () => {
        // 'X' 버튼 클릭시 호출될 함수 구현
        await fetchFromApi('DELETE', `/senses/favorite`, {
            senseId: sense.senseId,
            userId: userInfo.userId,
        });

        setIsDeleted(true);
    };

    return (
        <div className={`${styles.box} ${isDeleted && styles.deleted}`}>
            <div
                {...swipeHandlers}
                className={`${styles.senseBox} ${isSwiped ? styles.swiped : ''}`}
                onClick={() => navigate(`/mypage/bookmarks/sense/${sense.senseId}`)}
            >
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
            {isSwiped && (
                <div className={styles.deleteButton} onClick={handleDeleteClick}>
                    <img src={deleteIcon} alt="삭제" />
                </div>
            )}
        </div>
    );
};

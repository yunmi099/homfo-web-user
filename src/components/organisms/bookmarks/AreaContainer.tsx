import React, { useState } from 'react';

import deleteIcon from '../../../assets/icons/bookmarks/delete.svg';

import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import { fetchFromApi } from '../../../utils/axios';
import useUserStore from '../../../store/context/useUserStore';

interface IArea {
    id: number;
    areaDetail: {
        area: {
            areaId: number;
            name: string;
        };
        avgMonthlyDeposit: null;
        avgMonthlyFee: null;
        avgJeonseDeposit: null;
        avgExclusiveArea: null;
        avgBuiltYear: null;
        avgWalkingTotalDistance: number;
        avgWalkingSeconds: number;
        avgBikeSeconds: number;
        avgTransportSeconds: number;
    };
    createdAt: string;
}

interface Props {
    areaData: IArea[];
}

export default function AreaContainer({ areaData }: Props) {
    return (
        <div>
            {areaData.map((area) => (
                <AreaBox area={area} />
            ))}
        </div>
    );
}

const AreaBox = ({ area }: { area: IArea }) => {
    const { userInfo } = useUserStore();

    const [isSwiped, setIsSwiped] = useState(false);
    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => setIsSwiped(true),
        onSwipedRight: () => setIsSwiped(false),
        trackMouse: true, // 마우스로도 스와이프 가능
    });

    const [isDeleted, setIsDeleted] = useState(false);

    const handleDeleteClick = async () => {
        // 'X' 버튼 클릭시 호출될 함수 구현
        await fetchFromApi(
            'DELETE',
            `/users/${userInfo.userId}/areaBookmarks?areaBookmarkId=${area.id}`
        );

        setIsDeleted(true);
    };

    return (
        <div className={`${styles.box} ${isDeleted && styles.deleted}`}>
            <div
                {...swipeHandlers}
                className={`${styles.senseBox} ${isSwiped ? styles.swiped : ''}`}
                // onClick={() => navigate(`/mypage/bookmarks/sense/${sense.senseId}`)}
            >
                {/* <img src={sense.mainImage} alt={area.id} className={styles.img} /> */}
                <div className={styles.info}>
                    <div className={styles.title}>{area.areaDetail.area.name}</div>
                    <div className={styles.depositBox}>
                        <div className={styles.depositContent}>
                            <span>월세</span> <span className={styles.deposit}>평균 50만원</span>
                        </div>
                        <div className={styles.divider} />
                        <div className={styles.depositContent}>
                            <span>보증금</span>
                            <span className={styles.deposit}>평균 1000만원</span>
                        </div>
                    </div>
                    <div className={styles.depositBox}>
                        <div className={styles.depositContent}>
                            <span>전세</span> <span className={styles.deposit}>평균 1억원</span>
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

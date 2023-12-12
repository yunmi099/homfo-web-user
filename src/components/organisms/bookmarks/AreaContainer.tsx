import React, { useState } from 'react';

import deleteIcon from '../../../assets/icons/bookmarks/delete.svg';

import styles from './styles.module.scss';
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
        avgMonthlyDeposit: null|number;
        avgMonthlyFee: null|number;
        avgJeonseDeposit: null|number;
        avgExclusiveArea: null|number;
        avgBuiltYear: null|number;
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
        <>
        <div className={styles.smallFont}>
            정보 미제공의 경우, 홈포자체 추천구역으로 지역공인중개사의 매물추천이 있던 구역입니다.<br/>
            구역분석이 진행되고 있는 구역으로 빠른시일내에 업데이트될 예정입니다.
        </div>
        <div>
            {areaData.map((area) => (
                <AreaBox area={area} />
            ))}
        </div>
        </>
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
    const {avgMonthlyFee,avgMonthlyDeposit,avgJeonseDeposit} = area.areaDetail;
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
                            <span>월세</span> <span className={styles.deposit}>{avgMonthlyFee===null?"정보미제공":`평균 ${Math.round(avgMonthlyFee)} 만원`}</span>
                        </div>
                        <div className={styles.divider} />
                        <div className={styles.depositContent}>
                            <span>보증금</span>
                            <span className={styles.deposit}>{avgMonthlyDeposit===null?"정보미제공":`평균 ${Math.round(avgMonthlyDeposit)} 만원`}</span>
                        </div>
                    </div>
                    <div className={styles.depositBox}>
                        <div className={styles.depositContent}>
                            <span>전세</span> <span className={styles.deposit}>{avgJeonseDeposit===null?"정보미제공":`평균 ${Math.round(avgJeonseDeposit)} 만원`}</span>
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

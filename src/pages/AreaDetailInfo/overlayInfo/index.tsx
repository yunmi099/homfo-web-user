import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';
import styles from './styles.module.scss';
import { AreaInfo } from '../../../components/areaInfo';
import { getAreaDetailResult } from '../../../services/homfoArea/api';
import * as icon from '../../../assets/icons/areaInfo/icon';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../../store/context/useUserStore';
import { deleteBookMarkLists, postBookMarkLists } from '../../../services/areaBookmarks/api';
interface OverlayInfoProps {
    areaId: number;
    touchUpEvent: boolean;
    setTouchUpEvent: Dispatch<SetStateAction<boolean>>;
    touchDownEvent: boolean;
    setTouchDownEvent: Dispatch<SetStateAction<boolean>>;
    // selectedAmenities: string|undefined;
}
export const OverlayInfo = ({
    areaId,
    touchUpEvent,
    touchDownEvent,
    setTouchUpEvent,
    setTouchDownEvent,
}: OverlayInfoProps) => {
    const [startY, setStartY] = useState<number | null>(null);
    const [detail, setDetail] = useState<any>();
    const [toggle, setToggle] = useState(false);
    const navigate = useNavigate();
    const handleOnTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        setStartY(e.touches[0].clientY);
    };
    const handleOnTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        var currentY = e.touches[0].clientY;
        if (startY !== null) {
            var deltaY = currentY - startY;
            if (deltaY > 0) {
                // 아래로 터치한 경우
                setTouchDownEvent(true);
                setTouchUpEvent(false);
            } else if (deltaY < 0) {
                // 위로 터치한 경우
                setTouchUpEvent(true);
                setTouchDownEvent(false);
            }
        }
    };

    const handleSetDetail = async () => {
        setDetail(await getAreaDetailResult(areaId));
    };

    useEffect(() => {
        handleSetDetail();
    }, [areaId]);

    const { userInfo } = useUserStore();

    return (
        <div
            className={`${styles.overlayAreaInfoView} ${touchDownEvent ? styles.touchDown : ''} ${
                touchUpEvent ? styles.touchUp : ''
            }`}
            onTouchStart={handleOnTouchStart}
            onTouchMove={handleOnTouchMove}
        >
            {detail !== undefined && (
                <>
                    <div className={styles.titleContainer}>
                        <div className={styles.title}>{detail.area.name}</div>
                        <div className={styles.buttonContainer}>
                            <div
                                className={styles.button}
                                onClick={() => {
                                    setToggle(!toggle);
                                    !toggle ?
                                    postBookMarkLists(userInfo.userId, areaId):
                                    deleteBookMarkLists(userInfo.userId, areaId)
                                }}
                            >
                                <img
                                    src={toggle ? icon.Toggle : icon.CancelToggle}
                                    height={'50%'}
                                    alt=""
                                    style={{ margin: '0 15px' }}
                                    
                                />
                                관심구역
                            </div>
                            <img src={icon.Line} height={'50%'} alt="" />
                            <div
                                className={styles.button}
                                onClick={() => {
                                    navigate('/request');
                                }}
                            >
                                <img
                                    src={icon.Request}
                                    height={'40%'}
                                    alt=""
                                    style={{ margin: '0 15px' }}
                                />
                                <span style={{ color: '#842CFF' }}>요청하기</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.horizontalLine}></div>
                    <div className={styles.infoContainer}>
                        <AreaInfo data={detail} />
                    </div>
                </>
            )}
        </div>
    );
};

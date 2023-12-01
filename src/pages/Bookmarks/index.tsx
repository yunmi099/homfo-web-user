import React, { useEffect, useState } from 'react';
import Header from '../../components/layout/header';

import styles from './styles.module.scss';
import { fetchFromApi } from '../../utils/axios';

import SenseContainer from '../../components/organisms/bookmarks/SenseContainer';
import useUserStore from '../../store/context/useUserStore';
import AreaContainer from '../../components/organisms/bookmarks/AreaContainer';

interface ISense {
    senseId: number;
    title: string;
    likeCount: number;
    favoriteCount: number;
    mainImage: string;
    status: string;
}

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

export default function Bookmarks() {
    const { userInfo } = useUserStore();
    const userId = userInfo.userId;
    const [isArea, setIsArea] = useState<Boolean>(true);

    const [areaData, setAreaData] = useState<IArea[]>([]);
    const [senseData, setSenseData] = useState<ISense[]>([]);

    useEffect(() => {
        const getSenseData = async () => {
            const res = await fetchFromApi('GET', `/users/${userId}/senseFavoriteList`);
            setSenseData(res.data.data);
        };

        const getAreaData = async () => {
            const res = await fetchFromApi(
                'GET',
                `/users/${userId}/areaBookmarks?size=15&page=0&firstView=true`
            );
            setAreaData(res.data.data);
        };

        isArea ? getAreaData() : getSenseData();
    }, [isArea]);

    return (
        <div>
            <Header title="즐겨찾기" color="white" />
            <div className={styles.content}>
                <div className={styles.selector}>
                    <div
                        className={`${isArea ? styles.active : styles.nonactive}`}
                        onClick={() => setIsArea(true)}
                    >
                        관심 구역
                    </div>
                    <div
                        className={`${!isArea ? styles.active : styles.nonactive}`}
                        onClick={() => setIsArea(false)}
                    >
                        관심 상식
                    </div>
                </div>

                {isArea ? (
                    <AreaContainer areaData={areaData} />
                ) : (
                    <SenseContainer senseData={senseData} />
                )}
            </div>
        </div>
    );
}

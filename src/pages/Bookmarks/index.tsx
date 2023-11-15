import React, { useEffect, useState } from 'react';
import Header from '../../components/layout/header';

import styles from './styles.module.scss';
import { fetchFromApi } from '../../utils/axios';
import AreaContainer from '../../components/organisms/bookmarks/AreaContainer';
import SenseContainer from '../../components/organisms/bookmarks/SenseContainer';

interface ISense {
    senseId: number;
    title: string;
    likeCount: number;
    favoriteCount: number;
    mainImage: string;
    status: string;
}

export default function Bookmarks() {
    const userid = 2;
    const [isArea, setIsArea] = useState<Boolean>(true);

    const [areaData, setAreaData] = useState([]);
    const [senseData, setSenseData] = useState<ISense[]>([]);

    useEffect(() => {
        const getSenseData = async () => {
            const res = await fetchFromApi('GET', `/users/${userid}/senseFavoriteList`);
            setSenseData(res.data.data);
        };

        const getAreaData = async () => {
            const res = await fetchFromApi('GET', `/users/${userid}/areaBookmarks`);
            setAreaData(res.data.data);
        };

        isArea ? getAreaData() : getSenseData();
    }, [isArea]);

    return (
        <div>
            <Header title="즐겨찾기" color="white" />
            <div className={styles.container}>
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
                {isArea ? <AreaContainer /> : <SenseContainer senseData={senseData} />}
            </div>
        </div>
    );
}

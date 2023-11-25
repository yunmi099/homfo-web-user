import React, { useEffect, useState } from 'react';
import Header from '../../../components/layout/header';
import { DetailContainer } from '../../RealEstateKnowledge/Detail';
import { useParams } from 'react-router-dom';
import { fetchFromApi } from '../../../utils/axios';
import useUserStore from '../../../store/context/useUserStore';

interface ISensesDetail {
    senseId: number;
    writerId: number;
    title: string;
    content: string;
    images: string[];
    mainImage: string;
    likeCount: number;
    favoriteCount: number;
    status: string;
    isLike: string;
    isFavorite: string;
    createdAt: string;
}
export default function DetailSense() {
    const { id } = useParams();
    const {userInfo} = useUserStore();
    const userId = userInfo.userId;
    const [sense, setSense] = useState<ISensesDetail>({
        senseId: 0,
        writerId: 0,
        title: '',
        content: '',
        images: [],
        mainImage: '',
        likeCount: 0,
        favoriteCount: 0,
        status: '',
        isLike: '',
        isFavorite: '',
        createdAt: '',
    });

    useEffect(() => {
        const getKnowledgeList = async () => {
            try {
                const res = await fetchFromApi('GET', `/senses/${id}/detail?userId=${userId}`);

                setSense(res.data);
            } catch (e) {
                console.error(e);
            }
        };

        getKnowledgeList();
    }, []);
    return (
        <div>
            <Header title="즐겨찾기" color="white" />
            {sense.senseId !== 0 && <DetailContainer data={sense} />}
        </div>
    );
}

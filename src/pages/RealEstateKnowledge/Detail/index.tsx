import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';

import Header from '../../../components/layout/header';

import { fetchFromApi } from '../../../utils/axios';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './styles.module.scss';

import emptyHeart from '../../../assets/icons/senses/empty_heart.svg';
import emptyScrap from '../../../assets/icons/senses/empty_scrap.svg';
import fillHeart from '../../../assets/icons/senses/fill_heart.svg';
import fillScrap from '../../../assets/icons/senses/fill_scrap.svg';

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
    createdAt: string;
}

export default function KnowledgeDetail() {
    const { id } = useParams();

    const [knowledgeList, setKnowledgeList] = useState<ISensesDetail[]>([]);

    useEffect(() => {
        const getKnowledgeList = async () => {
            try {
                const res = await fetchFromApi('GET', `/senses?order=recent`);

                setKnowledgeList(res.data.data);
            } catch (e) {
                console.error(e);
            }
        };

        getKnowledgeList();
    }, []);

    return (
        <div className={styles.container}>
            <Header title="부동산 상식" color="white" />
            <div className={styles.content}>
                {knowledgeList?.map((item) => (
                    <DetailContainer key={item.senseId} data={item} />
                ))}
            </div>
        </div>
    );
}

const DetailContainer = ({ data }: { data: ISensesDetail }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className={styles.detailContainer}>
            <div className={styles.title}>{data.title}</div>
            <div className={styles.imageContainer}>
                <Slider {...settings}>
                    {data?.images?.map((item: string) => (
                        <div className={styles.img}>
                            <img src={item} alt={data.title} />
                        </div>
                    ))}
                </Slider>
                <div className={styles.imgInfo}>
                    <img src={emptyHeart} alt="조아용" />
                    <img src={emptyScrap} alt="조아용" />
                </div>
            </div>

            <div className={styles.detailInfo}>
                <div>좋아요 {data.likeCount}개</div>
                <div>즐겨찾기 {data.favoriteCount}개</div>
            </div>
            <div className={styles.detailText}>{data.content}</div>
        </div>
    );
};

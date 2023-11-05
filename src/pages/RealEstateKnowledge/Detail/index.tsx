import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';

import Header from '../../../components/layout/header';

import { fetchFromApi } from '../../../utils/axios';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './styles.module.scss';

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

    const [data, setData] = useState<ISensesDetail>({
        senseId: 0,
        writerId: 0,
        title: '',
        content: '',
        images: [],
        mainImage: '',
        likeCount: 0,
        favoriteCount: 0,
        status: '',
        createdAt: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchFromApi('GET', `/senses/${id}/detail`);

                console.log(response);
                setData(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, [id]); // id 값이 바뀔 때마다 useEffect가 실행됩니다.

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className={styles.container}>
            <Header title="부동산 상식" color="white" />
            <div className={styles.detailContainer}>
                <div className={styles.title}>{data.title}</div>
                {/* image */}
                <div className={styles.imageContainer}>
                    <Slider {...settings}>
                        {data.images.map((item) => (
                            // <div>{item}</div>
                            <img src={item} alt={data.title} />
                        ))}
                    </Slider>
                </div>
                <img src={data.mainImage} alt={data.title} />
                <div className={styles.detailInfo}>
                    <div>좋아요 {data.likeCount}개</div>
                    <div>즐겨찾기 {data.favoriteCount}개</div>
                </div>
                <div className={styles.detailText}>{data.content}</div>
            </div>
        </div>
    );
}

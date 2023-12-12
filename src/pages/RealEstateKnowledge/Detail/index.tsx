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

export default function KnowledgeDetail() {
    const { id } = useParams();

    const { userInfo } = useUserStore();

    const [knowledgeList, setKnowledgeList] = useState<ISensesDetail[]>([]);

    useEffect(() => {
        const getKnowledgeList = async () => {
            try {
                const res = await fetchFromApi(
                    'GET',
                    `/senses?order=recent&userId=${userInfo.userId}`
                );

                setKnowledgeList(res.data.data);
            } catch (e) {
                console.error(e);
            }
        };

        getKnowledgeList();
    }, []);

    useEffect(() => {
        const scrollToElement = () => {
            if (id && knowledgeList.length > 0) {
                const element = document.getElementById(id);

                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        };

        scrollToElement();
    }, [id, knowledgeList]);

    return (
        <div className={styles.container}>
            <Header title="부동산 상식" color="white" />
            <div className={styles.emptySpace}></div>
            <div className={styles.content}>
                {knowledgeList?.map((item) => (
                    <DetailContainer key={item.senseId} data={item} />
                ))}
            </div>
        </div>
    );
}

export const DetailContainer = ({ data }: { data: ISensesDetail }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const [isLike, setIsLike] = useState(data.isLike);
    const [isFavorite, setIsFavorite] = useState(data.isFavorite);
    const [likeCount, setLikeCount] = useState(data.likeCount);
    const [favoriteCount, setFavoriteCount] = useState(data.favoriteCount);
    const { userInfo } = useUserStore();
    const onClickLikeButton = async () => {
        const method = isLike === 'N' ? 'POST' : 'DELETE';

        try {
            await fetchFromApi(method, '/senses/like', {
                senseId: data.senseId,
                userId: userInfo.userId,
            });

            setIsLike((prev) => (prev === 'N' ? 'Y' : 'N'));
            setLikeCount((prev) => (isLike === 'N' ? prev + 1 : prev - 1));
        } catch (e) {
            console.log(e);
        }
    };

    const onClickFavoriteButton = async () => {
        const method = isFavorite === 'N' ? 'POST' : 'DELETE';

        try {
            await fetchFromApi(method, '/senses/favorite', {
                senseId: data.senseId,
                userId: userInfo.userId,
            });

            setIsFavorite((prev) => (prev === 'N' ? 'Y' : 'N'));
            setFavoriteCount((prev) => (isFavorite === 'N' ? prev + 1 : prev - 1));
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div id={data.senseId.toString()} className={styles.detailContainer}>
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
                    {isLike === 'N' ? (
                        <img src={emptyHeart} alt="조아용" onClick={onClickLikeButton} />
                    ) : (
                        <img src={fillHeart} alt="조아용" onClick={onClickLikeButton} />
                    )}
                    {isFavorite === 'N' ? (
                        <img src={emptyScrap} alt="조아용" onClick={onClickFavoriteButton} />
                    ) : (
                        <img src={fillScrap} alt="조아용" onClick={onClickFavoriteButton} />
                    )}
                </div>
            </div>

            <div className={styles.detailInfo}>
                <div>좋아요 {likeCount}개</div>
                <div>즐겨찾기 {favoriteCount}개</div>
            </div>
            <div className={styles.detailText}>{data.content}</div>
        </div>
    );
};

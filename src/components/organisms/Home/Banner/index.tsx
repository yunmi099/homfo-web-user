import React, { useEffect, useState } from 'react';
import { fetchFromApi } from '../../../../utils/axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';

interface ISenseBanner {
    senseId: number;
    bannerImage: string;
    status: string;
}

export default function Banner() {
    const navigate = useNavigate();

    const [bannerItems, setBannerItems] = useState<ISenseBanner[]>([]);

    useEffect(() => {
        const getBannerItems = async () => {
            const res = await fetchFromApi('GET', '/senses/random');

            setBannerItems(res.data.data);
        };

        getBannerItems();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    };

    return (
        <div className={styles.banner}>
            <Slider {...settings}>
                {bannerItems.map((banner) => (
                    <div
                        className={styles.imgContainer}
                        onClick={() => navigate(`/real-estate-knowledge/${banner.senseId}`)}
                    >
                        <img src={banner.bannerImage} alt="배너" />
                    </div>
                ))}
            </Slider>
        </div>
    );
}

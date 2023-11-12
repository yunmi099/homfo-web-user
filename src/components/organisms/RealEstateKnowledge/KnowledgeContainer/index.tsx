import React, { useEffect, useState } from 'react';

import OptionSelector from '../../../molecules/RealEstateKnowledge/OptionSelector';

import { fetchFromApi } from '../../../../utils/axios';

import { IKnowledge } from '../../../../@types/knowledge';

import styles from './styles.module.scss';

import { useNavigate } from 'react-router-dom';

export default function KnowledgeContainer() {
    const navigate = useNavigate();

    const [option, setOption] = useState<string>('recent');
    const [knowledgeList, setKnowledgeList] = useState<any>([]);

    useEffect(() => {
        const getKnowledgeList = async () => {
            try {
                const res = await fetchFromApi('GET', `/senses/brief?order=${option}`);

                setKnowledgeList(res.data.data);
            } catch (e) {
                console.error(e);
            }
        };

        getKnowledgeList();
    }, [option]);

    return (
        <div>
            <OptionSelector option={option} setOption={setOption} />
            <div className={styles.knowledgeContainer}>
                {knowledgeList.map((item: IKnowledge) => (
                    <>
                        <img
                            className={styles.image}
                            onClick={() => navigate(`/real-estate-knowledge/${item.senseId}`)}
                            src={item.mainImage}
                            alt={item.title}
                        />
                    </>
                ))}
            </div>
        </div>
    );
}

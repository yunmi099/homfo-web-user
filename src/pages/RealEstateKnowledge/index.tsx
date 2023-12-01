import React, { useState, useEffect } from 'react';

import Header from '../../components/layout/header';
import MainKnowledge from '../../components/organisms/RealEstateKnowledge/MainKnowledge';
import KnowledgeContainer from '../../components/organisms/RealEstateKnowledge/KnowledgeContainer';

import styles from './styles.module.scss';
import { fetchFromApi } from '../../utils/axios';

function RealEstateKnowlegde() {
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
        <div className={styles.container}>
            <Header title="부동산 상식" color="white" />
            <div className={styles.content}>
                <MainKnowledge mainKnowledge={knowledgeList[0]} />

                <div className={styles.divider}></div>
                <div>
                    <KnowledgeContainer
                        option={option}
                        setOption={setOption}
                        knowledgeList={knowledgeList}
                    />
                </div>
            </div>
        </div>
    );
}
export default RealEstateKnowlegde;

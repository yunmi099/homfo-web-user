import React, { useEffect, useState } from 'react';

import OptionSelector from '../../../molecules/RealEstateKnowledge/OptionSelector';

import { fetchFromApi } from '../../../../utils/axios';

import { IKnowledge } from '../../../../@types/knowledge';

import styles from './styles.module.scss';

export default function KnowledgeContainer() {
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
                        <div className={styles.image}></div>
                    </>
                ))}
            </div>
        </div>
    );
}

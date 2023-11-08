import React, { SetStateAction, useEffect, useState } from 'react';

import OptionSelector from '../../../molecules/RealEstateKnowledge/OptionSelector';

import { fetchFromApi } from '../../../../utils/axios';

import { IKnowledge } from '../../../../@types/knowledge';

import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';

interface Props {
    option: string;
    setOption: React.Dispatch<SetStateAction<string>>;
    knowledgeList: IKnowledge[];
}

export default function KnowledgeContainer({ option, setOption, knowledgeList }: Props) {
    const navigate = useNavigate();

    return (
        <div>
            <OptionSelector option={option} setOption={setOption} />
            <div className={styles.knowledgeContainer}>
                {knowledgeList.map((item) => (
                    <>
                        <div className={styles.image}>
                            <img
                                onClick={() => navigate(`/real-estate-knowledge/${item.senseId}`)}
                                src={item.mainImage}
                                alt={item.title}
                            />
                        </div>
                    </>
                ))}
            </div>
        </div>
    );
}

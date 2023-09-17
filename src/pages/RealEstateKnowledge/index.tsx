import React, { useState, useEffect } from 'react';

import Header from '../../components/layout/header';
import MainKnowledge from '../../components/organisms/RealEstateKnowledge/MainKnowledge';

import styles from './styles.module.scss';

function RealEstateKnowlegde() {
    return (
        <div className={styles.container}>
            <Header title="부동산 상식" color="white" />
            <div>
                <MainKnowledge />
            </div>
        </div>
    );
}
export default RealEstateKnowlegde;

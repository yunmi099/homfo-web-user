import React, { useState } from 'react';
import styles from './styles.module.scss';
import Header from '../../../components/layout/header';
import * as inquiry from '../../../components/inquiry/routes'

function Inquiry() {
    const [mode, setMode] = useState<boolean>(false);
    return(
    <div className={styles.container}>
        <Header title="문의하기"/>  
        {mode ?<inquiry.form /> : <inquiry.list setMode={setMode}/>}
    </div>);
}


export default Inquiry;
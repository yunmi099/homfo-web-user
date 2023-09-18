import React, { useState } from 'react';
import styles from './styles.module.scss';
import Header from '../../../components/layout/header';
import * as inquiry from './inquiry/routes'

function Inquiry() {
    const [mode, setMode] = useState<boolean>(false);
    const [modify, setModify] = useState<boolean>(false);
    const [id, setId] = useState<number>(0);
    return(
    <div className={styles.container}>
        <Header title="문의하기"/>  
        {mode ?<inquiry.form setMode={setMode} modify={modify} id={id} setModify={setModify} /> : <inquiry.list setMode={setMode} setModify={setModify} setId={setId}/>}
    </div>);
}


export default Inquiry;
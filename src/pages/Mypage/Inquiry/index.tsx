import React, { useState } from 'react';
import styles from './styles.module.scss';
import Header from '../../../components/layout/header';
import * as inquiry from '../../../components/inquiry/routes'

const selectComponent = (mode : string)=>{
    switch(mode){
        case 'N': 
            return <inquiry.form/>;

        case 'L':
            return <inquiry.list/>;

        case 'D':
    }       return <inquiry.detail/>;
   
}
function Inquiry() {
    const [mode, setMode] = useState<string>("L");
    
    return(
    <div className={styles.container}>
        <Header title="문의하기"/>  
        {selectComponent(mode)}
    </div>);
}


export default Inquiry;
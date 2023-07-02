import React, { useState } from 'react';
import styles from './styles.module.scss';
import Header from '../../../components/layout/header';
import * as inquiry from '../../../components/inquiry/routes'
function Inquiry() {
    const [showInquiryForm, setShowInquiryForm] = useState<boolean>(true);
   
    return(
    <div className={styles.container}>
        <Header title="문의하기"/>  
        {showInquiryForm?<inquiry.form/>:<inquiry.list/>}
    </div>);
}


export default Inquiry;
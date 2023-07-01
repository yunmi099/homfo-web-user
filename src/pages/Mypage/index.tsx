import React, { useState } from 'react';
import styles from './styles.module.scss';
import Header from '../../components/layout/header';
import * as LoadingComponent from '../../components/Mypage/routes'
  
const selectComponent = (title: string, setTitle:React.Dispatch<React.SetStateAction<string>>) => {
    switch (title) {
        case '홈포 추천 구역':
            return <LoadingComponent.Inquiry/>;
        case '개인정보':
            return <LoadingComponent.Inquiry/>;
        case '즐겨찾기':
            return <LoadingComponent.Inquiry/>;
        case '요청서 확인':
            return <LoadingComponent.Inquiry/>;
        case '앱 설정':
            return <LoadingComponent.Inquiry/>;
        case '문의하기':
            return <LoadingComponent.Inquiry/>;
        case 'FAQ':
            return <LoadingComponent.Inquiry/>;
        default:
            return <LoadingComponent.Default setTitle={setTitle}/>;
    }
};
function Mypage() {
    const [title, setTitle] =  useState<string>("마이페이지");
    return(
    <div className={styles.container}>
        <Header title={title}/>
        {selectComponent(title, setTitle)}
    </div>);
}


export default Mypage;

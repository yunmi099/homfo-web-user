import React from 'react';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import BottomTab from '../../components/layout/bottomtabs';
import Header from '../../components/layout/header';
function Home() {
    const navigate = useNavigate();
    return(
    <div style={{width:"100vw", height:"100vh"}}>
     <Header title="부동산상식"/>
     <BottomTab/>
    </div>);
    // <div style={{textAlign:"center",width:"100vw", fontSize:30 }} onClick={()=>navigate('/hbti')}>hbti</div>;
}


export default Home;

import React from 'react';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import BottomTab from '../../components/layout/bottomtabs';
function Home() {
    const navigate = useNavigate();
    return(
    <div style={{width:"100vw", height:"100vh"}}>
     <BottomTab/>
    </div>);
    // <div style={{textAlign:"center",width:"100vw", fontSize:30 }} onClick={()=>navigate('/hbti')}>hbti</div>;
}

export default Home;

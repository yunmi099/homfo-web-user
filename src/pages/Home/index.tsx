import React from 'react';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import BottomTab from '../../components/layout/bottomtabs';
import Header from '../../components/layout/header';
function Home() {
    const navigate = useNavigate();
    return(
    <div className={styles.container}>
     <div className={styles.topContainer}>
        
     </div>
     <div className={styles.bottomContainer}>
     </div> 
     <BottomTab/>
    </div>);
    // <div style={{textAlign:"center",width:"100vw", fontSize:30 }} onClick={()=>navigate('/hbti')}>hbti</div>;
}


export default Home;

import React from 'react';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
function Home() {
    const navigate = useNavigate();
    return <div style={{textAlign:"center",width:"100vw", fontSize:30 }} onClick={()=>navigate('/hbti')}>hbti</div>;
}

export default Home;

import React from 'react';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import BottomTab from '../../components/layout/bottomtabs';
import SearchBar from './searchBar';

function Home() {
    const navigate = useNavigate();
    return(
    <div className={styles.container}>
     <div className={styles.topContainer}>
        <div className={styles.mypageLinker} onClick={()=>navigate('/mypage')}>
        </div>
        <SearchBar/>
     </div>
     <div className={styles.bottomContainer}>
     </div> 
     <BottomTab/>
    </div>);
}


export default Home;

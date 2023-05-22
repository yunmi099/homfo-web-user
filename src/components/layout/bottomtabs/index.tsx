import React from 'react';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import Home from '../../../assets/icons/homeIcon.svg'
import Map from '../../../assets/icons/mapIcon.svg'
import Request from '../../../assets/icons/requestIcon.svg'
import RequestBox from '../../../assets/icons/requestboxIcon.svg'

function BottomTab() {
    const navigate = useNavigate();
    return(
            <div className={styles.wrapper}>
                <div className={styles.tab}>
                    <img src={Home}/>
                    <div className={styles.title}>홈</div>
                </div>
                <div className={styles.tab}>
                    <img src={Map}/>
                    <div className={styles.title}>지도</div>
                </div>
                <div className={styles.tab}>
                    <img src={Request}/>
                    <div className={styles.title}>요청하기</div>
                </div>
                <div className={styles.tab}>
                    <img src={RequestBox}/>
                    <div className={styles.title}>요청서함</div>
                </div>
            </div>
    );
    // <div style={{textAlign:"center",width:"100vw", fontSize:30 }} onClick={()=>navigate('/hbti')}>hbti</div>;
}

export default BottomTab;

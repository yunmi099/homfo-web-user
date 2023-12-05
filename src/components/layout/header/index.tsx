import React from 'react';
import styles from './styles.module.scss';
import backbutton from '../../../assets/icons/header/backbutton.png'
import { useNavigate } from 'react-router-dom';
import { userInfo } from 'os';
import useUserStore from '../../../store/context/useUserStore';

interface HeaderProps {
    title: string;
    color?: string;
    back?: boolean;
}

function Header(props: HeaderProps) {
    const navigate = useNavigate();
    const {userInfo} = useUserStore();
    const { back = true } = props;
    return (
        <div className={styles.container} style={{ backgroundColor: props.color, paddingTop: `${userInfo.top/2}px`}}>
            {back && <img src={backbutton} className={styles.image} onClick={() => navigate(-1)} />}
            <div className={styles.title}>{props.title}</div>
        </div>
    );
}

export default Header;

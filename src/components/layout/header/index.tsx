import React from 'react';
import styles from './styles.module.scss';
import backbutton from '../../../assets/icons/header/backbutton.png'
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
    title: string;
    color?: string;
    back?: boolean;
}

function Header(props: HeaderProps) {
    const navigate = useNavigate();
    const { back = true } = props;
    return (
        <div className={styles.container} style={{ backgroundColor: props.color }}>
            {back && <img src={backbutton} className={styles.image} onClick={() => navigate(-1)} />}
            <div className={styles.title}>{props.title}</div>
        </div>
    );
}

export default Header;

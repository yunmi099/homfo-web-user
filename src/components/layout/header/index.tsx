import React from 'react';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
interface HeaderProps {
    title: string;
  }
function Header(props : HeaderProps) {
    const navigate = useNavigate();
    return(
    <div className={styles.container}>
        <img src='assets/icons/header/backbutton.png' className={styles.image} onClick={()=>navigate(-1)}/>
        <div className={styles.title}>{props.title}</div>
    </div>);
}


export default Header;
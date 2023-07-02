import React from 'react';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import * as homeIcon from '../../../assets/icons/home/homeIcon';
function SearchBar() {
    const navigate = useNavigate();
    return(
    <div className={styles.container}>
         <input className={styles.textinput}/>
         <img src={homeIcon.search} className={styles.img}/>
    </div>);
}


export default SearchBar;

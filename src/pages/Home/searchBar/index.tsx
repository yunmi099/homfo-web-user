import React from 'react';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
function SearchBar() {
    const navigate = useNavigate();
    return(
    <div className={styles.container}>
         <input className={styles.textinput}/>
         <img src="assets/icons/home/search.png" className={styles.img}/>
    </div>);
}


export default SearchBar;

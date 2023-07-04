import React from 'react';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import search from '../../../../assets/icons/inquiry/faqsearch.png'
function SearchBar() {
    return(
    <div className={styles.container}>
         <input className={styles.textinput} placeholder='검색어를 작성해주세요.'/>
         <img src={search} className={styles.img}/>
    </div>);
}


export default SearchBar;

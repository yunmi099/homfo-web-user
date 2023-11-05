import React from 'react';
import styles from './styles.module.scss';
interface AmenitiesProps {
    name : string;
    image: string;
    count: number;
    onClick: ()=>void;
}
export const Amenities = ({name, image, count, onClick}: AmenitiesProps)=>{
    return(
    <div className={styles.optionContainer} onClick={onClick}>
        <div className={styles.optionImageContainer}>
            <img 
                alt={name}
                src={image}
            />
            <div className={styles.optionCountContainer}><span>{count}</span></div>
        </div>
        <div>{name}</div>
    </div>)
}
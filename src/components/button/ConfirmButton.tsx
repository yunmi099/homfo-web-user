import React from "react";
import styles from './styles.module.scss'
interface HeaderProps {
  title: string;
  auth?:boolean;
  onClick?: () => void;
}

const ConfirmButton = ({ title, auth,onClick}: HeaderProps) => {
  return (
    <div onClick={onClick} className={styles.button}> 
      {title}
    </div>
  );
};

export default ConfirmButton;



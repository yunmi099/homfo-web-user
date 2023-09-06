import React from "react";
import styles from './styles.module.scss'
interface HeaderProps {
  title: string;
  auth?:boolean;
  onClick?: () => void;
}

const ConfirmButton = ({ title,auth=false,onClick}: HeaderProps) => {
  return (
    <div onClick={auth ? onClick : undefined} 
    className={`${
     auth?styles.active:styles.noneactive
    }`}> 
      {title}
    </div>
  );
};

export default ConfirmButton;



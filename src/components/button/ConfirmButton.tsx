import React from "react";
import styles from './styles.module.scss'
import useUserStore from "../../store/context/useUserStore";
interface HeaderProps {
  title: string;
  auth?:boolean;
  onClick?: () => void;
}

const ConfirmButton = ({ title,auth=false,onClick}: HeaderProps) => {
  const { userInfo } = useUserStore();
  return (
    <div onClick={auth ? onClick : undefined} 
    className={`${
     auth?styles.active:styles.noneactive
    }`}
    style={{paddingBottom: userInfo.bottom/2}}
    >
      {title}
    </div>
  );
};

export default ConfirmButton;



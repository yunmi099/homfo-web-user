import React from "react";
interface HeaderProps {
  title: string;
  auth?:boolean;
  onClick?: () => void;
}

const ConfirmButton = ({ title, auth,onClick}: HeaderProps) => {
  return (
    <div onClick={()=>auth?onClick:null} > 
      {title}
    </div>
  );
};

export default ConfirmButton;



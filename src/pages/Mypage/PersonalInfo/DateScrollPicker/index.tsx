import React, { useState, useEffect } from "react";
import DatePicker from "react-mobile-datepicker";
import { formatDate } from "../../../../utils/getDate";
import { isIOS, isAndroid } from 'react-device-detect';
interface DatePickerProps{
  dateOfBirth: string;
  setDateOfBirth: React.Dispatch<React.SetStateAction<{
    job: string;
    dateOfBirth: string;
  }>>;
}
const DateScrollPicker: React.FC<DatePickerProps> =({dateOfBirth, setDateOfBirth}) => {
  const todayDate = new Date();
  const year = todayDate.getFullYear();
  const adultYear = year - 19;
  const maxDate = new Date(adultYear, 11, 31);

  const [isOpen, setIsOpen] = useState(false);
  const [device, setDevice] = useState("");
  
  useEffect(()=>{
    if (isAndroid){
      setDevice('android');
    } else if (isIOS){
      setDevice('ios')
    } else {
      setDevice('default')
    }
  },[])
  const handleClick = () => {
    setIsOpen(true);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleSelect = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    setDateOfBirth((prevFormData) => ({
      ...prevFormData,
      "dateOfBirth": `${year}-${month}-${day}`,
    }));
    setIsOpen(false);
  };


  return (<>
      <div onClick={()=>handleClick()}>{formatDate(dateOfBirth)}</div> 
      <DatePicker
        value={new Date(dateOfBirth)}
        isOpen={isOpen}
        max={maxDate}
        onSelect={handleSelect}
        onCancel={handleCancel}
        isPopup={true}
        theme={device}
        showHeader={false}
        dateFormat={["DD", "MM", "YYYY"]}
        confirmText="OK"
        cancelText="Cancel"
      />
      </>
  );
};
export default DateScrollPicker;

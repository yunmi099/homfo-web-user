import React,{ useState, useEffect } from 'react';
import Modal from 'react-modal';
import styles from './styles.module.scss';
import building from '../../../../assets/icons/buildingImage.png'
const customStyles = {
    content: {
      width:'72.3%',
      height:'50%',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      padding: '20px',
      background: 'linear-gradient(180deg, rgb(255, 255, 255), rgb(240, 242, 242), rgb(203, 203, 203))',
      border: '0px solid',
      borderColor:'transperant',
      borderRadius: '0px',
      boxShadow: '0px 3px 6px 0px rgba(0, 0, 0, 0.161)',
      zIndex:100,
    },
    overlay: {
      width: '100vw',
      height: '100vh',
      zIndex:100,
      backgroundColor: 'rgba(0, 0, 0, 0.90)',
    },
  };
  Modal.setAppElement('#root');

  interface CustomModalProps {
    modalIsOpen: boolean;
    setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }
  
  const CustomModal: React.FC<CustomModalProps> = ({ modalIsOpen, setModalIsOpen }) => {
    const [shouldShowModal, setShouldShowModal] = useState(true);
  
    useEffect(() => {
      const today = new Date().toLocaleDateString();
      const closeModalFlag = localStorage.getItem(`closeModal_${today}`);
      if (closeModalFlag) {
        setShouldShowModal(false);
      }
    }, []);
    const closeModal = () => {
      setModalIsOpen(false);
    };
  
    const handleTodayCloseClick = () => {
      const today = new Date().toLocaleDateString();
  
      localStorage.setItem(`closeModal_${today}`, 'true');
  
      closeModal();
    };
  
    return shouldShowModal ? (
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="안내사항"
      >
        <h2 className={styles.title}>📢 안내사항</h2>
        <p className={styles.contents}>
          확인 전에만 수정이 가능하기 때문에
          <br />신중하게 골라주세요.<br /><span>작성 완료 후 일주일 정도 걸린다는 점</span>
          <br />참고해주세요. 최대한 맞춰 드리려 합니다.<br />요청서와 다른 결과가 나올 수도
           있다는 점<br /> 양해 바랍니다.
        </p>
        <img 
          src={building}
          alt=""
          className={styles.image}
          loading='eager'
        />
        <button
          id="todayClose"
          className={`${styles.button} ${styles.todayClose}`}
          onClick={handleTodayCloseClick}
        >
          오늘 하루 보지 않기
        </button>
        <button id="close" className={`${styles.button} ${styles.close}`} onClick={closeModal}>
          닫기
        </button>
      </Modal>
    ) : null;
  };
  
  export default CustomModal;
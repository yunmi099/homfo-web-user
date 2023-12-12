import React,{ useState, useEffect } from 'react';
import Modal from 'react-modal';
import styles from './styles.module.scss';
import commentImage from '../../../../assets/icons/commentImage.png'
import { useNavigate } from 'react-router-dom';
const customStyles = {
    content: {
      width:'72.3%',
      height:'25%',
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
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
    },
  };
  Modal.setAppElement('#root');

  interface CustomModalProps {
    modalIsOpen: boolean;
    setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }
  
  const CustomModal: React.FC<CustomModalProps> = ({ modalIsOpen, setModalIsOpen }) => {
    const [shouldShowModal, setShouldShowModal] = useState(true);
    const navigate = useNavigate();
    const closeModal = () => {
      navigate('/request-complete');
      setModalIsOpen(false);
    };
  
    return shouldShowModal ? (
      <Modal
        style={customStyles}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="안내사항"
      >
        <div className={styles.container}>
          <img 
            alt=""
            src={commentImage}  
            className={styles.image}
          />
          <p className={styles.contents}>
            <span>2주 이내</span>로 예쁜 방을 찾아오겠습니다!
            <br />요청서 수정은 요청서함에서 가능합니다.
          </p>
          <button 
            id="close" 
            className={`${styles.button} ${styles.close}`} 
            onClick={closeModal}
          >
            확인
          </button>
        </div>
      </Modal>
    ) : null;
  };
  
  export default CustomModal;
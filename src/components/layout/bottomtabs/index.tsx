import React from 'react';
import styles from './styles.module.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import * as bottomtabIcon from '../../../assets/icons/bottomtab/bottomtab';

function BottomTab() {
  const location = useLocation();
  const navigate = useNavigate();

  const tabData = [
    {
      path: '/',
      image: location.pathname === '/' ? bottomtabIcon.Home : bottomtabIcon.NHome,
      title: '홈',
    },
    {
      path: '/residence-area-map',
      image: location.pathname === '/residence-area-map' ? bottomtabIcon.Map : bottomtabIcon.NMap,
      title: '지도',
    },
    {
      path: '/request-box',
      image: location.pathname === '/request-box' ? bottomtabIcon.RequestBox : bottomtabIcon.NRequestBox,
      title: '요청서함',
    },
    {
      path: '/mypage',
      image: location.pathname === '/mypage' ? bottomtabIcon.Mypage :bottomtabIcon.NMypage,
      title: '마이페이지',
    },
  ];

  const handleClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className={styles.wrapper}>
      {tabData.map((tab) => (
        <div className={styles.tab} onClick={() => handleClick(tab.path)} key={tab.path}>
          <img src={tab.image} style={{width: 25}}/>
          <div className={styles.title} style={{ color: location.pathname === tab.path ? '#9C12FF' : '#707070' }}>
            {tab.title}
          </div>
        </div>
      ))}
    </div>
  );
}

export default BottomTab;

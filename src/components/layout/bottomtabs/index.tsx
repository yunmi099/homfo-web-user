import React from 'react';
import styles from './styles.module.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, NHome, Map, NMap, Request, NRequest, RequestBox, NRequestBox } from './bottomtab';

function BottomTab() {
  const location = useLocation();
  const navigate = useNavigate();

  const tabData = [
    {
      path: '/',
      image: location.pathname === '/' ? Home : NHome,
      title: '홈',
    },
    {
      path: '/map',
      image: location.pathname === '/map' ? Map : NMap,
      title: '지도',
    },
    {
      path: '/request',
      image: location.pathname === '/request' ? Request : NRequest,
      title: '요청하기',
    },
    {
      path: '/requestbox',
      image: location.pathname === '/requestbox' ? RequestBox : NRequestBox,
      title: '요청서함',
    },
  ];

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <div className={styles.wrapper}>
      {tabData.map((tab) => (
        <div className={styles.tab} onClick={() => handleClick(tab.path)} key={tab.path}>
          <img src={tab.image}/>
          <div className={styles.title} style={{ color: location.pathname === tab.path ? '#9C12FF' : '#707070' }}>
            {tab.title}
          </div>
        </div>
      ))}
    </div>
  );
}

export default BottomTab;

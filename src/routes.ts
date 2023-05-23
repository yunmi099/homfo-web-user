import loadable from '@loadable/component'


export const home = loadable(() => import('./pages/Home'));
export const hbti  = loadable(() => import('./pages/Hbti'));
export const hbtiResult  = loadable(() => import('./pages/HbtiResult'));
export const kakaomap  = loadable(() => import('./pages/KakaoMap'));
export const mypage = loadable(() => import('./pages/Mypage'))
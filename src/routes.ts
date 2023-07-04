import loadable from '@loadable/component'


export const home = loadable(() => import('./pages/Home'));
export const hbti  = loadable(() => import('./pages/Hbti'));
export const kakaomap  = loadable(() => import('./pages/KakaoMap'));
export const mypage = loadable(() => import('./pages/Mypage/Main'));
export const setting = loadable(() => import('./pages/Mypage/AppSetting'));
export const faq = loadable(() => import('./pages/Mypage/FAQ'));
export const inquiry = loadable(() => import('./pages/Mypage/Inquiry'));
export const personalInfo = loadable(() => import('./pages/Mypage/PersonalInfo'));
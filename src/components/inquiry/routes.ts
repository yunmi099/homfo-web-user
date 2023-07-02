import loadable from '@loadable/component'


export const form = loadable(() => import('./inquiryList'));
export const list  = loadable(() => import('./inquiryForm'));
export const detail = loadable(()=> import('./inquiryDetail'));
import loadable from '@loadable/component'


export const form = loadable(() => import('./inquiryForm'));
export const list  = loadable(() => import('./inquiryList'));
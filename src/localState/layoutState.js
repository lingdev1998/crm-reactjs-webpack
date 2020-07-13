import { atom } from 'recoil'; 


const SIDE_BAR_SHOW = 'SIDE_BAR_SHOW';
const SIDE_BAR_COLLAPSE = "SIDE_BAR_COLLAPSE"
const LAYOUT_COLOR = "LAYOUT_COLOR"
const CUSTOMMIZER = "CUSTOMIZER";
const RTL = "RTL123456"
const rtlState = atom({
  key: RTL,
  default:{
    direction: 'ltr'
  }
});
const customizerState = atom({
  key: CUSTOMMIZER,
  default:{
    squaredCorners: false,
    withBoxShadow: false,
    topNavigation: false
  }
});
const sideBarShow = atom({
  key: SIDE_BAR_SHOW,
  default: false
});

const sideBarCollapse = atom({
    key:SIDE_BAR_COLLAPSE,
    default:false
});

const layoutColorState = atom({
  key: LAYOUT_COLOR,
  default: {className: 'theme-light'}
});
export { sideBarShow,sideBarCollapse,layoutColorState,customizerState,rtlState };